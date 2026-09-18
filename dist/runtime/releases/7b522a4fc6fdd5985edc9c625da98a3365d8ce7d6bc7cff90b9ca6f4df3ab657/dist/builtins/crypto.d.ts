import type { Utility } from './utilities.js';
import type { Budget } from '../runtime/budget.js';
export declare const cryptoBuiltins: Utility[];
export declare function secureBytes(length: number, budget: Budget): Uint8Array;
