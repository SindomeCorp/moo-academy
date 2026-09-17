import { moo } from '../values/index.js';
export const errorMessages = {
    E_FILE: 'File error', E_EXEC: 'Exec error', E_INTRPT: 'Interrupted',
    E_NONE: 'No error', E_TYPE: 'Type mismatch', E_DIV: 'Division by zero', E_PERM: 'Permission denied',
    E_PROPNF: 'Property not found', E_VERBNF: 'Verb not found', E_VARNF: 'Variable not found',
    E_INVIND: 'Invalid indirection', E_RECMOVE: 'Recursive move', E_MAXREC: 'Too many verb calls',
    E_RANGE: 'Range error', E_ARGS: 'Incorrect number of arguments', E_NACC: 'Move refused by destination',
    E_INVARG: 'Invalid argument', E_QUOTA: 'Resource limit exceeded', E_FLOAT: 'Floating-point arithmetic error',
};
export class MooError extends Error {
    code;
    value;
    name = 'MooError';
    span;
    frames;
    constructor(code, message = errorMessages[code], value = moo.int(0)) {
        super(message);
        this.code = code;
        this.value = value;
    }
}
export class LimitError extends Error {
    resource;
    name = 'LimitError';
    span;
    frames;
    constructor(resource) {
        super(`Execution ${resource} limit exceeded`);
        this.resource = resource;
    }
}
export function fail(code, message) { throw new MooError(code, message); }
export class UnsupportedSourceError extends Error {
    diagnostics;
    constructor(diagnostics) {
        super(diagnostics.map(d => d.message).join('; '));
        this.diagnostics = diagnostics;
    }
}
//# sourceMappingURL=errors.js.map