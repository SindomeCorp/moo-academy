import { builtinSupport } from './builtin-support.js';
const names = { int: 'INT', float: 'FLOAT', string: 'STR', object: 'OBJ', error: 'ERR', list: 'LIST', map: 'MAP', any: 'any', never: 'never' };
const types = values => values.map(value => names[value] ?? value).join(' | ');
export function builtinSignature(info) {
  const parameters = info.parameters.map(parameter => {
    const text = `${parameter.name}: ${types(parameter.types)}`;
    return parameter.optional ? `[${text}]` : text;
  });
  if (info.rest) parameters.push(`...${info.rest.name}: ${types(info.rest.types)}`);
  return `${info.name}(${parameters.join(', ')})`;
}
export function renderBuiltinReference(container, entries) {
  const fragment = document.createDocumentFragment();
  for (const info of entries) {
    const card = document.createElement('details'); card.className = 'ref-card'; card.dataset.builtin = info.name;
    const toggle = document.createElement('summary');
    const title = document.createElement('strong'); title.textContent = builtinSignature(info); toggle.append(title); card.append(toggle);
    const body = document.createElement('div'); body.className = 'builtin-details'; card.append(body);
    const support=builtinSupport(info.name);
    if(support){const warning=document.createElement('p');warning.className='builtin-note';warning.textContent=support.label+': '+support.text;body.append(warning);}
    const summary = document.createElement('p'); summary.textContent = info.summary; body.append(summary);
    for (const parameter of [...info.parameters, ...(info.rest ? [info.rest] : [])]) {
      const detail = document.createElement('p'); detail.textContent = `${parameter.name}: ${parameter.description}`; body.append(detail);
    }
    const returns = document.createElement('p'); returns.textContent = `Returns: ${types(info.returns.types)} — ${info.returns.description}`; body.append(returns);
    for (const note of info.notes) {
      const detail = document.createElement('p'); detail.className = 'builtin-note'; detail.textContent = note; body.append(detail);
    }
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}
