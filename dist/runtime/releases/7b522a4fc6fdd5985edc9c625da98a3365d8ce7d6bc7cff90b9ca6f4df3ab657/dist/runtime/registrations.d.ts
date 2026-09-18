import type { World } from '../world/index.js';
import { type MooValue, type ErrorCode } from '../values/index.js';
import { MooError, type CallFrame } from './errors.js';
export interface HostVerbContext {
    readonly world: World;
    readonly frame: Readonly<CallFrame>;
    readonly args: readonly MooValue[];
    notify(recipient: MooValue, text: string): void;
    chargeSteps(count: number): void;
    chargeAllocations(count: number): void;
    raise(code: ErrorCode, message?: string, value?: MooValue): never;
}
export type HostVerb = (context: HostVerbContext) => MooValue;
export type HostVerbRegistrations = Readonly<Record<string, HostVerb>>;
export declare class HostRaisedError extends MooError {
}
export declare function raiseFromHost(code: ErrorCode, message?: string, value?: MooValue): never;
