import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test, expect, readyBuiltins as ready, saved, run, openWorld as world, failWrites, record} from './helpers.js';
import {readFile} from 'node:fs/promises';
const dbName='moo-field-manual-workspace';
const snapshot=page=>record(page);
const seed=(page,data)=>record(page,'world',undefined,data);
async function upload(page,text,accept=true) {
  await world(page);
  if(accept!==null) page.once('dialog',d=>accept?d.accept():d.dismiss());
  await page.locator('#worldFile').setInputFiles({name:'world.json',mimeType:'application/json',buffer:Buffer.from(text)});
  await expect(page.locator('#importWorld')).toBeEnabled();
}
test('saved worlds preserve properties, inherited verbs, values and allocation after recycling', async({page})=> {
  await ready(page);
  await run(page,'p=create(#3); p.name="Saved room"; add_property(p,"score",12,{player,"rw"}); add_property(p,"values",{E_TYPE,1.5,["target" -> p]},{player,"rw"}); add_verb(p,{player,"rx","score"},{"this","none","this"}); set_verb_code(p,"score",{"return this.score;"}); c=create(p); recycle(c); return p;');
  await saved(page); await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'c=create(#43); return {c,parent(c),c:score(),c.values};');
  await expect(page.locator('#output')).toContainText('Return: {#45, #43, 12, {E_TYPE, 1.5, ["target" -> #43]}}');
  await saved(page); const data=JSON.parse(await snapshot(page));
  expect(data.nextId).toBe('46'); expect(data.objects.find(o=>o.id==='43').name).toBe('Saved room');
});

test('drafts survive immediate navigation, track changes and refresh; restore and reset are independent',async({page})=> {
  await ready(page);
  await codeView(page);await page.locator('#codeEditor').fill('return "my first draft";');
  await page.locator('#nextButton').click();
  await codeView(page);await page.locator('#codeEditor').fill('return "my second draft";');
  await saved(page); await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#lessonTitle')).toHaveText('notify()');
  await expect(page.locator('#codeEditor')).toHaveValue('return "my second draft";');
  await page.locator('#prevButton').click(); await expect(page.locator('#codeEditor')).toHaveValue('return "my first draft";');
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await codeView(page);await page.locator('#codeEditor').fill('"My explanation."; return 7;'); await saved(page);
  await page.reload(); await expect(page.locator('#codeEditor')).toHaveValue('"My explanation."; return 7;');
  await codeView(page);await page.locator('#restoreExample').click(); await saved(page); await page.reload();
  await expect(page.locator('#codeEditor')).toHaveValue(/Comments explain the code without printing/);
  await browse(page);await page.locator('#trackSelect').selectOption('builtins');
  await expect(page.locator('#codeEditor')).toHaveValue('return "my first draft";');
  await run(page,'this.lamp_on=9; return create(#3);'); await saved(page);
  const code=await page.locator('#codeEditor').inputValue();
  page.once('dialog',d=>d.accept()); await worldManagement(page);await page.locator('#resetWorld').click(); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toHaveValue(code);
  await expectProperty(page, 'lamp_on', '0');
  await run(page,'return children(#3);'); await expect(page.locator('#output')).toContainText('Return: {#42}');
});

test('export/import is portable and validated before replacement',async({page})=> {
  await ready(page); await run(page,'o=create(#3); o.name="Portable"; return o;'); await saved(page);
  await world(page);
  const downloadPromise=page.waitForEvent('download'); await page.locator('#exportWorld').click();
  const download=await downloadPromise, text=await readFile(await download.path(),'utf8');
  expect(JSON.parse(text).objects.find(o=>o.id==='43').name).toBe('Portable');
  await run(page,'#43.name="Current"; return 0;'); await saved(page);
  await upload(page,text,false); await expect(page.locator('#importWorld')).toBeEnabled();
  expect(JSON.parse(await snapshot(page)).objects.find(o=>o.id==='43').name).toBe('Current');
  await upload(page,'{bad json',null); await expect(page.locator('#workspaceProblem')).toContainText('Import failed');
  const incompatible=JSON.parse(text); incompatible.profile='lambdamoo';
  await upload(page,JSON.stringify(incompatible),null); await expect(page.locator('#workspaceProblem')).toContainText('Import failed');
  expect(JSON.parse(await snapshot(page)).objects.find(o=>o.id==='43').name).toBe('Current');
  await upload(page,text,true); await expect(page.locator('#workspaceProblem')).toBeHidden(); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return #43.name;'); await expect(page.locator('#output')).toContainText('Return: "Portable"');
});

test('write failures keep the current world, allow export and retry, and reject unpersisted imports',async({page})=> {
  await ready(page); const initial=await snapshot(page);
  await failWrites(page,true);
  await run(page,'this.lamp_on=7; return create(#3);');
  await expect(page.locator('#editorPanel .persistence-status')).toContainText('Not saved');
  expect(await snapshot(page)).toBe(initial);
  await world(page); const downloadPromise=page.waitForEvent('download'); await page.locator('#exportWorld').click();
  const text=await readFile(await (await downloadPromise).path(),'utf8');
  expect(JSON.parse(text).objects.some(o=>o.id==='43')).toBe(true);
  await upload(page,initial,true); await expect(page.locator('#workspaceProblem')).toContainText('Import was not saved');
  await expectProperty(page, 'lamp_on', '7');
  await failWrites(page,false); await page.locator('#retrySave').click(); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '7');
});

test('corrupt saved data is preserved and recoverable without silently overwriting it',async({page})=> {
  await ready(page); const original=await snapshot(page); await seed(page,'broken snapshot');
  await page.reload(); await world(page); await expect(page.locator('#workspaceProblem')).toContainText('could not be loaded');
  await expect(page.locator('#runButton')).toBeDisabled(); expect(await snapshot(page)).toBe('broken snapshot');
  const downloadPromise=page.waitForEvent('download'); await page.locator('#downloadOriginal').click();
  expect(await readFile(await (await downloadPromise).path(),'utf8')).toBe('broken snapshot');
  await upload(page,original,true); await saved(page); await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
});

test('only one tab writes; takeover reloads the latest world and draft',async({page,context})=> {
  await ready(page); await run(page,'this.lamp_on=6; return 0;'); await saved(page);
  const other=await context.newPage(); await other.goto('/');
  await expect(other.locator('#editorPanel .persistence-status')).toContainText('Open in another tab');
  await expect(other.locator('#runButton')).toBeDisabled(); await expect(other.locator('#codeEditor')).toBeDisabled();
  await expect(other.locator('#restoreExample')).toBeDisabled(); await expect(other.locator('#resetWorld')).toBeDisabled();
  await world(other); await expect(other.locator('#importWorld')).toBeDisabled(); await expect(other.locator('#exportWorld')).toBeEnabled();
  await other.locator('#takeWorkspace').click(); await expect(other.locator('#runButton')).toBeDisabled();
  await run(page,'this.lamp_on=8; return create(#3);'); await saved(page); await page.close();
  await expect(other.locator('#runButton')).toBeEnabled({timeout:10000});
  await expectProperty(other, 'lamp_on', '8');
  await expect(other.locator('#codeEditor')).toHaveValue('this.lamp_on=8; return create(#3);');
  await run(other,'return children(#3);'); await expect(other.locator('#output')).toContainText('Return: {#42, #43}');
});

test('unavailable IndexedDB offers session-only use that ends on refresh',async({page})=> {
  await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{get(){throw new Error('storage blocked');}}));
  await ready(page); await expect(page.locator('#editorPanel .persistence-status')).toContainText('Session only');
  await run(page,'return create(#3);'); await expect(page.locator('#output')).toContainText('Return: #43');
  // Explicitly accept losing this session's unsaved world on reload.
  page.once('dialog',d=>d.accept()); await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'return children(#3);'); await expect(page.locator('#output')).toContainText('Return: {#42}');
});

test('editing and saved refreshes work when Web Locks is unavailable',async({page})=> {
  await page.addInitScript(()=>Object.defineProperty(navigator,'locks',{value:undefined}));
  await ready(page);
  await expect(page.locator('#codeEditor')).toBeEditable();
  await run(page,'this.lamp_on=17; return create(#3);'); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toBeEditable();
  await expectProperty(page, 'lamp_on', '17');
  await run(page,'return children(#3);'); await expect(page.locator('#output')).toContainText('Return: {#42, #43}');
});

test('errors and limits save committed changes, Stop and grading do not pollute the saved world',async({page})=> {
  await ready(page);
  await run(page,'this.lamp_on=4; return 1/0;','runtime-error (committed)'); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '4');
  await run(page,'this.lamp_on=5; while(1) notify(player,"x"); endwhile','limit-exceeded (committed)'); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '5');
  const before=await snapshot(page);
  await page.evaluate(()=> {
    const observer=new MutationObserver(()=> {
      if(document.querySelector('#output').textContent.includes('stop pending')) {
        observer.disconnect();document.querySelector('#stopButton').click();
      }
    });
    observer.observe(document.querySelector('#output'),{childList:true,subtree:true});
  });
  await run(page,'this.lamp_on=9; create(#3); notify(player,"stop pending"); while(1) endwhile','cancelled (discarded)');
  expect(await snapshot(page)).toBe(before);
  await browse(page);await page.locator('#trackSelect').selectOption('foundations');
  await browse(page);await page.locator('#lessonNav button').filter({hasText:'Objects are the world'}).click();
  await run(page,'create(#3); player:tell("A workshop humming with possibility.");','Objective passed');
  const after=JSON.parse(await snapshot(page)); expect(after.objects.length).toBe(8);expect(after.nextId).toBe('44');
});

test('a draft write failure aborts the entire world/draft save transaction',async({page})=> {
  await ready(page); const before=await snapshot(page);
  await failWrites(page,'drafts');
  await run(page,'this.lamp_on=11; return 0;');
  await expect(page.locator('#editorPanel .persistence-status')).toContainText('Not saved');
  expect(await snapshot(page)).toBe(before);
  await failWrites(page,false); await world(page); await page.locator('#retrySave').click(); await saved(page);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '11');
  await expect(page.locator('#codeEditor')).toHaveValue('this.lamp_on=11; return 0;');
});

test('overlapping draft saves keep the latest text and show Saving until committed',async({page})=> {
  await ready(page); await saved(page);
  await page.evaluate(async name=> {
    const db=await new Promise(resolve=>{const r=indexedDB.open(name,1);r.onsuccess=()=>resolve(r.result);});
    const tx=db.transaction(['world','drafts'],'readwrite'); window.releaseStorage=false; window.queuedWrites=0;
    const original=IDBDatabase.prototype.transaction;
    IDBDatabase.prototype.transaction=function(...args){if(args[1]==='readwrite') window.queuedWrites++;return original.apply(this,args);};
    function hold(){const r=tx.objectStore('drafts').get('hold');r.onsuccess=()=>{if(!window.releaseStorage)hold();};}
    tx.oncomplete=()=>db.close();hold();
  },dbName);
  await codeView(page);await page.locator('#codeEditor').fill('return "older draft";');
  await page.waitForFunction(()=>window.queuedWrites>0);
  await codeView(page);await page.locator('#codeEditor').fill('return "latest draft";');
  await expect(page.locator('#editorPanel .persistence-status')).toHaveText('Saving…');
  await page.evaluate(()=>{window.releaseStorage=true;});
  await saved(page); await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expect(page.locator('#codeEditor')).toHaveValue('return "latest draft";');
});

test('back/forward navigation reacquires ownership and restores committed data',async({page})=> {
  await ready(page); await run(page,'this.lamp_on=13; return 0;');await saved(page);
  await page.goto('/index.html?visit=second');await expect(page.locator('#runButton')).toBeEnabled();
  await run(page,'this.lamp_on=14; return 0;');await saved(page);
  await page.goBack();await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'lamp_on', '14');
  await expect(page.locator('#codeEditor')).toHaveValue('this.lamp_on=14; return 0;');
});

test('refresh recovers automatically when the previous ownership record expires',async({page})=> {
  await ready(page); await run(page,'return "saved before refresh";'); await saved(page);
  // Simulate a page disappearing before it can remove its ownership record.
  await page.evaluate(()=> {
    const setItem=Storage.prototype.setItem;
    Storage.prototype.setItem=function(key,value){if(key!=='moo-released-workspace-writer') return setItem.call(this,key,value);};
    const original=IDBObjectStore.prototype.delete;
    IDBObjectStore.prototype.delete=function(key){return key==='writer-lease'?this.get(key):original.call(this,key);};
  });
  await page.reload();
  await expect(page.locator('#runButton')).toBeEnabled({timeout:10000});
  await expect(page.locator('#codeEditor')).toBeEditable();
  await expect(page.locator('#codeEditor')).toHaveValue('return "saved before refresh";');
  await run(page,'return "working after refresh";');
  await expect(page.locator('#output')).toContainText('Return: "working after refresh"');
});

test('an old writer cannot save after another tab owns the workspace',async({page})=> {
  await page.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:''}));
  await page.goto('/');
  const result=await page.evaluate(async()=> {
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');
    const storage=createWorkspaceStorage(); await storage.open(); await storage.saveWorld('original snapshot');
    const db=await new Promise(resolve=>{const r=indexedDB.open(databaseName,1);r.onsuccess=()=>resolve(r.result);});
    await new Promise((resolve,reject)=>{
      const tx=db.transaction('world','readwrite');
      tx.objectStore('world').put({writerId:'new-owner',expiresAt:Date.now()+30000},'writer-lease');
      tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);
    });
    const accepted=await storage.saveWorld('stale snapshot');
    const stored=await new Promise(resolve=>{const r=db.transaction('world').objectStore('world').get('current');r.onsuccess=()=>resolve(r.result);});
    await storage.release();db.close();return {accepted,stored};
  });
  expect(result).toEqual({accepted:false,stored:'original snapshot'});
});

test('existing teaching worlds are preserved until an explicit reset adopts the new hierarchy',async({page})=>{
  await ready(page);
  const legacy=await page.evaluate(async()=>{
    const {createRuntime,createWorld,moo}=await import('/runtime/dist/browser/index.js');
    const runtime=await createRuntime({profile:'toaststunt'}), world=createWorld({profile:'toaststunt'});
    world.addObject({id:0,owner:0,name:'System'});
    world.addObject({id:1,parent:0,owner:0,name:'Generic Room'});
    world.addObject({id:7,parent:0,owner:7,name:'Learner'});
    world.addObject({id:42,parent:1,owner:7,name:'My saved room'});
    world.addProperty(0n,'room',moo.object(1),7n,'r');
    world.addProperty(42n,'lamp_on',moo.int(9),7n,'rw');
    world.addProperty(42n,'locked',moo.int(1),7n,'rw');
    world.addVerb(7n,{names:'tell notify',owner:7n,perms:'rx',args:['this','none','this'],source:'return notify(this,tostr(@args));'});
    try {return runtime.saveWorld(world);} finally {runtime.dispose();}
  });
  await seed(page,legacy);
  await page.reload(); await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'parent', '#1');
  await expectProperty(page, 'name', '"My saved room"');
  expect(await snapshot(page)).toBe(legacy);
  page.once('dialog',d=>d.accept()); await worldManagement(page);await page.locator('#resetWorld').click();
  await expect(page.locator('#runButton')).toBeEnabled();
  await expectProperty(page, 'parent', '#3');
  await run(page,'player:tell("Inherited tell works"); return properties(this);');
  await expect(page.locator('#output')).toContainText('Inherited tell works');
  await expect(page.locator('#output')).toContainText('Return: {"lamp_on", "locked"}');
});

for (const replaced of [false,true]) test(`an expired lease ${replaced?'still fences a replaced writer':'can be renewed by the same writer during a save'}`,async({page})=>{
  await page.route(/\/app\.js(?:\?|$)/,route=>route.fulfill({contentType:'text/javascript',body:''}));
  await page.goto('/');
  const result=await page.evaluate(async replaced=>{
    const {createWorkspaceStorage,databaseName}=await import('/workspace-storage.js');
    const storage=createWorkspaceStorage();await storage.open();await storage.saveWorld('original');
    const db=await new Promise(resolve=>{const request=indexedDB.open(databaseName,1);request.onsuccess=()=>resolve(request.result);});
    await new Promise((resolve,reject)=>{
      const tx=db.transaction('world','readwrite'),store=tx.objectStore('world'),request=store.get('writer-lease');
      request.onsuccess=()=>store.put({...request.result,...(replaced?{writerId:'replacement-tab'}:{}),expiresAt:Date.now()-1},'writer-lease');
      tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);
    });
    const accepted=await storage.replaceWorld('prepared');
    const stored=await new Promise(resolve=>{const request=db.transaction('world').objectStore('world').get('current');request.onsuccess=()=>resolve(request.result);});
    await storage.release();db.close();return {accepted,stored};
  },replaced);
  expect(result).toEqual(replaced?{accepted:false,stored:'original'}:{accepted:true,stored:'prepared'});
});
