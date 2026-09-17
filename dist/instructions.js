// Only explicitly authored code spans are interpreted; all other markup is text.
export function inlineText(value) {
  return value.replace(/<code(?: class="builtin-name")?>([\s\S]*?)<\/code>/g, (_, code) => decodeCode(code));
}
function decodeCode(code) {
  return code.replace(/&(lt|gt|amp|quot);/g, (_, entity) => ({lt:'<', gt:'>', amp:'&', quot:'"'}[entity]));
}
export function renderInline(container, value) {
  const nodes = []; let offset = 0;
  for (const match of value.matchAll(/<code(?: class="builtin-name")?>([\s\S]*?)<\/code>/g)) {
    nodes.push(document.createTextNode(value.slice(offset, match.index)));
    const code = document.createElement('code'); code.textContent = decodeCode(match[1]);
    if (match[0].startsWith('<code class=')) code.className = 'builtin-name';
    nodes.push(code); offset = match.index + match[0].length;
  }
  nodes.push(document.createTextNode(value.slice(offset))); container.replaceChildren(...nodes);
}

// Authored block kinds keep instructions, editable code and results distinct.
export function renderInstructions(container, content, {numbered = false} = {}) {
  const fragment = document.createDocumentFragment();
  const list = numbered ? document.createElement('ol') : fragment;
  if (numbered) fragment.append(list);
  let step;
  for (const block of Array.isArray(content) ? content : [content]) {
    if (block == null) continue;
    if (typeof block === 'string') {
      const paragraph = document.createElement('p'); renderInline(paragraph, block);
      if (numbered) { step = document.createElement('li'); list.append(step); step.append(paragraph); }
      else list.append(paragraph);
    } else {
      const panel = document.createElement('figure'), label = document.createElement('figcaption');
      const pre = document.createElement('pre'), code = document.createElement('code');
      panel.className = block.kind === 'result' ? 'result-card' : 'code-card';
      label.textContent = block.label ?? (block.kind === 'result' ? 'Expected result' : 'Code to edit');
      code.textContent = block.code; pre.append(code); panel.append(label, pre);
      (step ?? list).append(panel);
    }
  }
  container.replaceChildren(fragment);
}
export function renderResult(container, title, value, output = [], error) {
  container.replaceChildren(); container.hidden = value === undefined && !output.length && !error;
  if (container.hidden) return;
  const heading = document.createElement('h3'); heading.textContent = title; container.append(heading);
  for (const [label, text] of [['Output', output.join('\n')], ['Returned value', value], ['Error', error]]) {
    if (text === undefined || text === '') continue;
    const caption = document.createElement('div'), pre = document.createElement('pre');
    caption.textContent = label; pre.textContent = text; container.append(caption, pre);
  }
}
