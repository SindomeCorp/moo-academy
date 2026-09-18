import { type RuntimeOptions } from '../runtime/index.js';
import type { World } from '../world/index.js';
import { type LoadWorldOptions } from './codec.js';
export interface StandaloneLoadOptions extends LoadWorldOptions {
    grammarWasm?: RuntimeOptions['grammarWasm'];
    runtimeWasm?: RuntimeOptions['runtimeWasm'];
    hostVerbs?: RuntimeOptions['hostVerbs'];
}
/** Uses the saved profile; source is recompiled without executing any verbs. */
export declare function loadWorld(input: unknown, options?: StandaloneLoadOptions): Promise<World>;
