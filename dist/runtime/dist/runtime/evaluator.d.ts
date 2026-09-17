import type { Evaluation } from './suspension.js';
import type { Expr, Statement } from '../ast/nodes.js';
import { type Profile } from '../parser/index.js';
import { type MooValue } from '../values/index.js';
import { Budget } from './budget.js';
import type { EvaluationHost } from './host.js';
export declare class Evaluator {
    #private;
    readonly profile: Profile;
    readonly budget: Budget;
    readonly host: EvaluationHost;
    readonly variables: Map<string, MooValue>;
    constructor(profile: Profile, budget: Budget, host: EvaluationHost);
    evaluate(body: readonly Statement[]): Evaluation<MooValue>;
    private block;
    private statement;
    private withDollar;
    private args;
    private reference;
    expression(expression: Expr): Evaluation<MooValue>;
    private catchCodes;
    private matches;
}
