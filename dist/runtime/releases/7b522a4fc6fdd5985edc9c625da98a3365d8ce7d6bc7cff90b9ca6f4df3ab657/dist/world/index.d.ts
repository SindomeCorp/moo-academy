import { type HostEnvironment } from '../host/environment.js';
import { type Profile } from '../parser/index.js';
import { type MooValue } from '../values/index.js';
import type { Budget } from '../runtime/budget.js';
export interface PropertyData {
    readonly name: string;
    readonly origin: bigint;
    readonly owner: bigint;
    readonly perms: string;
    readonly value: MooValue | null;
}
export interface VerbData {
    readonly names: string;
    readonly owner: bigint;
    readonly perms: string;
    readonly args: readonly [string, string, string];
    readonly source: string;
    readonly hostId?: string;
}
export interface ObjectData {
    readonly id: bigint;
    readonly parent: bigint;
    readonly name: string;
    readonly owner: bigint;
    readonly flags: Readonly<{
        programmer: number;
        wizard: number;
        r: number;
        w: number;
        f: number;
    }>;
    readonly player?: boolean;
    readonly location?: bigint;
    readonly contents?: readonly bigint[];
    readonly properties: readonly PropertyData[];
    readonly verbs: readonly VerbData[];
}
export type WorldChange = {
    kind: 'object-created';
    object: bigint;
    after: ObjectData;
} | {
    kind: 'object-updated';
    object: bigint;
    before: ObjectData;
    after: ObjectData;
} | {
    kind: 'object-recycled';
    object: bigint;
    before: ObjectData;
} | {
    kind: 'host-state';
    before: HostEnvironment | undefined;
    after: HostEnvironment | undefined;
} | {
    kind: 'allocation-state';
    before: bigint;
    after: bigint;
};
export interface WorldLimits {
    objects?: number;
    properties?: number;
    verbs?: number;
    valueNodes?: number;
    stringUnits?: number;
    inheritanceDepth?: number;
}
export declare const prepositionGroups: readonly ["with/using", "at/to", "in front of", "in/inside/into", "on top of/on/onto/upon", "out of/from inside/from", "over", "through", "under/underneath/beneath", "behind", "beside", "for/about", "is", "as", "off/off of"];
export declare function verbMatches(names: string, sought: string): boolean;
export declare function createWorld(options: {
    profile: Profile;
    limits?: WorldLimits;
}): World;
export declare class World {
    #private;
    readonly profile: Profile;
    readonly limits: Required<WorldLimits>;
    get environment(): HostEnvironment | undefined;
    setEnvironment(environment: HostEnvironment, budget?: Budget): void;
    constructor(options: {
        profile: Profile;
        limits?: WorldLimits;
    });
    get nextId(): bigint;
    assertIdle(): void;
    /** Import managed records after validation; replacement is atomic. */
    restore(records: readonly ObjectData[], nextId: bigint, environment?: HostEnvironment): void;
    replaceWith(world: World): void;
    acquireExecution(): () => void;
    /** Reserve committed state while a separate worker owns a working copy. */
    acquireIsolation(): () => void;
    objects(): readonly ObjectData[];
    valid(id: bigint): boolean;
    get(id: bigint, indirect?: boolean): ObjectData;
    changes(before: readonly ObjectData[], beforeNextId?: bigint, beforeEnvironment?: HostEnvironment): WorldChange[];
    ancestors(id: bigint, budget?: Budget): ObjectData[];
    children(id: bigint): ObjectData[];
    private descendants;
    private commit;
    private validateValue;
    addObject(options: {
        id?: bigint | number;
        parent?: bigint | number;
        owner?: bigint | number;
        name?: string;
    }, budget?: Budget): bigint;
    recycle(id: bigint, budget?: Budget): void;
    recreate(id: bigint, parent: bigint, owner: bigint, budget?: Budget): bigint;
    resetMaxObject(budget?: Budget): void;
    renumber(id: bigint, budget?: Budget): bigint;
    setPlayer(id: bigint, player: boolean, budget?: Budget): void;
    reparent(id: bigint, parent: bigint, budget?: Budget): void;
    relocate(id: bigint, destination: bigint, position?: number, budget?: Budget): void;
    property(id: bigint, name: string, budget?: Budget): PropertyData;
    getProperty(id: bigint, name: string, budget?: Budget): MooValue;
    setProperty(id: bigint, name: string, value: MooValue, budget?: Budget): void;
    addProperty(id: bigint, name: string, value: MooValue, owner: bigint, perms: string, budget?: Budget): void;
    deleteProperty(id: bigint, name: string, budget?: Budget): void;
    clearProperty(id: bigint, name: string, budget?: Budget): void;
    setPropertyInfo(id: bigint, name: string, owner: bigint, perms: string, newName: string | undefined, budget?: Budget): void;
    ownVerb(id: bigint, descriptor: string | bigint): {
        object: ObjectData;
        verb: VerbData;
        index: number;
    };
    findVerb(id: bigint, name: string, budget?: Budget): {
        definer: bigint;
        verb: VerbData;
    } | undefined;
    addVerb(id: bigint, verb: VerbData, budget?: Budget): void;
    setVerb(id: bigint, descriptor: string | bigint, patch: Partial<VerbData>, budget?: Budget): void;
    deleteVerb(id: bigint, descriptor: string | bigint, budget?: Budget): void;
    private validateVerb;
}
