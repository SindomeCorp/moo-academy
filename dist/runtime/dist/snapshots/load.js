import { createRuntime } from '../runtime/index.js';
import { snapshotProfile } from './codec.js';
/** Uses the saved profile; source is recompiled without executing any verbs. */
export async function loadWorld(input, options = {}) {
    const profile = snapshotProfile(input, options.limits);
    const configuration = { profile };
    if (options.grammarWasm !== undefined)
        configuration.grammarWasm = options.grammarWasm;
    if (options.runtimeWasm !== undefined)
        configuration.runtimeWasm = options.runtimeWasm;
    if (options.hostVerbs !== undefined)
        configuration.hostVerbs = options.hostVerbs;
    const runtime = await createRuntime(configuration);
    try {
        return runtime.loadWorld(input, options);
    }
    finally {
        runtime.dispose();
    }
}
//# sourceMappingURL=load.js.map