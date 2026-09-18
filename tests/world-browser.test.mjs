import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRuntime, moo } from '@sindomecorp/moo-in-javascript';
import { createTeachingWorld } from '@sindomecorp/moo-in-javascript/fixtures';
import { inspectObject } from '../dist/world-browser.js';
const runtime = await createRuntime({profile:'toaststunt'});
const makeWorld = () => createTeachingWorld({profile:'toaststunt'});
function run(world, source) {
  const result = runtime.run(source, {world, context:{this:moo.object(42),player:moo.object(7),caller:moo.object(7)}});
  assert.equal(result.status,'completed',JSON.stringify(result.diagnostics)); return result;
}
test('object inspection follows inherited values, overrides, metadata and verb definitions', () => {
  const world = makeWorld();
  run(world, 'p=create(#3); add_property(p,"score",10,{player,"rw"}); c=create(p); add_verb(p,{player,"rx","score"},{"this","none","this"}); set_verb_code(p,"score",{"return this.score;"});');
  let data=inspectObject(world,44n), prop=data.properties.find(p=>p.name==='score');
  assert.equal(prop.state,'Inherited — clear slot'); assert.equal(prop.supplier,43n); assert.equal(prop.origin,43n); assert.equal(prop.effectiveValue.value,10n);
  assert.deepEqual(data.ancestors.map(o=>o.id),[44n,43n,3n,1n]);
  assert.equal(data.verbs[0].object.id,43n); assert.equal(data.verbs[0].verbs[0].source,'return this.score;');
  run(world, '#44.score=20;'); prop=inspectObject(world,44n).properties.find(p=>p.name==='score');
  assert.equal(prop.state,'Inherited — override'); assert.equal(prop.supplier,44n); assert.equal(prop.effectiveValue.value,20n);
  run(world, 'clear_property(#44,"score"); set_property_info(#43,"score",{player,"r","points"});');
  prop=inspectObject(world,44n).properties.find(p=>p.name==='points'); assert.equal(prop.effectiveValue.value,10n); assert.equal(prop.perms,'rw');
  assert.equal(inspectObject(world,43n).properties.find(p=>p.name==='points').perms,'r');
  run(world, 'recycle(#43);'); assert.equal(inspectObject(world,43n),null);
  assert.equal(inspectObject(world,44n).object.parent,3n); assert.equal(inspectObject(world,44n).properties.some(p=>p.name==='points'),false);
});

test('inspection finds the nearest case-insensitive supplier and preserves local verb precedence',()=>{
 const world=makeWorld();
 run(world,'p=create(#3); add_property(p,"Score",10,{player,"rw"}); c=create(p); c.score=20; g=create(c); add_verb(p,{player,"rx","Greet hello"},{"this","none","this"}); set_verb_code(p,"greet",{"return 1;"}); add_verb(c,{player,"rx","greet"},{"this","none","this"}); set_verb_code(c,"greet",{"return 2;"});');
 const data=inspectObject(world,45n),prop=data.properties.find(p=>p.name.toLowerCase()==='score');
 assert.equal(prop.origin,43n);assert.equal(prop.supplier,44n);assert.equal(prop.effectiveValue.value,20n);
 assert.equal(prop.state,'Inherited — clear slot');
 assert.deepEqual(data.verbs.map(group=>group.object.id),[44n,43n]);
 assert.equal(data.verbs[0].verbs[0].source,'return 2;');
 assert.equal(inspectObject(world,43n).properties.find(p=>p.name==='Score').state,'Locally defined');
 run(world,'clear_property(#44,"sCoRe");');
 assert.equal(inspectObject(world,45n).properties.find(p=>p.name==='Score').supplier,43n);
 assert.deepEqual(inspectObject(world,44n).children.map(o=>o.id),[45n]);
});
