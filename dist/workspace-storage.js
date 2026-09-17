// Browser-local persistence. Runtime snapshot validation stays in the runtime.
export const databaseName = 'moo-field-manual-workspace';
const leaseKey = 'writer-lease';
const leaseDuration = 5000;
export const maxDraftLength = 100_000;
const releasedWriterKey = 'moo-released-workspace-writer';
function releasedWriter() {try{return localStorage.getItem(releasedWriterKey);}catch{return null;}}
function requestValue(request) {
  return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
}
function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error ?? new Error('Storage transaction aborted'));
    transaction.onerror = () => {}; // onabort reports the transaction outcome.
  });
}
export function createWorkspaceStorage(onStatus = () => {}) {
  let db, owner = false, openingError, leaseTimer, releasing = false, acquiring;
  const writerId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  let queue = Promise.resolve(), writing = 0, dirtyWorld, failure = '', draftTimer;
  const drafts = new Map(), dirtyDrafts = new Map();
  let profile = 'toaststunt', scope = 'foundations';
  const worldKey = () => scope === 'foundations' ? (profile === 'toaststunt' ? 'current' : 'lambdamoo') : `path:${profile}:${scope}`;
  const legacyDraftKey = id => profile === 'toaststunt' ? id : 'lambdamoo:' + id;
  const draftKey = id => scope === 'foundations' ? legacyDraftKey(id) : `path:${profile}:${scope}:${id}`;
  function status() {
    let message;
    if (!owner && (dirtyWorld !== undefined || dirtyDrafts.size)) message = 'Not saved — this tab lost workspace access. Download drafts and export your world before reloading.';
    else if (!owner) message = 'Open in another tab or finishing a refresh. Editing resumes automatically when the workspace is available.';
    else if (!db) message = 'Session only — browser storage unavailable. Changes will not survive refresh.';
    else if (failure) message = 'Not saved — ' + failure + '. Retry, export your world, or download drafts.';
    else if (writing || dirtyWorld !== undefined || dirtyDrafts.size) message = 'Saving…';
    else message = 'Saved in this browser.';
    onStatus(message, {kind: !owner && (dirtyWorld !== undefined || dirtyDrafts.size) ? 'error' : !owner ? 'read-only' : !db ? 'session-only' : failure ? 'error' : writing || dirtyWorld !== undefined || dirtyDrafts.size ? 'saving' : 'saved'});
  }
  // Check and update ownership in one transaction. Every save checks the same
  // writer ID, so an expired/suspended tab cannot overwrite a newer owner's save.
  async function claimLease() {
    const tx = db.transaction('world', 'readwrite'), done = transactionDone(tx);
    let granted = false;
    const store = tx.objectStore('world'), request = store.get(leaseKey);
    request.onsuccess = () => {
      const lease = request.result;
      const valid = lease && typeof lease.writerId === 'string' && Number.isFinite(lease.expiresAt);
      if ((!releasing || lease?.writerId === writerId) && (!valid || lease.writerId === writerId || lease.writerId === releasedWriter() || lease.expiresAt <= Date.now())) {
        try { store.put({writerId, expiresAt:Date.now() + leaseDuration}, leaseKey); granted = true; }
        catch { tx.abort(); }
      }
    };
    await done; return granted;
  }
  function acquire() {
    if (acquiring) return acquiring;
    releasing = false;
    try {if(releasedWriter()===writerId)localStorage.removeItem(releasedWriterKey);}catch{}
    acquiring = (async () => {
      if (!db) { owner = true; status(); return true; } // Session-only worlds are not shared.
      try { owner = await claimLease(); }
      catch (error) { owner = false; failure = error.message; }
      clearTimeout(leaseTimer);
      if (owner && !releasing) leaseTimer = setTimeout(() => { if (!releasing) acquire(); }, 1000);
      status(); return owner;
    })().finally(() => { acquiring = undefined; });
    return acquiring;
  }
  async function open() {
    try {
      const request = indexedDB.open(databaseName, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('world'); request.result.createObjectStore('drafts');
      };
      db = await new Promise((resolve, reject) => {
        let abandoned = false;
        request.onsuccess = () => { if (abandoned) request.result.close(); else resolve(request.result); };
        request.onerror = () => reject(request.error);
        request.onblocked = () => { abandoned = true; reject(new Error('Database upgrade blocked by another tab')); };
      });
      db.onversionchange = () => { db.close(); db = undefined; status(); };
    } catch (error) { openingError = error; }
    await acquire();
  }
  async function read() {
    if (!db) return undefined;
    const tx = db.transaction(['world','drafts'], 'readonly'), done = transactionDone(tx);
    const [saved, keys, values] = await Promise.all([
      requestValue(tx.objectStore('world').get(worldKey())),
      requestValue(tx.objectStore('drafts').getAllKeys()), requestValue(tx.objectStore('drafts').getAll()), done,
    ]);
    drafts.clear(); dirtyDrafts.clear(); dirtyWorld = undefined; failure = '';
    keys.forEach((key, index) => {
      if (typeof key === 'string' && typeof values[index] === 'string') drafts.set(key, values[index]);
    });
    status(); return saved;
  }
  function enqueue(operation) {
    writing++; status();
    const result = queue.then(operation);
    queue = result.catch(() => {});
    return result.finally(() => { writing--; status(); });
  }
  async function write(world, changes) {
    if (!owner) throw new Error('This tab does not own the workspace');
    if (!db) throw openingError ?? new Error('Browser storage unavailable');
    for (const code of changes.values()) if (code !== null && (typeof code !== 'string' || code.length > maxDraftLength)) throw new Error('Draft exceeds the 100,000 character limit; shorten it or download drafts');
    const tx = db.transaction(['world','drafts'], 'readwrite'), done = transactionDone(tx);
    const store = tx.objectStore('world'), leaseRequest = store.get(leaseKey);
    let ownershipLost = false;
    leaseRequest.onsuccess = () => {
      const lease = leaseRequest.result;
      // Expiry permits another tab to claim the lease; it does not prove a
      // takeover happened. Native confirmation dialogs pause renewal timers.
      // The writer ID is checked and renewed in this same transaction, so a
      // competing claim either follows this renewal or fences this write.
      if (!lease || lease.writerId !== writerId) {
        ownershipLost = true; tx.abort(); return;
      }
      try {
        // Saving also renews ownership while the workspace is actively used.
        store.put({writerId, expiresAt:Date.now() + leaseDuration}, leaseKey);
        if (world !== undefined) store.put(world, worldKey());
        for (const [id, code] of changes) {
          if (code === null) tx.objectStore('drafts').delete(id); else tx.objectStore('drafts').put(code, id);
        }
      } catch { tx.abort(); }
    };
    try { await done; }
    catch (error) {
      if (ownershipLost) { owner = false; clearTimeout(leaseTimer); status(); throw new Error('Workspace ownership changed; export unsaved work before switching tabs'); }
      throw error;
    }
  }
  function flush() {
    clearTimeout(draftTimer);
    return enqueue(async () => {
      const world = dirtyWorld, changes = new Map(dirtyDrafts);
      if (world === undefined && !changes.size) return true;
      try {
        await write(world, changes);
        if (dirtyWorld === world) dirtyWorld = undefined;
        for (const [id, code] of changes) if (dirtyDrafts.get(id) === code) dirtyDrafts.delete(id);
        failure = ''; return true;
      } catch (error) { failure = error.message; return false; }
    });
  }
  return {
    open, acquire, read, flush,
    exportDrafts: () => Object.fromEntries(drafts),
    get owner() { return owner; },
    get available() { return Boolean(db); },
    get unsaved() { return writing > 0 || dirtyWorld !== undefined || dirtyDrafts.size > 0; },
    get hasChanges() { return dirtyWorld !== undefined || dirtyDrafts.size > 0; },
    setProfile(value) {
      if (!['toaststunt','lambdamoo'].includes(value)) throw new Error('Unknown profile');
      if (writing || (db && (dirtyWorld !== undefined || dirtyDrafts.size))) throw new Error('Save pending changes before switching profiles');
      profile = value;
      if (!db) { dirtyWorld = undefined; dirtyDrafts.clear(); }
    },
    setScope(value) {
      if (typeof value !== 'string' || !/^[a-z][a-z0-9-]*$/.test(value)) throw new Error('Unknown workspace scope');
      if (writing || (db && (dirtyWorld !== undefined || dirtyDrafts.size))) throw new Error('Save pending changes before switching paths');
      scope = value;
      if (!db) { dirtyWorld = undefined; dirtyDrafts.clear(); }
    },
    draft(id) { return drafts.get(draftKey(id)) ?? (['builtins','sandbox'].includes(scope) ? drafts.get(legacyDraftKey(id)) : undefined); },
    setDraft(id, code) {
      if (!owner) return;
      id = draftKey(id);
      if (code === null) drafts.delete(id); else drafts.set(id, code);
      dirtyDrafts.set(id, code); failure = ''; clearTimeout(draftTimer);
      draftTimer = setTimeout(flush, 200); status();
    },
    saveWorld(json) { dirtyWorld = json; failure = ''; if (!owner) {status();return Promise.resolve(false);} return flush(); },
    replaceWorld(json) {
      clearTimeout(draftTimer);
      return enqueue(async () => {
        const changes = new Map(dirtyDrafts);
        try {
          await write(json, changes); dirtyWorld = undefined;
          for (const [id, code] of changes) if (dirtyDrafts.get(id) === code) dirtyDrafts.delete(id);
          failure = ''; return true;
        } catch (error) { failure = error.message; return false; }
      });
    },
    prepareToLeave({pendingRun = false} = {}) {
      releasing = true; clearTimeout(leaseTimer);
      // Only an already-clean, idle page can advertise immediate takeover.
      // Pending writes/runs retain ownership until release finishes its save.
      if(owner && !pendingRun && !writing && dirtyWorld === undefined && !dirtyDrafts.size) {
        try {localStorage.setItem(releasedWriterKey,writerId);}catch{}
      }
    },
    async release() {
      releasing = true; clearTimeout(leaseTimer); clearTimeout(draftTimer);
      await acquiring;
      if (!await flush()) return false;
      await queue;
      if (db) {
        try {
          const tx = db.transaction('world', 'readwrite'), done = transactionDone(tx);
          const store = tx.objectStore('world'), request = store.get(leaseKey);
          request.onsuccess = () => { if (request.result?.writerId === writerId) store.delete(leaseKey); };
          await done;
        } catch { /* A destroyed page's lease expires without blocking future editing. */ }
      }
      owner = false; status(); return true;
    },
  };
}
