import type { Utility } from './utilities.js';
import { type MooValue } from '../values/index.js';
import type { Execution } from '../runtime/execution.js';
export declare const sqliteBuiltins: Omit<Utility, 'invoke'>[];
export declare function invokeSqliteBuiltin(name: string, args: MooValue[], execution: Execution): MooValue;
