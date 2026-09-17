import type { SnapshotLimits } from '../snapshots/codec.js';
import { HostError, type ParserOptions } from '../parser/index.js';
import type { Runtime, ExecuteOptions, ExecutionResult } from '../runtime/index.js';
import type { OutputEvent } from '../runtime/execution.js';
import type { World } from '../world/index.js';
import type { WorkerRequest, WorkerResponse } from './protocol.js';
export interface WorkerTransport {
    postMessage(request: WorkerRequest): void;
    terminate(): void;
    subscribe(message: (response: WorkerResponse) => void, error: (error: unknown) => void): () => void;
}
export type WorkerFactory = () => WorkerTransport;
export interface WorkerSessionOptions {
    reuseWorker?: boolean;
    unsupportedSourcePolicy?: 'reject' | 'retain';
    runtime: Runtime;
    world: World;
    workerFactory?: WorkerFactory;
    parserOptions?: Omit<ParserOptions, 'profile'>;
}
export interface WorkerRunOptions extends Omit<ExecuteOptions, 'world' | 'runId'> {
    timeoutMs?: number;
}
export interface CancelledResult {
    status: 'cancelled';
    reason: 'stop' | 'timeout';
    commit: 'discarded';
    output: readonly OutputEvent[];
    changes: readonly [];
    diagnostics: readonly [];
    statistics: null;
}
export interface WorkerRun {
    result: Promise<ExecutionResult | CancelledResult>;
    stop(): void;
}
export declare class WorkerHostError extends HostError {
    readonly output: readonly OutputEvent[];
    readonly commit = "unavailable";
    constructor(message: string, output: readonly OutputEvent[]);
}
export declare function browserWorkerFactory(url?: URL): WorkerFactory;
export declare class WorkerSession {
    #private;
    readonly options: WorkerSessionOptions;
    private dropWorker;
    private idle;
    private worker;
    /** Start parser/world validation without executing learner code. */
    warmup(): void;
    dispose(): void;
    constructor(options: WorkerSessionOptions);
    get world(): World;
    get busy(): boolean;
    save(limits?: SnapshotLimits): string;
    load(input: unknown, limits?: SnapshotLimits): void;
    reset(): void;
    run(source: string, options?: WorkerRunOptions): WorkerRun;
}
export declare function createWorkerSession(options: WorkerSessionOptions): WorkerSession;
