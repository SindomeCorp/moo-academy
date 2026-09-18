import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Parser,Language} from 'web-tree-sitter';
import {createRuntime,moo} from '@sindomecorp/moo-in-javascript';
import {createTeachingWorld} from '@sindomecorp/moo-in-javascript/fixtures';
import {assess} from '../dist/assessment.js';
import {scenarios,matchesBehavior} from '../dist/behavior.js';
import {foundationLessonsForProfile} from '../dist/lessons.js';
import {solutions} from './helpers/solutions.mjs';
await Parser.init(); const parser=new Parser();
parser.setLanguage(await Language.load('dist/vendor/tree-sitter-moo.wasm'));
function structure(id,source) {const tree=parser.parse(source);try{return assess(id,tree.rootNode);}finally{tree.delete();}}
for(const profile of ['toaststunt','lambdamoo']) {
  const runtime=await createRuntime({profile});
  for(const lesson of foundationLessonsForProfile(profile).filter(l=>!l.exploration)) {
    test(`${profile} ${lesson.id}: reviewed solution meets structure and every behavioral scenario`,()=>{
      assert.ok(solutions[lesson.id]);
      const source=solutions[lesson.id]; assert.equal(structure(lesson.id,source),true);
      for(const scenario of scenarios(lesson.id)) {
        const world=createTeachingWorld({profile});
        if(scenario.locked!==undefined) world.setProperty(42n,'locked',moo.int(scenario.locked));
        const result=runtime.run(source,{world,context:{this:moo.object(42),player:moo.object(7),caller:moo.object(7),args:(scenario.args??[]).map(moo.string)}});
        assert.equal(matchesBehavior(result,world,scenario),true,JSON.stringify(scenario));
      }
    });
  }
  const cases=[
    ['wrong recipient','objects','notify(#42,"A workshop humming with possibility.");'],
    ['missing output','objects','return 0;'],
    ['extra output','objects',solutions.objects+' player:tell("extra");'],
    ['reordered output','lists','player:tell("torch"); player:tell("probe"); player:tell("wrench");'],
    ['wrong property value','properties','this.lamp_on=0; player:tell("The lamp clicks on.");'],
    ['wrong property type','properties','this.lamp_on=1.0; player:tell("The lamp clicks on.");'],
    ['runtime error after correct output','objects',solutions.objects+' return 1/0;'],
    ['hardcoded first argument','args','if(0) player:tell("Color: ",args[1]); endif player:tell("Color: green");'],
    ['hardcoded locked branch','branching','if(0) '+solutions.branching+' endif player:tell("The door is locked.");'],
  ];
  for(const [name,id,source] of cases) test(`${profile}: rejects ${name}`,()=>{
    const accepted=scenarios(id).every(scenario=>{
      const world=createTeachingWorld({profile});
      if(scenario.locked!==undefined)world.setProperty(42n,'locked',moo.int(scenario.locked));
      const result=runtime.run(source,{world,context:{this:moo.object(42),player:moo.object(7),caller:moo.object(7),args:(scenario.args??[]).map(moo.string)}});
      return matchesBehavior(result,world,scenario);
    });
    assert.equal(accepted,false);
  });
}
test('unknown lesson cannot be graded',()=>{
  assert.throws(()=>scenarios('missing'),/Unknown lesson/);
  assert.equal(structure('missing','return 0;'),false);
});
test('required assignment operator and string receiver cannot be substituted',()=>{
  assert.equal(structure('properties','this.lamp_on += 1; player:tell("The lamp clicks on.");'),false);
  assert.equal(structure('objects','"player":tell("A workshop humming with possibility.");'),false);
  assert.equal(structure('args','player:tell("Color: ",args[2]);'),false);
});
test('parentheses, case and escaped strings preserve supported alternatives',()=>{
  assert.equal(structure('objects','PLAYER:tell(("A workshop humming with possibilit\\y."));'),true);
  assert.equal(structure('properties','(this).lamp_on = (1); PLAYER:tell(("The lamp clicks on."));'),true);
});
