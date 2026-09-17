import type { SourceSpan } from '../ast/source.js';
import { type ErrorCode, type MooValue } from '../values/index.js';
export declare const errorMessages: Record<ErrorCode, string>;
export interface CallFrame {
    this: bigint;
    definer: bigint;
    player: bigint;
    caller: bigint;
    programmer: bigint;
    verb: string;
    span?: SourceSpan;
}
export declare class MooError extends Error {
    readonly code: ErrorCode;
    readonly value: MooValue;
    readonly name = "MooError";
    span?: SourceSpan;
    frames?: readonly CallFrame[];
    constructor(code: ErrorCode, message?: string, value?: MooValue);
}
export declare class LimitError extends Error {
    readonly resource: string;
    readonly name = "LimitError";
    span?: SourceSpan;
    frames?: readonly CallFrame[];
    constructor(resource: string);
}
export declare function fail(code: ErrorCode, message?: string): never;
export declare class UnsupportedSourceError extends Error {
    readonly diagnostics: readonly import('../ast/source.js').Diagnostic[];
    constructor(diagnostics: readonly import('../ast/source.js').Diagnostic[]);
}
