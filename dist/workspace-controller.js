// Persistence ordering shared by navigation, execution and page lifecycle.
// Rendering, lesson selection and runtime ownership stay with the application.
export function createWorkspaceController({storage, serialize, getWorld, sessionWorlds, workspaceId}) {
  return {
    async saveBeforeNavigation() {
      if (storage.owner && storage.available && !await storage.flush()) return false;
      if (storage.hasChanges && !storage.owner) return false;
      if (!storage.available && getWorld()) sessionWorlds.set(workspaceId(), serialize(getWorld()));
      return true;
    },
    async saveCommitted(result, world) {
      if (result.commit === 'committed' && result.changes.length) return storage.saveWorld(serialize(world));
      return true;
    },
    async leave(pendingRun) {
      storage.prepareToLeave({pendingRun:Boolean(pendingRun)});
      await pendingRun?.result.catch(() => {});
      if (!storage.available && getWorld()) sessionWorlds.set(workspaceId(), serialize(getWorld()));
      return storage.release();
    },
    async resume() {
      if (!await storage.acquire()) return false;
      // A failed departure must not erase the only copy of unsaved local work.
      if (storage.hasChanges && !await storage.flush()) return false;
      return true;
    },
  };
}
