import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createWorkspaceController} from '../dist/workspace-controller.js';
function fixture(overrides={}){
 const events=[],world={name:'local'},sessions=new Map();
 const storage={owner:true,available:true,hasChanges:false,flush:async()=>{events.push('save');return true;},prepareToLeave:()=>events.push('leaving'),release:async()=>{events.push('release');return true;},acquire:async()=>true,saveWorld:async value=>{events.push(value);return true;},...overrides};
 return {storage,events,world,sessions,controller:createWorkspaceController({storage,serialize:JSON.stringify,getWorld:()=>world,sessionWorlds:sessions,workspaceId:()=> 'toaststunt:objects'})};
}
test('navigation blocks failed saves and ownership loss; session-only worlds are retained',async()=>{
 const a=fixture({flush:async()=>false});assert.equal(await a.controller.saveBeforeNavigation(),false);
 const b=fixture({owner:false,hasChanges:true});assert.equal(await b.controller.saveBeforeNavigation(),false);
 const c=fixture({available:false});assert.equal(await c.controller.saveBeforeNavigation(),true);assert.equal(c.sessions.get('toaststunt:objects'),JSON.stringify(c.world));
 assert.equal(await fixture().controller.saveBeforeNavigation(),true);
});
test('Code and Eval save only committed world mutations',async()=>{
 const f=fixture();await f.controller.saveCommitted({commit:'discarded',changes:[1]},f.world);await f.controller.saveCommitted({commit:'committed',changes:[]},f.world);assert.deepEqual(f.events,[]);
 await f.controller.saveCommitted({commit:'committed',changes:[1]},f.world);assert.deepEqual(f.events,[JSON.stringify(f.world)]);
});
test('departure waits for a stopped run before releasing; failed restoration never reads over local work',async()=>{
 const f=fixture();let done;const result=new Promise(resolve=>done=resolve);const leaving=f.controller.leave({result});assert.deepEqual(f.events,['leaving']);done();await leaving;assert.deepEqual(f.events,['leaving','release']);
 const session=fixture({available:false});await session.controller.leave();assert.ok(session.sessions.has('toaststunt:objects'));
 const a=fixture({acquire:async()=>false});assert.equal(await a.controller.resume(),false);
 const b=fixture({hasChanges:true,flush:async()=>false});assert.equal(await b.controller.resume(),false);
 const c=fixture({hasChanges:true});assert.equal(await c.controller.resume(),true);assert.deepEqual(c.events,['save']);
 assert.equal(await fixture().controller.resume(),true);
});
