import { encodeValue, decodeValue } from '../values/index.js';
import { HostError } from '../parser/index.js';
export function initialEnvironment() { return { version: 1, time: 0, nextHandle: 1, files: [{ path: '/', kind: 'directory', content: '', mode: '755', created: 0, accessed: 0, modified: 0 }], handles: [] }; }
function bad() { throw new HostError('Invalid virtual host state'); }
const objectId = (s) => typeof s === 'string' && /^(0|-?[1-9]\d*)$/.test(s) && s.length <= 20 && BigInt(s) >= -(1n << 63n) && BigInt(s) < (1n << 63n);
const integer = (n) => typeof n === 'number' && Number.isSafeInteger(n) && n >= 0;
const keys = (o, names, optional = []) => !!o && typeof o === 'object' && !Array.isArray(o) && Object.keys(o).every(k => names.includes(k) || optional.includes(k)) && names.every(k => Object.hasOwn(o, k));
export function validateEnvironment(value) {
    if (!keys(value, ['version', 'time', 'nextHandle', 'files', 'handles'], ['connections', 'logs', 'shutdown', 'checkpoint', 'databases', 'fixtures', 'listeners', 'serverOptions']) || value.version !== 1 || !integer(value.time) || !integer(value.nextHandle) || value.nextHandle < 1 || !Array.isArray(value.files) || !Array.isArray(value.handles))
        bad();
    if (value.connections !== undefined) {
        if (!Array.isArray(value.connections))
            bad();
        const ids = new Set();
        for (const c of value.connections) {
            if (!keys(c, ['player', 'name', 'input', 'output', 'connectedAt', 'lastActive', 'options', 'prefix', 'suffix']) || !objectId(c.player) || ids.has(c.player) || typeof c.name !== 'string' || !Array.isArray(c.input) || c.input.some(s => typeof s !== 'string') || !Array.isArray(c.output) || c.output.some(s => typeof s !== 'string') || !integer(c.connectedAt) || !integer(c.lastActive) || typeof c.prefix !== 'string' || typeof c.suffix !== 'string' || !c.options || typeof c.options !== 'object' || Array.isArray(c.options) || Object.entries(c.options).some(([k, v]) => !['binary', 'hold-input', 'client-echo', 'disable-oob'].includes(k) || typeof v !== 'boolean'))
                bad();
            ids.add(c.player);
        }
    }
    if (value.logs !== undefined && (!Array.isArray(value.logs) || value.logs.some(s => typeof s !== 'string')))
        bad();
    if (value.shutdown !== undefined && typeof value.shutdown !== 'string')
        bad();
    if (value.checkpoint !== undefined && typeof value.checkpoint !== 'string')
        bad();
    if (value.databases !== undefined) {
        if (!Array.isArray(value.databases))
            bad();
        const ids = new Set();
        for (const d of value.databases) {
            if (!keys(d, ['id', 'path', 'data', 'options', 'lastRowId', 'open', 'limits']) || !integer(d.id) || d.id < 1 || ids.has(d.id) || typeof d.path !== 'string' || typeof d.data !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(d.data) || !integer(d.options) || d.options > 7 || typeof d.lastRowId !== 'string' || !/^-?(0|[1-9]\d*)$/.test(d.lastRowId) || d.lastRowId.length > 20 || typeof d.open !== 'boolean' || !Array.isArray(d.limits) || d.limits.length !== 3 || d.limits.some((n, i) => !integer(n) || n > [100000, 10000, 100][i]))
                bad();
            ids.add(d.id);
        }
    }
    if (value.fixtures !== undefined) {
        if (!Array.isArray(value.fixtures))
            bad();
        for (const fixture of value.fixtures) {
            if (!keys(fixture, ['builtin', 'args', 'result']) || typeof fixture.builtin !== 'string' || !['curl', 'exec', 'getenv', 'spellcheck', 'open_network_connection'].includes(fixture.builtin) || !Array.isArray(fixture.args))
                bad();
            for (const v of [...fixture.args, fixture.result])
                decodeValue(v, { profile: 'toaststunt' });
        }
    }
    if (value.listeners !== undefined) {
        if (!Array.isArray(value.listeners))
            bad();
        const ports = new Set();
        for (const listener of value.listeners) {
            if (!keys(listener, ['object', 'port', 'print']) || !objectId(listener.object) || BigInt(listener.object) < 0n || !integer(listener.port) || listener.port < 1 || listener.port > 65535 || ports.has(listener.port) || typeof listener.print !== 'boolean')
                bad();
            ports.add(listener.port);
        }
    }
    if (value.serverOptions !== undefined && (!keys(value.serverOptions, ['fg_ticks', 'fg_seconds']) || !integer(value.serverOptions.fg_ticks) || !integer(value.serverOptions.fg_seconds)))
        bad();
    const paths = new Map();
    for (const f of value.files) {
        if (!keys(f, ['path', 'kind', 'content', 'mode', 'created', 'accessed', 'modified']) || typeof f.path !== 'string' || !/^\/(?:[^/\x00-\x1f]+(?:\/[^/\x00-\x1f]+)*)?$/.test(f.path) || f.path.split('/').some(p => p === '.' || p === '..') || !['file', 'directory'].includes(String(f.kind)) || typeof f.content !== 'string' || (f.kind === 'directory' && f.content !== '') || typeof f.mode !== 'string' || !/^[0-7]{3}$/.test(f.mode) || !integer(f.created) || !integer(f.accessed) || !integer(f.modified) || paths.has(f.path))
            bad();
        paths.set(f.path, f);
    }
    if (paths.get('/')?.kind !== 'directory')
        bad();
    for (const f of paths.values())
        if (f.path !== '/' && paths.get(f.path.slice(0, f.path.lastIndexOf('/')) || '/')?.kind !== 'directory')
            bad();
    const ids = new Set();
    for (const h of value.handles) {
        if (!keys(h, ['id', 'path', 'mode', 'offset', 'eof']) || !integer(h.id) || h.id < 1 || h.id >= value.nextHandle || ids.has(h.id) || typeof h.path !== 'string' || paths.get(h.path)?.kind !== 'file' || typeof h.mode !== 'string' || !/^[rwa][+\-][tb][fn]$/.test(h.mode) || !integer(h.offset) || typeof h.eof !== 'boolean')
            bad();
        ids.add(h.id);
    }
}
export function freezeEnvironment(state) {
    validateEnvironment(state);
    const copy = structuredClone(state);
    const freeze = (value) => { if (value && typeof value === 'object') {
        Object.values(value).forEach(freeze);
        Object.freeze(value);
    } };
    freeze(copy);
    return copy;
}
export function virtualConnection(player, time = 0) {
    return { player, name: 'virtual:' + player, input: [], output: [], connectedAt: time, lastActive: time, prefix: '', suffix: '', options: { binary: false, 'hold-input': false, 'client-echo': true, 'disable-oob': false } };
}
export function createHostEnvironment(options = {}) {
    const state = initialEnvironment();
    state.connections = (options.connections ?? []).map(c => ({ ...virtualConnection(String(c.player)), ...(c.name === undefined ? {} : { name: c.name }), input: c.input ?? [] }));
    if (options.fixtures)
        state.fixtures = options.fixtures.map(f => ({ builtin: f.builtin, args: f.args.map(v => encodeValue(v, { profile: 'toaststunt' })), result: encodeValue(f.result, { profile: 'toaststunt' }) }));
    return freezeEnvironment(state);
}
//# sourceMappingURL=environment.js.map