export function createSession(options) {
    return new WorldSession(options.runtime, options.world);
}
/** Explicit retained state, an initial reset baseline, and optional fresh attempts. */
export class WorldSession {
    runtime;
    world;
    #initial;
    constructor(runtime, world) {
        this.runtime = runtime;
        this.world = world;
        this.#initial = runtime.saveWorld(world);
        // Validate baseline source/registrations now so Reset cannot discover stale code.
        runtime.loadWorld(this.#initial, { worldLimits: world.limits });
    }
    run(source, options = {}) {
        return this.runtime.run(source, { ...options, world: this.world });
    }
    runFresh(source, options = {}) {
        const world = this.runtime.loadWorld(this.#initial, { worldLimits: this.world.limits });
        return { result: this.runtime.run(source, { ...options, world }), world };
    }
    save(limits) { return this.runtime.saveWorld(this.world, limits); }
    load(input, limits) {
        this.runtime.loadWorld(input, { world: this.world, ...(limits === undefined ? {} : { limits }) });
    }
    reset() { this.runtime.loadWorld(this.#initial, { world: this.world }); }
}
//# sourceMappingURL=session.js.map