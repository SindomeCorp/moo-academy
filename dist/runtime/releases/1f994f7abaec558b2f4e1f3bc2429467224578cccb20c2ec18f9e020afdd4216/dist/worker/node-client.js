import { Worker } from 'node:worker_threads';
export function nodeWorkerFactory(url = new URL('./node.js', import.meta.url)) {
    return () => {
        const worker = new Worker(url);
        return { postMessage: request => worker.postMessage(request), terminate: () => { void worker.terminate(); },
            subscribe(message, error) {
                const exit = (code) => error(new Error(`Worker exited before terminal transfer (${code})`));
                worker.on('message', message);
                worker.on('error', error);
                worker.on('messageerror', error);
                worker.on('exit', exit);
                return () => { worker.off('message', message); worker.off('error', error); worker.off('messageerror', error); worker.off('exit', exit); };
            } };
    };
}
//# sourceMappingURL=node-client.js.map