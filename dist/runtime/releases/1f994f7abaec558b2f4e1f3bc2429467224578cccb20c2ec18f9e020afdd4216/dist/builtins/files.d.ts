import type { Utility } from './utilities.js';
import { type MooValue } from '../values/index.js';
import type { Execution } from '../runtime/execution.js';
export declare const fileBuiltins: Omit<Utility, 'invoke'>[];
export declare function invokeFileBuiltin(name: string, args: MooValue[], execution: Execution): MooValue;
