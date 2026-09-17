export interface Suspension {
    readonly milliseconds: number;
}
export type Evaluation<T> = Generator<Suspension, T, void>;
/** Synchronous callers cannot wait; inject a catchable error at the call site. */
export declare function finishSync<T>(task: Evaluation<T>): T;
export declare function finishAsync<T>(task: Evaluation<T>): Promise<T>;
