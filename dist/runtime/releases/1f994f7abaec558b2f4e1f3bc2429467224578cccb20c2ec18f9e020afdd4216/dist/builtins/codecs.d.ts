import type { Utility } from './utilities.js';
import { type MooValue } from '../values/index.js';
import type { Budget } from '../runtime/budget.js';
export declare const codecs: Utility[];
/** Binary strings use printable ASCII and ~XX escapes, independently of UTF-8 text. */
export declare function binaryDecode(source: string, budget: Budget): number[];
export declare function binaryEncode(bytes: readonly number[], budget: Budget): MooValue;
