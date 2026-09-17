import { MooError } from './errors.js';
/** Synchronous callers cannot wait; inject a catchable error at the call site. */
export function finishSync(task) {
    let step = task.next();
    while (!step.done)
        step = task.throw(new MooError('E_INVARG', 'suspend() requires runAsync() or a worker session'));
    return step.value;
}
export async function finishAsync(task) {
    let step = task.next();
    while (!step.done) {
        const milliseconds = step.value.milliseconds;
        await new Promise(resolve => setTimeout(resolve, milliseconds));
        step = task.next();
    }
    return step.value;
}
//# sourceMappingURL=suspension.js.map