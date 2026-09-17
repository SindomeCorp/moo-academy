import { moo } from '../values/index.js';
import { MooError } from './errors.js';
import { HostError } from '../parser/index.js';
export class HostRaisedError extends MooError {
}
export function raiseFromHost(code, message, value) {
    moo.error(code);
    if (message !== undefined && typeof message !== 'string')
        throw new HostError('Host error messages must be strings');
    if (value !== undefined)
        moo.list([value]);
    throw new HostRaisedError(code, message, value);
}
//# sourceMappingURL=registrations.js.map