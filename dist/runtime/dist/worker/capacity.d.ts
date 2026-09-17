import type { WorldLimits } from '../world/index.js';
import type { SnapshotLimits } from '../snapshots/codec.js';
/** Conservative terminal capacity reserved from the world's configured quotas. */
export declare function transferCapacity(limits: Required<WorldLimits>): Required<SnapshotLimits>;
