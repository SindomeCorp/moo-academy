// This layer reports grammar diagnostics only. It never executes MOO code.
export async function createSyntaxService() {
  const { Parser, Language } = await import('./vendor/tree-sitter.js');
  await Parser.init({ locateFile: () => new URL('./vendor/tree-sitter.wasm', import.meta.url).href });
  const language = await Language.load(new URL('./vendor/tree-sitter-moo.wasm', import.meta.url).href);
  const parser = new Parser();
  parser.setLanguage(language);
  return { parse: source => parser.parse(source), dispose: () => parser.delete() };
}

export function diagnostics(root) {
  const result = [];
  const pending = [root];
  while (pending.length) {
    const node = pending.pop();
    if (node.type === 'ERROR' || node.isMissing || node.type === 'unterminated_string') {
      result.push({
        line: node.startPosition.row + 1,
        column: node.startPosition.column + 1,
        message: node.isMissing ? `Missing ${node.type}` :
          node.type === 'unterminated_string' ? 'Unterminated string' : 'Unexpected or incomplete syntax',
        context: node.text.slice(0, 100)
      });
    }
    pending.push(...node.children.toReversed());
  }
  return result;
}
