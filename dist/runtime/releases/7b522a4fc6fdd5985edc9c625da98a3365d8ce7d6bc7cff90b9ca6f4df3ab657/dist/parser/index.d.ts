import { Parser } from 'web-tree-sitter';
import type { Diagnostic, SyntaxNode } from '../ast/source.js';
export type Profile = 'lambdamoo' | 'toaststunt';
export interface ParserOptions {
    profile: Profile;
    grammarWasm?: string | Uint8Array;
    runtimeWasm?: string;
}
export type ParseResult = {
    readonly ok: true;
    readonly profile: Profile;
    readonly syntax: SyntaxNode;
} | {
    readonly ok: false;
    readonly diagnostics: readonly Diagnostic[];
};
export declare class HostError extends Error {
    readonly name = "HostError";
}
export declare function assertProfile(value: unknown): asserts value is Profile;
/** Parser initialization is shared by web-tree-sitter in each JS realm. */
export declare function createParser(options: ParserOptions): Promise<MooParser>;
export declare class MooParser {
    #private;
    readonly profile: Profile;
    constructor(profile: Profile, parser: Parser);
    parse(source: string): ParseResult;
    dispose(): void;
}
