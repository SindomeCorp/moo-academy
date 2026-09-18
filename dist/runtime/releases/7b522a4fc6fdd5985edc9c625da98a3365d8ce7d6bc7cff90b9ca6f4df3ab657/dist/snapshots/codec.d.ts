import { type HostEnvironment } from '../host/environment.js';
import { type Profile } from '../parser/index.js';
import { World, type WorldLimits, type ObjectData } from '../world/index.js';
import { type EncodedValue } from '../values/index.js';
import type { Diagnostic } from '../ast/source.js';
export interface SnapshotLimits {
    maxCharacters?: number;
    maxNodes?: number;
    maxDepth?: number;
}
export interface LoadWorldOptions {
    unsupportedSourcePolicy?: 'reject' | 'retain';
    world?: World;
    worldLimits?: WorldLimits;
    limits?: SnapshotLimits;
}
export interface SnapshotCompiler {
    readonly profile: Profile;
    compile(source: string): {
        ok: true;
    } | {
        ok: false;
        diagnostics: readonly Diagnostic[];
    };
    hasHostVerb(id: string): boolean;
}
export interface SnapshotObject {
    player?: boolean;
    location?: string;
    contents?: string[];
    id: string;
    parent: string;
    owner: string;
    name: string;
    flags: ObjectData['flags'];
    properties: {
        name: string;
        origin: string;
        owner: string;
        perms: string;
        value: EncodedValue | null;
    }[];
    verbs: {
        names: string;
        owner: string;
        perms: string;
        args: readonly [string, string, string];
        source?: string;
        hostId?: string;
    }[];
}
export interface WorldSnapshot {
    environment?: HostEnvironment;
    version: 1;
    profile: Profile;
    nextId: string;
    objects: SnapshotObject[];
}
export declare function snapshotProfile(input: unknown, limits?: SnapshotLimits): Profile;
export declare function worldSnapshot(world: World, limits?: SnapshotLimits): WorldSnapshot;
export declare function saveWorld(world: World, limits?: SnapshotLimits): string;
export declare function decodeWorld(input: unknown, compiler: SnapshotCompiler, options?: LoadWorldOptions): World;
