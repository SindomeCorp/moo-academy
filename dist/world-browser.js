import { displayValue } from './display.js';

const compareId = (a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
const fold = text => text.replace(/[A-Z]/g, letter => letter.toLowerCase());
export const objectLabel = object => `#${object.id} — ${object.name || '(unnamed)'}`;

// Read the runtime's effective values instead of reimplementing inheritance.
export function inspectObject(world, id) {
  if (!world.valid(id)) return null;
  const object = world.get(id), ancestors = world.ancestors(id);
  return {
    object, ancestors, children: world.children(id).sort(compareId),
    properties: object.properties.map(property => ({
      ...property, effectiveValue: world.getProperty(id, property.name),
      state: property.origin === id ? 'Locally defined' : property.value === null ? 'Inherited — clear slot' : 'Inherited — override',
      supplier: ancestors.find(ancestor => ancestor.properties.some(candidate =>
        fold(candidate.name) === fold(property.name) && candidate.value !== null))?.id,
    })),
    verbs: ancestors.filter(ancestor => ancestor.verbs.length).map(ancestor => ({object: ancestor, verbs: ancestor.verbs})),
  };
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function button(text, action) {
  const node = element('button', text); node.type = 'button'; node.onclick = action; return node;
}
function textPreview(text) {
  if (text.length <= 2000) return element('pre', text);
  const details = element('details');
  details.append(element('summary', `${text.slice(0, 160)}… (${text.length} characters; expand)`));
  details.addEventListener('toggle', () => {
    if (details.open && details.children.length === 1) details.append(element('pre', text));
  });
  return details;
}

export function createWorldBrowser(container, {onReset, onStop}) {
  let context={this:42,player:7};
  let world, selected = 42n, expanded = new Set(), created = [], running = false, writable = true;
  const status = element('p', 'Loading world…', 'world-status'); status.setAttribute('role', 'status');
  const reset = button('Reset track world', onReset), stop = button('STOP', onStop);
  reset.disabled = true; stop.hidden = true;
  const toolbar = element('div', undefined, 'world-toolbar'); toolbar.append(status, reset, stop);
  const note = element('p', 'Selected object is for inspection. Code executes on #42 as player #7 regardless of selection. Saved worlds return on reload.', 'syntax-note');
  const recent = element('div', undefined, 'world-created');
  const layout = element('div', undefined, 'world-layout');
  const navigation = element('nav'); navigation.setAttribute('aria-label', 'World objects');
  const label = element('label', 'Find an object'); label.htmlFor = 'worldSearch';
  const search = element('input'); search.id = 'worldSearch'; search.type = 'search'; search.placeholder = 'Name or #ID'; search.disabled = true;
  const list = element('div'); list.id = 'worldTree';
  const detail = element('section'); detail.id = 'worldDetail'; detail.setAttribute('aria-label', 'Selected object');
  navigation.append(label, search, list); layout.append(navigation, detail);
  const host=element('details',undefined,'host-state');host.id='hostState';
  host.append(element('summary','Virtual host state — files, connections, databases and logs'));
  const hostBody=element('div');host.append(hostBody);
  container.replaceChildren(toolbar, note, recent, layout, host);
  function renderHost(){
    hostBody.replaceChildren();
    if(!world?.environment){hostBody.append(element('p','No virtual host resources yet. File and connection operations create state here.'));return;}
    const state=world.environment;
    hostBody.append(element('p','Saved with this workspace. These resources do not access your computer or a live server. Database bytes and stored checkpoint contents are omitted; query a database or export the world to inspect them.'));
    const sections=[
      ['Files',state.files],['Open file handles',state.handles],['Connections',state.connections??[]],
      ['Listeners',state.listeners??[]],['Databases',(state.databases??[]).map(({data,...info})=>({...info,storedCharacters:data.length}))],
      ['Server log',state.logs??[]],['Configured service names',(state.fixtures??[]).map(f=>f.builtin)],
    ];
    for(const [title,items] of sections){hostBody.append(element('h3',title+' ('+items.length+')'));hostBody.append(items.length?textPreview(JSON.stringify(items,null,2)):element('p','None.'));}
    if(state.shutdown!==undefined)hostBody.append(element('p','Recorded shutdown reason: '+state.shutdown));
    hostBody.append(element('p',state.checkpoint?'A database checkpoint has been saved.':'No database checkpoint saved.'));
  }
  host.addEventListener('toggle',()=>{if(host.open)renderHost();});

  function reference(id) {
    if (id === -1n) return element('span', '#-1 (none)');
    if (!world.valid(id)) return element('span', `#${id} (missing)`);
    return button(objectLabel(world.get(id)), () => select(id));
  }
  function valueView(value, depth = 0) {
    if (value.type === 'object') return reference(value.value);
    if (value.type !== 'list' && value.type !== 'map') {
      const text = displayValue(value);
      return text.length <= 2000 ? element('code', text) : textPreview(text);
    }
    const isMap = value.type === 'map';
    if (value.value.length <= 8 && depth < 2) {
      const literal = element('span', isMap ? '[' : '{');
      value.value.forEach((item, index) => {
        if (index) literal.append(', ');
        if (isMap) literal.append(valueView(item[0], depth + 1), ' -> ', valueView(item[1], depth + 1));
        else literal.append(valueView(item, depth + 1));
      });
      literal.append(isMap ? ']' : '}'); return literal;
    }
    const details = element('details');
    details.append(element('summary', `${isMap ? '[' : '{'}${value.value.length} ${isMap ? 'entries]' : 'items}'}`));
    // Build nested values only when opened, in bounded batches.
    details.addEventListener('toggle', () => {
      if (!details.open || details.children.length > 1) return;
      const items = element('ol'); let shown = 0;
      const more = button('Show more', appendBatch);
      function appendBatch() {
        const end = Math.min(shown + 50, value.value.length);
        while (shown < end) {
          const row = element('li'), item = value.value[shown++];
          if (isMap) row.append(valueView(item[0]), document.createTextNode(' -> '), valueView(item[1]));
          else row.append(valueView(item));
          items.append(row);
        }
        more.hidden = shown === value.value.length;
      }
      details.append(items, more); appendBatch();
    });
    return details;
  }
  function row(container, name, value) {
    const field = element('div', undefined, 'world-field');
    field.append(element('strong', name), value); container.append(field);
  }
  function select(id) {
    selected = id;
    if (world?.valid(id)) world.ancestors(id).slice(1).forEach(ancestor => expanded.add(ancestor.id));
    // Selecting a search result returns to the tree with its ancestor path open.
    search.value = '';
    render();
    detail.querySelector('h2')?.focus();
  }
  function renderTree() {
    list.replaceChildren();
    const objects = [...world.objects()].sort(compareId), query = search.value.trim().toLowerCase();
    if (!objects.length) { list.append(element('p', 'No objects in this world.')); return; }
    const selectButton = object => {
      const node = button(objectLabel(object), () => select(object.id));
      node.dataset.objectId = String(object.id);
      node.setAttribute('aria-current', String(object.id === selected));
      return node;
    };
    if (query) {
      const matches = objects.filter(object => object.name.toLowerCase().includes(query) || String(object.id) === query.replace(/^#/, ''));
      if (!matches.length) list.append(element('p', 'No matching objects.'));
      for (const object of matches) list.append(selectButton(object));
      return;
    }
    const byParent = new Map();
    for (const object of objects) {
      const siblings = byParent.get(object.parent) ?? []; siblings.push(object); byParent.set(object.parent, siblings);
    }
    function branch(object) {
      const item = element('li'), children = byParent.get(object.id) ?? [];
      const line = element('div', undefined, 'world-tree-row');
      if (children.length) {
        const toggle = button(expanded.has(object.id) ? '−' : '+', () => {
          if (expanded.has(object.id)) expanded.delete(object.id); else expanded.add(object.id);
          renderTree();
          list.querySelector(`[data-expand-id="${object.id}"]`)?.focus();
        });
        toggle.dataset.expandId = String(object.id);
        toggle.setAttribute('aria-label', `Children of #${object.id}`);
        toggle.setAttribute('aria-expanded', String(expanded.has(object.id))); line.append(toggle);
      }
      line.append(selectButton(object)); item.append(line);
      if (children.length && expanded.has(object.id)) {
        const nested = element('ul'); for (const child of children) nested.append(branch(child)); item.append(nested);
      }
      return item;
    }
    const roots = element('ul');
    for (const object of objects.filter(object => object.parent === -1n || !world.valid(object.parent))) roots.append(branch(object));
    list.append(roots);
  }
  function renderDetail() {
    detail.replaceChildren();
    const heading = element('h2'); heading.tabIndex = -1; detail.append(heading);
    const data = inspectObject(world, selected);
    if (!data) { heading.textContent = `#${selected}`; detail.append(element('p', 'Object no longer exists.')); return; }
    const {object, ancestors} = data;
    heading.textContent = objectLabel(object);
    detail.append(element('h3', 'Identity'));
    for (const name of ['name', 'owner', ...Object.keys(object.flags)]) row(detail, name, valueView(world.getProperty(selected, name)));
    detail.append(element('h3', 'Inheritance'));
    row(detail, 'Parent (inheritance)', reference(object.parent));
    const path = element('div');
    [...ancestors].reverse().forEach((ancestor, index) => { if (index) path.append(' → '); path.append(reference(ancestor.id)); });
    row(detail, 'Ancestor path', path);
    const children = element('div');
    data.children.forEach(child => children.append(reference(child.id)));
    if (!data.children.length) children.textContent = 'No direct children.';
    row(detail, 'Direct children', children);
    detail.append(element('h3', 'Containment'));
    for (const name of ['location', 'contents']) row(detail, name, valueView(world.getProperty(selected, name)));
    detail.append(element('p', 'Parentage describes inheritance. Location and contents describe containment; move() changes containment; chparent() changes inheritance.', 'dim'));
    detail.append(element('h3', 'User-defined properties'));
    if (!data.properties.length) detail.append(element('p', 'No user-defined properties.'));
    let propertyContainer=detail;
    if(data.properties.length>12){propertyContainer=element('details');propertyContainer.append(element('summary',`${data.properties.length} properties — expand to inspect`));detail.append(propertyContainer);}
    for (const property of data.properties) {
      const card = element('article', undefined, 'world-card'); card.dataset.property = property.name;
      card.append(element('h4', property.name), element('p', property.state));
      row(card, 'Effective value', valueView(property.effectiveValue));
      row(card, 'Defined on', reference(property.origin));
      if (property.supplier !== undefined) row(card, 'Value supplied by', reference(property.supplier));
      row(card, 'Owner', reference(property.owner)); row(card, 'Permissions', element('code', property.perms));
      propertyContainer.append(card);
    }
    detail.append(element('h3', 'Verbs'), element('p', 'Calls search from the receiver upward. Ancestor definitions are shown for inspection; they may be overridden by nearer definitions.'));
    if (!data.verbs.length) detail.append(element('p', 'No local or inherited verbs.'));
    for (const group of data.verbs) {
      const groupHeading = element('h4', `${group.object.id === selected ? 'Local definitions' : 'Ancestor definitions'} — #${group.object.id}`); detail.append(groupHeading);
      let verbContainer=detail;
      if(group.verbs.length>8){verbContainer=element('details');verbContainer.append(element('summary',`${group.verbs.length} verbs on #${group.object.id} — expand to inspect`));detail.append(verbContainer);}
      for (const verb of group.verbs) {
        const card = element('article', undefined, 'world-card'); card.dataset.verb = verb.names;
        card.append(element('h4', verb.names));
        row(card, 'Defined on', reference(group.object.id)); row(card, 'Owner', reference(verb.owner));
        row(card, 'Permissions', element('code', verb.perms)); row(card, 'Arguments (direct, preposition, indirect)', element('code', displayValue({type:'list', value:verb.args.map(value => ({type:'string',value}))})));
        const source = element('details'); source.append(element('summary', 'Verb source'));
        source.addEventListener('toggle', () => {
          if (source.open && source.children.length === 1) source.append(textPreview(verb.hostId ? 'Host implementation; MOO source unavailable.' : verb.source || '(empty verb)'));
        });
        card.append(source); verbContainer.append(card);
      }
    }
  }
  function render() {
    if (!world) return;
    status.textContent = running ? 'Running — showing the last committed world.' : `${world.objects().length} objects — committed world`;
    recent.replaceChildren(element('strong', 'Created this run: '));
    const surviving = created.filter(id => world.valid(id));
    if (!surviving.length) recent.append('None.'); else surviving.forEach(id => recent.append(reference(id)));
    renderTree(); renderDetail(); if(host.open)renderHost();
  }
  search.addEventListener('input', renderTree);
  return {
    setContext(value) { context=value; note.textContent=`Selected object is for inspection. Code executes on #${context.this} as player #${context.player} regardless of selection. Saved worlds return on reload.`; },
    setResetLabel(label) { reset.textContent = label; },
    select,
    update(nextWorld, options = {}) {
      world = nextWorld; search.disabled = false; reset.disabled = running || !writable;
      if (options.reset) { selected = BigInt(context.this); expanded = new Set([0n, 1n]); created = []; search.value = ''; }
      if (options.created) created = options.created;
      render();
    },
    setBusy(value) {
      running = value; reset.disabled = value || !world || !writable; stop.hidden = !value;
      if (world) status.textContent = value ? 'Running — showing the last committed world.' : `${world.objects().length} objects — committed world`;
    },
    setWritable(value) { writable = value; reset.disabled = running || !world || !value; },
    unavailable() { status.textContent = 'World unavailable. Reload to retry.'; search.disabled = true; reset.disabled = true; },
  };
}
