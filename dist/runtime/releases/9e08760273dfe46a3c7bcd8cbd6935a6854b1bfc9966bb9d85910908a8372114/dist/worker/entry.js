import { createWorkerHandler } from './handler.js';
const scope = globalThis;
const handle = createWorkerHandler(message => scope.postMessage(message));
scope.addEventListener('message', (event) => { void handle(event.data); });
//# sourceMappingURL=entry.js.map