import type { Diagnostic, SyntaxNode } from '../ast/source.js';
import type { Statement } from '../ast/nodes.js';
import type { Profile } from './index.js';
export declare function lower(syntax: SyntaxNode, profile: Profile): {
    ok: true;
    body: readonly Statement[];
} | {
    ok: false;
    diagnostics: Diagnostic[];
};
