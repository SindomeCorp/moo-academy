import type { World } from '../world/index.js';
import type { Runtime, ExecuteOptions, ExecutionResult } from './index.js';
import type { SnapshotLimits } from '../snapshots/codec.js';
export type SessionRunOptions = Omit<ExecuteOptions, 'world'>;
export declare function createSession(options: {
    runtime: Runtime;
    world: World;
}): WorldSession;
/** Explicit retained state, an initial reset baseline, and optional fresh attempts. */
export declare class WorldSession {
    #private;
    readonly runtime: Runtime;
    readonly world: World;
    constructor(runtime: Runtime, world: World);
    run(source: string, options?: SessionRunOptions): ExecutionResult;
    runFresh(source: string, options?: SessionRunOptions): {
        result: ExecutionResult;
        world: World;
    };
    save(limits?: SnapshotLimits): string;
    load(input: unknown, limits?: SnapshotLimits): void;
    reset(): void;
}
