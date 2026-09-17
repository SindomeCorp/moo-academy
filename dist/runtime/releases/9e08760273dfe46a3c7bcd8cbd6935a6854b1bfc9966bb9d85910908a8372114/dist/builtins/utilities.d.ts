import type { BuiltinParameter, BuiltinValueType } from './catalog.js';
import type { Profile } from '../parser/index.js';
import type { Budget } from '../runtime/budget.js';
import { type MooValue } from '../values/index.js';
export interface UtilityContext {
    profile: Profile;
    budget: Budget;
}
export interface Utility {
    name: string;
    parameters: BuiltinParameter[];
    returns: BuiltinValueType;
    summary: string;
    notes: string[];
    rest?: BuiltinParameter;
    profiles?: Profile[];
    invoke: (args: MooValue[], context: UtilityContext) => MooValue;
}
export declare const utilities: Utility[];
export declare function str(v: MooValue): string;
export declare function int(v: MooValue): bigint;
export declare function flt(v: MooValue): number;
export declare function lst(v: MooValue): readonly MooValue[];
export declare function numeric(v: MooValue): number;
export declare function finite(n: number): MooValue;
export declare function text(s: string, budget: Budget): MooValue;
