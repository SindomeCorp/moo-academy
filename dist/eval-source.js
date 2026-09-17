import {diagnostics} from './syntax.js';

// Parse before adding return: semicolons inside strings and nested blocks must
// never be mistaken for the end of the user's final top-level expression.
export function prepareEvalSource(input, syntax) {
  if (input.length > 100_000) throw new Error('Eval accepts at most 100,000 characters.');
  let source = input.replace(/^(\s*);/, '$1 ');
  if (!source.trim()) throw new Error('Enter a MOO expression or statements to evaluate.');
  let tree;
  try {
    tree = syntax.parse(source);
    if (diagnostics(tree.rootNode).length) {
      tree.delete();
      source += '\n;';
      tree = syntax.parse(source);
    }
    const issues = diagnostics(tree.rootNode);
    if (issues.length) throw new Error(issues.map(d => `Line ${d.line}, column ${d.column}: ${d.message}`).join('\n'));
    const last = tree.rootNode.namedChildren.filter(node => node.type !== 'empty_statement').at(-1);
    // A standalone string is parsed as a MOO comment, but is useful as an
    // expression in Eval. Other comments retain normal MOO behavior.
    const simpleAssignment = last?.type === 'assignment_statement' && last.children.some(node => node.type === '=');
    if (last && (simpleAssignment || ['expression_statement', 'comment'].includes(last.type))) {
      source = source.slice(0, last.startIndex) + 'return ' + source.slice(last.startIndex);
    }
    return source;
  } finally { tree?.delete(); }
}
