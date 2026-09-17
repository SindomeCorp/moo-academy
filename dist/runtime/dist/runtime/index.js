import { finishSync, finishAsync } from './suspension.js';
import { initializeSqlite } from '../host/sqlite.js';
import { listBuiltins, getBuiltinInfo } from '../builtins/catalog.js';
import { createParser, HostError } from '../parser/index.js';
import { lower } from '../parser/compile.js';
import { Budget } from './budget.js';
import { MooError, LimitError, UnsupportedSourceError } from './errors.js';
import { moo, encodeValue } from '../values/index.js';
import { World, createWorld } from '../world/index.js';
import { Execution } from './execution.js';
import { decodeWorld, saveWorld } from '../snapshots/codec.js';
export async function createRuntime(options) {
    if (options?.profile === 'toaststunt')
        await initializeSqlite();
    const parser = await createParser(options);
    try {
        return new Runtime(parser, options.hostVerbs);
    }
    catch (error) {
        parser.dispose();
        throw error;
    }
}
export class Runtime {
    parser;
    #programs = new WeakMap();
    #disposed = false;
    #runCounter = 0;
    #hostVerbs = new Map();
    profile;
    constructor(parser, hostVerbs = {}) {
        this.parser = parser;
        this.profile = parser.profile;
        if (!hostVerbs || typeof hostVerbs !== 'object' || Array.isArray(hostVerbs))
            throw new HostError('hostVerbs must be an object mapping IDs to functions');
        for (const [id, implementation] of Object.entries(hostVerbs)) {
            if (!/^[a-zA-Z0-9_.:-]{1,128}$/.test(id) || typeof implementation !== 'function')
                throw new HostError('Host verbs require stable IDs and synchronous implementations');
            this.#hostVerbs.set(id, implementation);
        }
    }
    check() { if (this.#disposed)
        throw new HostError('Runtime has been disposed'); }
    listBuiltins() { this.check(); return listBuiltins({ profile: this.profile }); }
    getBuiltinInfo(name) { this.check(); return getBuiltinInfo(name, { profile: this.profile }); }
    hasHostVerb(id) { this.check(); return this.#hostVerbs.has(id); }
    saveWorld(world, limits) {
        this.check();
        if (world.profile !== this.profile)
            throw new HostError('World and runtime profiles must match');
        return saveWorld(world, limits);
    }
    #snapshotCompilations = new Map();
    #snapshotSourceUnits = 0;
    loadWorld(input, options = {}) {
        this.check();
        // Snapshot validation repeats for worker commits and workspace reloads. Keep a
        // bounded, runtime-local cache keyed by the exact source, never by verb ID.
        return decodeWorld(input, { profile: this.profile, hasHostVerb: id => this.hasHostVerb(id), compile: source => {
                const cached = this.#snapshotCompilations.get(source);
                if (cached)
                    return cached;
                const result = this.compile(source);
                if (source.length <= 4_000_000) {
                    while (this.#snapshotCompilations.size >= 4096 || this.#snapshotSourceUnits + source.length > 4_000_000) {
                        const oldest = this.#snapshotCompilations.keys().next().value;
                        this.#snapshotCompilations.delete(oldest);
                        this.#snapshotSourceUnits -= oldest.length;
                    }
                    this.#snapshotCompilations.set(source, result);
                    this.#snapshotSourceUnits += source.length;
                }
                return result;
            } }, options);
    }
    compile(source) {
        this.check();
        const parsed = this.parser.parse(source);
        if (!parsed.ok)
            return parsed;
        const converted = lower(parsed.syntax, this.profile);
        if (!converted.ok)
            return converted;
        const program = Object.freeze({ profile: this.profile, source });
        this.#programs.set(program, converted.body);
        return { ok: true, program };
    }
    execute(program, options = {}) {
        return finishSync(this.executeTask(program, options));
    }
    executeAsync(program, options = {}) {
        return finishAsync(this.executeTask(program, options));
    }
    *executeTask(program, options) {
        this.check();
        const body = this.#programs.get(program);
        if (!body || program.profile !== this.profile)
            throw new HostError('Program belongs to another runtime or profile');
        const defaults = options.world?.environment?.serverOptions;
        const budget = new Budget({ ...(defaults ? { steps: defaults.fg_ticks, seconds: defaults.fg_seconds } : {}), ...options.limits });
        const world = options.world ?? createWorld({ profile: this.profile });
        if (!(world instanceof World) || world.profile !== this.profile)
            throw new HostError('World and runtime profiles must match');
        if (options.onOutput !== undefined && typeof options.onOutput !== 'function')
            throw new HostError('onOutput must be a function');
        if (options.runId !== undefined && (typeof options.runId !== 'string' || !options.runId.length || options.runId.length > 256))
            throw new HostError('runId must be a nonempty string of at most 256 characters');
        const context = options.context ?? {};
        if (context.verb !== undefined && typeof context.verb !== 'string')
            throw new HostError('Context verb must be a string');
        const frame = { this: -1n, player: -1n, caller: -1n, programmer: -1n, definer: -1n, verb: context.verb ?? '' };
        for (const key of ['this', 'player', 'caller']) {
            const value = context[key] ?? moo.object(-1);
            if (value.type !== 'object')
                throw new HostError(`${key} context must be an object reference`);
            encodeValue(value, { profile: this.profile });
            frame[key] = value.value;
        }
        frame.programmer = frame.player;
        const args = moo.list(context.args ?? []);
        encodeValue(args, { profile: this.profile });
        const release = world.acquireExecution();
        try {
            const before = world.objects(), beforeNextId = world.nextId, beforeEnvironment = world.environment;
            const taskId = ++this.#runCounter;
            const execution = new Execution(world, budget, source => {
                const compiled = this.#snapshotCompilations.get(source) ?? this.compile(source);
                return compiled.ok ? { ok: true, body: this.#programs.get(compiled.program) } : compiled;
            }, options.runId ?? `run-${taskId}`, options.onOutput, this.#hostVerbs, taskId);
            const base = { output: execution.output, changes: [], commit: 'committed', statistics: budget.stats };
            try {
                const value = yield* execution.run(body, frame, context.args ?? []);
                // Reserve a bounded, lossless result for both direct and worker callers.
                // Local values can share subtrees whose expanded encoding is much larger.
                try {
                    encodeValue(value, { profile: this.profile });
                }
                catch (error) {
                    if (!(error instanceof HostError))
                        throw error;
                    throw new LimitError('resultValue');
                }
                return { ...base, changes: world.changes(before, beforeNextId, beforeEnvironment), status: 'completed', value, diagnostics: [] };
            }
            catch (error) {
                if (error instanceof UnsupportedSourceError) {
                    release();
                    world.restore(before, beforeNextId, beforeEnvironment);
                    return { ...base, status: 'unsupported-feature', commit: 'discarded', diagnostics: error.diagnostics };
                }
                if (!(error instanceof MooError) && !(error instanceof LimitError))
                    throw error;
                const status = error instanceof MooError ? 'runtime-error' : 'limit-exceeded';
                const diagnostic = { category: status, message: error.message, stack: error.frames ?? [] };
                if (error instanceof MooError)
                    diagnostic.code = error.code;
                if (error.span)
                    diagnostic.span = error.span;
                return { ...base, changes: world.changes(before, beforeNextId, beforeEnvironment), status, diagnostics: [diagnostic] };
            }
        }
        finally {
            release();
        }
    }
    run(source, options = {}) {
        const compiled = this.compile(source);
        if (compiled.ok)
            return this.execute(compiled.program, options);
        return { status: compiled.diagnostics.some(d => d.category === 'syntax-error') ? 'syntax-error' : 'unsupported-feature',
            diagnostics: compiled.diagnostics, output: [], changes: [], commit: 'discarded',
            statistics: { steps: 0, allocations: 0, peakEvaluationDepth: 0, peakCallDepth: 0, outputCharacters: 0, outputEvents: 0 } };
    }
    async runAsync(source, options = {}) {
        const compiled = this.compile(source);
        if (compiled.ok)
            return this.executeAsync(compiled.program, options);
        return this.run(source, options);
    }
    dispose() { this.parser.dispose(); this.#snapshotCompilations.clear(); this.#snapshotSourceUnits = 0; this.#disposed = true; this.#programs = new WeakMap(); }
}
//# sourceMappingURL=index.js.map