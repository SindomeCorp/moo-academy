import { HostError } from '../parser/index.js';
import { LimitError } from './errors.js';
export class Budget {
    stats = { steps: 0, allocations: 0, peakEvaluationDepth: 0, peakCallDepth: 0, outputCharacters: 0, outputEvents: 0 };
    limits;
    #depth = 0;
    started = performance.now();
    #sliceStarted = this.started;
    #sliceSteps = 0;
    #suspensions = 0;
    remainingSteps() { return this.limits.steps - (this.stats.steps - this.#sliceSteps); }
    suspend() { if (++this.#suspensions > 100)
        throw new LimitError('suspensions'); }
    replenish() { this.#sliceStarted = performance.now(); this.#sliceSteps = this.stats.steps; }
    constructor(limits = {}) {
        this.limits = { seconds: limits.seconds ?? 30, steps: limits.steps ?? 100_000, allocations: limits.allocations ?? 1_000_000,
            evaluationDepth: limits.evaluationDepth ?? 200, callDepth: limits.callDepth ?? 50, outputCharacters: limits.outputCharacters ?? 20_000, outputEvents: limits.outputEvents ?? 1000 };
        for (const value of Object.values(this.limits)) {
            if (!Number.isSafeInteger(value) || value < 0)
                throw new HostError('Limits must be nonnegative safe integers');
        }
        if (this.limits.evaluationDepth > 256)
            throw new HostError('evaluationDepth cannot exceed 256');
        if (this.limits.callDepth > 100)
            throw new HostError('callDepth cannot exceed 100');
    }
    remainingSeconds() { return Math.max(0, this.limits.seconds - (performance.now() - this.#sliceStarted) / 1000); }
    step(count = 1) {
        if (this.remainingSeconds() <= 0)
            throw new LimitError('seconds');
        if (!Number.isSafeInteger(count) || count < 0)
            throw new HostError('Step charges must be nonnegative safe integers');
        if (count > this.remainingSteps())
            throw new LimitError('steps');
        this.stats.steps += count;
    }
    allocate(count) {
        if (!Number.isSafeInteger(count) || count < 0)
            throw new HostError('Allocation charges must be nonnegative safe integers');
        if (count > this.limits.allocations - this.stats.allocations)
            throw new LimitError('allocations');
        this.stats.allocations += count;
    }
    enter() {
        if (this.#depth >= this.limits.evaluationDepth)
            throw new LimitError('evaluationDepth');
        this.#depth++;
        this.stats.peakEvaluationDepth = Math.max(this.stats.peakEvaluationDepth, this.#depth);
    }
    leave() { this.#depth--; }
    call(depth) {
        if (depth > this.limits.callDepth)
            throw new LimitError('callDepth');
        this.stats.peakCallDepth = Math.max(this.stats.peakCallDepth, depth);
    }
    output(characters) {
        if (characters > this.limits.outputCharacters - this.stats.outputCharacters || this.stats.outputEvents >= this.limits.outputEvents)
            throw new LimitError('output');
        this.allocate(characters + 1);
        this.stats.outputCharacters += characters;
        this.stats.outputEvents++;
    }
}
//# sourceMappingURL=budget.js.map