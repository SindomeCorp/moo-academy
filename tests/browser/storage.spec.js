import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect,record} from './helpers.js';

test.beforeEach(async({page})=>{
  // Exercise the storage module against real IndexedDB without application timers.
  await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));
  await page.goto('/');
});

test('profile namespaces, draft deletion and failed saves keep the latest edits',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();
    try {
      s.setDraft('sandbox','toast');await s.saveWorld('toast world');
      s.setProfile('lambdamoo');s.setDraft('sandbox','lambda');await s.saveWorld('lambda world');
      s.setProfile('toaststunt');await s.read();const toast=s.draft('sandbox');
      const put=IDBObjectStore.prototype.put;
      try {
        IDBObjectStore.prototype.put=function(...args){if(this.name==='drafts')throw new Error('quota');return put.apply(this,args);};
        s.setDraft('sandbox','unsaved');const failed=await s.flush();
        let blocked=false;try{s.setProfile('lambdamoo');}catch{blocked=true;}
        IDBObjectStore.prototype.put=put;
        s.setDraft('sandbox','latest');await s.flush();await s.read();const latest=s.draft('sandbox');
        s.setDraft('sandbox',null);await s.flush();await s.read();const removed=s.draft('sandbox');
        s.setProfile('lambdamoo');const world=await s.read();
        return {toast,failed,blocked,latest,removed,world,lambda:s.draft('sandbox'),unsaved:s.unsaved};
      }finally{IDBObjectStore.prototype.put=put;}
    }finally{await s.release();}
  });
  expect(result).toEqual({toast:'toast',failed:false,blocked:true,latest:'latest',removed:undefined,world:'lambda world',lambda:'lambda',unsaved:false});
});

test('read filters malformed records and retains oversized drafts for recovery',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();
    const db=await new Promise(r=>{const q=indexedDB.open(databaseName,1);q.onsuccess=()=>r(q.result);});
    try {
      await new Promise((r,j)=>{const tx=db.transaction('drafts','readwrite'),store=tx.objectStore('drafts');
        store.put('good','valid');store.put('x'.repeat(100000),'boundary');store.put('x'.repeat(100001),'oversized');store.put(4,'number');store.put('bad key',5);tx.oncomplete=r;tx.onabort=()=>j(tx.error);});
      await s.read();
      return {valid:s.draft('valid'),boundary:s.draft('boundary').length,oversized:s.draft('oversized').length,number:s.draft('number')};
    }finally{db.close();await s.release();}
  });
  expect(result).toEqual({valid:'good',boundary:100000,oversized:100001,number:undefined});
  expect((await record(page,'drafts','oversized')).length).toBe(100001);
});

test('the existing writer can save after lease expiry when no other tab has acquired it',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();await s.saveWorld('original');
    const now=Date.now;try {
      Date.now=()=>now()+6000;
      const saved=await s.saveWorld('stale');
      return {saved,owner:s.owner,dirty:s.hasChanges};
    }finally{Date.now=now;await s.release();}
  });
  expect(result).toEqual({saved:true,owner:true,dirty:false});
  expect(await record(page)).toBe('stale');
});

test('queued save cannot overwrite a lease acquired in the preceding transaction',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();await s.saveWorld('original');
    const db=await new Promise(r=>{const q=indexedDB.open(databaseName,1);q.onsuccess=()=>r(q.result);});
    try {
      const tx=db.transaction('world','readwrite');tx.objectStore('world').put({writerId:'replacement',expiresAt:Date.now()+30000},'writer-lease');
      s.setDraft('sandbox','late draft');
      const saved=await s.saveWorld('late world');
      s.setDraft('ignored','not owner');const accepted=await s.saveWorld('also late');
      return {saved,accepted,owner:s.owner,ignored:s.draft('ignored'),dirty:s.hasChanges};
    }finally{db.close();await s.release();}
  });
  expect(result).toEqual({saved:false,accepted:false,owner:false,ignored:undefined,dirty:true});
  expect(await record(page)).toBe('original');expect(await record(page,'drafts','sandbox')).toBeUndefined();
  expect((await record(page,'world','writer-lease')).writerId).toBe('replacement');
});

test('version change closes the old connection and preserves drafts for session-only use',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');const statuses=[],s=createWorkspaceStorage(m=>statuses.push(m));await s.open();
    s.setDraft('sandbox','my draft');await s.saveWorld('saved world');
    const db=await new Promise((r,j)=>{const q=indexedDB.open(databaseName,2);q.onsuccess=()=>r(q.result);q.onerror=()=>j(q.error);});
    try {
      const available=s.available;await s.acquire();s.setDraft('sandbox','session draft');const accepted=await s.saveWorld('session world');
      const draft=s.draft('sandbox');s.setProfile('lambdamoo');s.setDraft('sandbox','lambda session');await s.flush();s.setProfile('toaststunt');
      return {available,accepted,draft,restored:s.draft('sandbox'),session:statuses.some(m=>m.includes('Session only'))};
    }finally{db.close();await s.release();}
  });
  expect(result).toEqual({available:false,accepted:false,draft:'session draft',restored:'session draft',session:true});
});

test('invalid profiles and in-flight saves cannot change namespaces',async({page})=>{
  const result=await page.evaluate(async()=>{
    const {createWorkspaceStorage}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();
    try {
      const messages=[];try{s.setProfile('invalid');}catch(e){messages.push(e.message);}
      const saving=s.saveWorld('toast world');try{s.setProfile('lambdamoo');}catch(e){messages.push(e.message);}
      await saving;return messages;
    }finally{await s.release();}
  });
  expect(result).toEqual(['Unknown profile','Save pending changes before switching profiles']);
  expect(await record(page)).toBe('toast world');expect(await record(page,'world','lambdamoo')).toBeUndefined();
});

test('path scopes isolate saved worlds and drafts and reject switching with pending writes',async({page})=>{
 const result=await page.evaluate(async()=>{
  const {createWorkspaceStorage}=await import('/workspace-storage.js');const s=createWorkspaceStorage();await s.open();
  try{
   s.setDraft('same','legacy');await s.saveWorld('legacy world');
   s.setScope('objects');s.setDraft('same','objects draft');await s.saveWorld('objects world');
   s.setScope('sandbox');s.setDraft('same','sandbox draft');await s.saveWorld('sandbox world');
   s.setScope('objects');const objects=await s.read(),objectDraft=s.draft('same');
   s.setScope('foundations');const legacy=await s.read(),legacyDraft=s.draft('same');
   let invalid=false,pending=false;try{s.setScope('../bad');}catch{invalid=true;}
   const saving=s.saveWorld('updated legacy');try{s.setScope('verbs');}catch{pending=true;}await saving;
   s.setScope('sandbox');const sandbox=await s.read(),sandboxDraft=s.draft('same');
   return {objects,objectDraft,legacy,legacyDraft,sandbox,sandboxDraft,invalid,pending};
  }finally{await s.release();}
 });
 expect(result).toEqual({objects:'objects world',objectDraft:'objects draft',legacy:'legacy world',legacyDraft:'legacy',sandbox:'sandbox world',sandboxDraft:'sandbox draft',invalid:true,pending:true});
});
