export interface Limits {
    seconds?: number;
    steps?: number;
    allocations?: number;
    evaluationDepth?: number;
    callDepth?: number;
    outputCharacters?: number;
    outputEvents?: number;
}
export interface Statistics {
    steps: number;
    allocations: number;
    peakEvaluationDepth: number;
    peakCallDepth: number;
    outputCharacters: number;
    outputEvents: number;
}
export declare class Budget {
    #private;
    readonly stats: Statistics;
    readonly limits: Required<Limits>;
    readonly started: number;
    remainingSteps(): number;
    suspend(): void;
    replenish(): void;
    constructor(limits?: Limits);
    remainingSeconds(): number;
    step(count?: number): void;
    allocate(count: number): void;
    enter(): void;
    leave(): void;
    call(depth: number): void;
    output(characters: number): void;
}
