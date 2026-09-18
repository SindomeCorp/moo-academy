import initSql from 'sql.js/dist/sql-asm.js';
let engine;
let loading;
export function initializeSqlite() {
    return loading ??= (async () => {
        // Node can also import our browser bundle; keep its CJS loader out of browsers.
        if (typeof process !== 'undefined' && process.versions?.node) {
            const { createRequire } = await import('node:module');
            const init = createRequire(import.meta.url)('sql.js/dist/sql-asm.js');
            engine = await init();
        }
        else
            engine = await initSql();
    })();
}
export function sqliteEngine() { if (!engine)
    throw new Error('SQLite was not initialized'); return engine; }
//# sourceMappingURL=sqlite.js.map