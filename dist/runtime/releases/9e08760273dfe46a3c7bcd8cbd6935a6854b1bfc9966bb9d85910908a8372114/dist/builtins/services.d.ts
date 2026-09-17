import type { Utility } from './utilities.js';
import { type MooValue } from '../values/index.js';
import type { Execution } from '../runtime/execution.js';
export declare const serviceBuiltins: Omit<Utility, 'invoke'>[];
export declare function invokeServiceBuiltin(name: string, args: MooValue[], execution: Execution): MooValue;
