// Structural exercise feedback is deliberately separate from syntax and execution.
const field = (node, name) => node?.childForFieldName(name);
const unwrap = node => node?.type === 'parenthesized_expression' ? unwrap(node.namedChildren[0]) : node;
const identifier = (node, name) => unwrap(node)?.type === 'identifier' && unwrap(node).text.toLowerCase() === name;
const integer = (node, value) => unwrap(node)?.type === 'integer' && Number(unwrap(node).text) === value;
const nodes = (node, type) => node ? [node, ...node.descendantsOfType(type)].filter(n => n.type === type) : [];
const property = (node, name) => unwrap(node)?.type === 'property_access' &&
  identifier(field(unwrap(node), 'receiver'), 'this') && identifier(field(unwrap(node), 'property'), name);
function stringValue(node) {
  node = unwrap(node);
  if (node?.type !== 'string') return null;
  let value = '';
  for (let i = 1; i < node.text.length - 1; i++) {
    if (node.text[i] === '\\') i++;
    value += node.text[i];
  }
  return value;
}
const tells = root => nodes(root, 'verb_call').filter(n =>
  identifier(field(n, 'receiver'), 'player') && identifier(field(n, 'verb'), 'tell'));
const argumentsOf = node => field(node, 'arguments').namedChildren;
const says = (root, message) => tells(root).some(n => argumentsOf(n).some(a => stringValue(a) === message));

export function assess(id, root) {
  switch (id) {
    case 'comments': {
      const call = tells(root).find(call => argumentsOf(call).some(arg => stringValue(arg) === 'Hello from MOO!'));
      return Boolean(call && root.namedChildren.filter(node => node.type === 'comment' && node.endIndex <= call.startIndex &&
        (stringValue(node.namedChildren[0]) ?? '').trim().length > 0).length >= 2);
    }
    case 'objects': return says(root, 'A workshop humming with possibility.');
    case 'properties': return nodes(root, 'assignment_statement').some(n =>
      property(field(n, 'left'), 'lamp_on') && integer(field(n, 'right'), 1) &&
      n.children.some(c => c.type === '=')) && says(root, 'The lamp clicks on.');
    case 'args': return tells(root).some(n => argumentsOf(n).some(a => {
      a = unwrap(a);
      return a?.type === 'index_expression' && identifier(field(a, 'collection'), 'args') && integer(field(a, 'index'), 1);
    }) && argumentsOf(n).some(a => stringValue(a) === 'Color: '));
    case 'branching': return nodes(root, 'if_statement').some(n => {
      if (!property(field(n, 'condition'), 'locked')) return false;
      const alternative = n.namedChildren.find(c => c.type === 'else_clause');
      return n.namedChildren.filter(c => c.type !== 'else_clause' && c.type !== 'elseif_clause')
        .some(c => says(c, 'The door is locked.')) && says(alternative, 'You enter.');
    });
    case 'lists': return nodes(root, 'for_statement').some(n =>
      identifier(field(n, 'value'), 'tool') && identifier(field(n, 'collection'), 'tools') &&
      tells(n).some(call => argumentsOf(call).some(a => identifier(a, 'tool'))));
    case 'errors': return nodes(root, 'except_clause').some(n => {
      const close = n.children.findIndex(c => c.type === ')');
      return n.children.slice(0, close).some(c => c.type === 'error_constant' && c.text === 'E_PROPNF') &&
        says(n, 'That property does not exist.');
    });
    default: return false;
  }
}
