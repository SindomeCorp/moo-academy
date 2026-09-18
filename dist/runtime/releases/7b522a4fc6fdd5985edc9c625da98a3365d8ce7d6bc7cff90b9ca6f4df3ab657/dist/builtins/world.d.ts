import type { Evaluation } from '../runtime/suspension.js';
import type { Execution } from '../runtime/execution.js';
import { type MooValue } from '../values/index.js';
export declare function invokeWorldBuiltin(name: string, args: MooValue[], execution: Execution): Evaluation<MooValue | undefined>;
