import type { Profile } from '../parser/index.js';
import type { Budget } from '../runtime/budget.js';
import { type MooValue } from '../values/index.js';
interface BuiltinContext {
    profile: Profile;
    budget: Budget;
}
export declare function invokeBuiltin(name: string, args: MooValue[], context: BuiltinContext): MooValue;
export {};
