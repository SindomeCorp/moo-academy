import { type World } from '../world/index.js';
import type { Profile } from '../parser/index.js';
/** Optional teaching data; the evaluator has no knowledge of these IDs. */
export declare function createTeachingWorld(options: {
    profile: Profile;
}): World;
