import {commonWorld,executionIdentity} from './common-packages.js';
// A checkpoint is built from trusted course data, never from learner drafts.
export function createCheckpoint(api, fixtures, profile, lesson) {
  const world=fixtures.createTeachingWorld({profile});
  const S=api.moo.string,I=api.moo.int,L=(...values)=>api.moo.list(values);
  if (lesson?.host) {
    const fixturesData=[
      {builtin:'curl',args:[S('example')],result:S('hello')},
      {builtin:'exec',args:[L(S('example'))],result:L(I(0),S('hello'),S(''))},
      {builtin:'getenv',args:[S('EXAMPLE')],result:S('value')},
      {builtin:'spellcheck',args:[S('hello')],result:I(1)},
      {builtin:'open_network_connection',args:[S('example'),I(80)],result:L(S('hello'))},
    ];
    const environment=structuredClone(api.createHostEnvironment({connections:[{player:7,input:lesson.host==='services'?['GET / HTTP/1.1','','']:['hello']}],fixtures:fixturesData}));
    if(lesson.host==='services')environment.listeners=[{object:'7',port:8080,print:false}];
    if(lesson.host==='files'){
      const entry=(path,kind,content='')=>({path,kind,content,mode:kind==='file'?'644':'755',created:1,accessed:2,modified:3});
      environment.time=10;environment.nextHandle=2;
      environment.files=[entry('/','directory'),entry('/lesson','file','ab\ncd\n'),entry('/empty','directory'),entry('/remove','file')];
      environment.handles=[{id:1,path:'/lesson',mode:'r+tn',offset:0,eof:false}];
    }
    if(lesson.host==='sqlite')environment.databases=[{id:1,path:'example',data:'',options:3,lastRowId:'0',open:true,limits:[100000,10000,100]}];
    world.setEnvironment(environment);
  }
  return world;
}
export function prepareCheckpoint(runtime, api, fixtures, lesson) {
  const seed=lesson?.checkpointSeed??lesson;
  const world=lesson?.worldSeed==='common-packages'?commonWorld(runtime):createCheckpoint(api,fixtures,runtime.profile,seed);
  const steps=[...(seed?.setup?[{source:seed.setup,args:[]}]:[]),...(lesson?.checkpointSteps??[])];
  for(const step of steps){
    const result=runtime.run(step.source,{world,context:lessonContext(api,lesson,step.args)});
    if(result.status!=='completed')throw new Error('Lesson checkpoint could not be prepared'+(step.id?' after '+step.id:'')+': '+result.diagnostics.map(d=>d.message).join('; '));
  }
  return world;
}
export function lessonContext(api,lesson,args=lesson?.args??[]) {
  const identity=executionIdentity(lesson);
  return {this:api.moo.object(identity.this),player:api.moo.object(identity.player),caller:api.moo.object(identity.caller),verb:lesson?.verb?.split(':')[1]??'sandbox',args:args.map(value=>typeof value==='string'?api.moo.string(value):value)};
}
