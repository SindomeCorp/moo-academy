import { type BuiltinInfo } from '../builtins/catalog.js';
import { type MooParser, type ParserOptions, type Profile } from '../parser/index.js';
import type { Diagnostic, SourceSpan } from '../ast/source.js';
import { type Limits, type Statistics } from './budget.js';
import { type CallFrame } from './errors.js';
import { type MooValue, type ErrorCode } from '../values/index.js';
import { World, type WorldChange } from '../world/index.js';
import { type OutputEvent } from './execution.js';
import { type LoadWorldOptions, type SnapshotLimits } from '../snapshots/codec.js';
import type { HostVerbRegistrations } from './registrations.js';
export interface Program {
    readonly profile: Profile;
    readonly source: string;
}
export interface RuntimeOptions extends ParserOptions {
    hostVerbs?: HostVerbRegistrations;
}
export type Compilation = {
    ok: true;
    program: Program;
} | {
    ok: false;
    diagnostics: readonly Diagnostic[];
};
export interface InvocationContext {
    this?: MooValue;
    player?: MooValue;
    caller?: MooValue;
    args?: readonly MooValue[];
    verb?: string;
}
export interface ExecuteOptions {
    context?: InvocationContext;
    limits?: Limits;
    world?: World;
    runId?: string;
    onOutput?: (event: OutputEvent) => void;
}
export interface RuntimeDiagnostic {
    category: 'runtime-error' | 'limit-exceeded';
    message: string;
    code?: ErrorCode;
    span?: SourceSpan;
    stack: readonly CallFrame[];
}
interface ResultBase {
    output: readonly OutputEvent[];
    changes: readonly WorldChange[];
    commit: 'committed' | 'discarded';
    statistics: Statistics;
}
export type ExecutionResult = ResultBase & ({
    status: 'completed';
    value: MooValue;
    diagnostics: readonly [];
} | {
    status: 'runtime-error' | 'limit-exceeded';
    diagnostics: readonly RuntimeDiagnostic[];
} | {
    status: 'syntax-error' | 'unsupported-feature';
    diagnostics: readonly Diagnostic[];
});
export declare function createRuntime(options: RuntimeOptions): Promise<Runtime>;
export declare class Runtime {
    #private;
    readonly parser: MooParser;
    readonly profile: Profile;
    constructor(parser: MooParser, hostVerbs?: HostVerbRegistrations);
    private check;
    listBuiltins(): readonly BuiltinInfo[];
    getBuiltinInfo(name: string): BuiltinInfo | undefined;
    hasHostVerb(id: string): boolean;
    saveWorld(world: World, limits?: SnapshotLimits): string;
    loadWorld(input: unknown, options?: LoadWorldOptions): World;
    compile(source: string): Compilation;
    execute(program: Program, options?: ExecuteOptions): ExecutionResult;
    executeAsync(program: Program, options?: ExecuteOptions): Promise<ExecutionResult>;
    private executeTask;
    run(source: string, options?: ExecuteOptions): ExecutionResult;
    runAsync(source: string, options?: ExecuteOptions): Promise<ExecutionResult>;
    dispose(): void;
}
export {};
