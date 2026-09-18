import type { HostVerbRegistrations } from '../runtime/registrations.js';
import type { WorkerRequest, WorkerResponse } from './protocol.js';
/** Install this handler in a dedicated worker; host registrations stay in that worker. */
export declare function createWorkerHandler(send: (message: WorkerResponse) => void, hostVerbs?: HostVerbRegistrations): (request: WorkerRequest) => Promise<void>;
