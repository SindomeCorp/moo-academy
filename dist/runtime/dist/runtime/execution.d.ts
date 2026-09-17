import type { Evaluation } from './suspension.js';
import type { Statement } from '../ast/nodes.js';
import type { Diagnostic, SourceSpan } from '../ast/source.js';
import { type MooValue } from '../values/index.js';
import type { World } from '../world/index.js';
import type { Budget } from './budget.js';
import { MooError, type CallFrame } from './errors.js';
import type { EvaluationHost } from './host.js';
import { type HostVerb } from './registrations.js';
export interface OutputEvent {
    readonly runId: string;
    readonly sequence: number;
    readonly recipient: MooValue;
    readonly text: string;
}
export type CompileBody = (source: string) => {
    ok: true;
    body: readonly Statement[];
} | {
    ok: false;
    diagnostics: readonly Diagnostic[];
};
export declare class Execution implements EvaluationHost {
    #private;
    readonly world: World;
    readonly budget: Budget;
    readonly compile: CompileBody;
    readonly runId: string;
    readonly onOutput?: ((event: OutputEvent) => void) | undefined;
    readonly hostVerbs: ReadonlyMap<string, HostVerb>;
    readonly taskId: number;
    readonly output: OutputEvent[];
    readonly frames: CallFrame[];
    taskLocal: MooValue;
    constructor(world: World, budget: Budget, compile: CompileBody, runId: string, onOutput?: ((event: OutputEvent) => void) | undefined, hostVerbs?: ReadonlyMap<string, HostVerb>, taskId?: number);
    get current(): CallFrame;
    run(body: readonly Statement[], frame: CallFrame, args: readonly MooValue[]): Evaluation<MooValue>;
    call(receiver: MooValue, name: MooValue, args: MooValue[], span: SourceSpan): Evaluation<MooValue>;
    pass(args: MooValue[], span: SourceSpan): Evaluation<MooValue>;
    private invoke;
    builtin(name: string, args: MooValue[], span: SourceSpan): Evaluation<MooValue | undefined>;
    initialize(id: bigint): Evaluation<void>;
    move(id: bigint, destination: bigint, position: number): Evaluation<MooValue>;
    dynamicBuiltin(name: string, args: MooValue[]): Evaluation<MooValue>;
    evaluateSource(lines: string[]): Evaluation<MooValue>;
    notify(recipient: MooValue, message: MooValue): MooValue;
    traceback(error: MooError): MooValue;
}
