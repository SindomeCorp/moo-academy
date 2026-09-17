import { type Profile } from '../parser/index.js';
import type { MooValue } from '../values/index.js';
export type BuiltinValueType = MooValue['type'] | 'any';
export interface BuiltinParameter {
    readonly name: string;
    readonly types: readonly BuiltinValueType[];
    readonly description: string;
    readonly optional: boolean;
}
export interface BuiltinInfo {
    readonly name: string;
    readonly summary: string;
    readonly notes: readonly string[];
    readonly minArgs: number;
    /** null means unlimited. */
    readonly maxArgs: number | null;
    readonly parameters: readonly BuiltinParameter[];
    readonly rest?: BuiltinParameter;
    readonly returns: {
        readonly types: readonly (BuiltinValueType | 'never')[];
        readonly description: string;
    };
}
export interface BuiltinCatalogOptions {
    profile: Profile;
}
type Route = 'core' | 'world' | 'special';
export declare function listBuiltins(options: BuiltinCatalogOptions): readonly BuiltinInfo[];
export declare function getBuiltinInfo(name: string, options: BuiltinCatalogOptions): BuiltinInfo | undefined;
export declare function builtinRoute(name: string, profile: Profile): Route | undefined;
export declare function checkBuiltinArity(name: string, count: number, profile: Profile): void;
export {};
