import {browse, codeView, worldManagement, expectProperty} from './helpers.js';
import {test,expect,ready,run,openWorld} from './helpers.js';

test('nested map values expand once, finish pagination and preserve object links',async({page})=>{
  await ready(page,'sandbox');
  await run(page,'o=create(#3); add_property(o,"nested",{["link" -> #7, "missing" -> #999]}, {player,"rw"}); return o;');
  await openWorld(page);await page.locator('#worldSearch').fill('#43');await page.locator('[data-object-id="43"]').click();
  await expect(page.locator('[data-property="nested"]')).toContainText('#999 (missing)');
  await page.locator('[data-property="nested"] .world-field').filter({has:page.getByText('Effective value',{exact:true})}).getByRole('button',{name:'#7 — Learner',exact:true}).click();
  await expect(page.locator('#worldDetail h2')).toHaveText('#7 — Learner');
  await page.evaluate(async()=>{
    const {createWorld,moo}=await import('/runtime/dist/browser/index.js');
    const {createWorldBrowser}=await import('/world-browser.js');
    const world=createWorld({profile:'toaststunt'});world.addObject({id:42,owner:42,name:'Map holder'});
    const map=moo.map(Array.from({length:51},(_,i)=>[moo.string('key '+i),moo.list([moo.list([moo.list([moo.object(42)])])])]));
    world.addProperty(42n,'pages',map,42n,'r');
    world.addVerb(42n,{names:'empty',owner:42n,perms:'rx',args:['this','none','this'],source:''});
    createWorldBrowser(document.querySelector('#worldPanel'),{onReset(){},onStop(){}}).update(world,{reset:true});
  });
  const card=page.locator('[data-property="pages"]');
  await expect(card.locator('ol')).toHaveCount(0);await card.locator('summary').click();
  await expect(card.locator(':scope > .world-field > details > ol > li')).toHaveCount(50);
  await card.getByRole('button',{name:'Show more'}).first().click();
  await expect(card.locator(':scope > .world-field > details > ol > li')).toHaveCount(51);
  await expect(card.getByRole('button',{name:'Show more'}).first()).toBeHidden();
  await card.locator('summary').first().click();await card.locator('summary').first().click();
  await expect(card.locator(':scope > .world-field > details > ol > li')).toHaveCount(51);
  await page.locator('[data-verb="empty"] summary').click();
  await expect(page.locator('[data-verb="empty"] pre')).toHaveText('(empty verb)');
});

test('tree collapse retains focus and selecting another object never changes execution context',async({page})=>{
  await ready(page,'sandbox');await openWorld(page);
  const root=page.locator('[data-expand-id="1"]');await root.focus();await root.press('Enter');
  await expect(root).toHaveAttribute('aria-expanded','false');await expect(root).toBeFocused();
  await root.press('Enter');await expect(root).toHaveAttribute('aria-expanded','true');
  await page.locator('#worldSearch').fill('#7');await page.locator('[data-object-id="7"]').click();
  await run(page,'return {this,player,caller,args};','Return: {#42, #7, #7, {}}');
  await expect(page.locator('#worldDetail h2')).toHaveText('#7 — Learner');
});

test('reference renders every metadata field as text and handles empty catalogs',async({page})=>{
  await ready(page);await page.getByRole('tab',{name:'Reference',exact:true}).click();
  await page.evaluate(async()=>{
    const {renderBuiltinReference}=await import('/builtin-reference.js');
    renderBuiltinReference(document.querySelector('#builtinReferenceGrid'),[{name:'<img>',summary:'<script>summary</script>',parameters:[{name:'<b>',types:['custom'],optional:true,description:'<img src=x>'}],rest:{name:'rest',types:['any'],description:'<b>rest</b>'},returns:{types:['never'],description:'<b>return</b>'},notes:['<b>note</b>']}]);
  });
  await page.locator('#builtinReferenceGrid summary').click();
  await expect(page.locator('#builtinReferenceGrid img, #builtinReferenceGrid script, #builtinReferenceGrid b')).toHaveCount(0);
  await expect(page.locator('#builtinReferenceGrid')).toContainText('<img>([<b>: custom], ...rest: any)');
  await expect(page.locator('#builtinReferenceGrid')).toContainText('<b>note</b>');
  await page.evaluate(async()=>{const {renderBuiltinReference}=await import('/builtin-reference.js');renderBuiltinReference(document.querySelector('#builtinReferenceGrid'),[]);});
  await expect(page.locator('#builtinReferenceGrid')).toBeEmpty();
});

test('syntax service parses with shipped WASM and releases its parser explicitly',async({page})=>{
 await ready(page);
 const result=await page.evaluate(async()=>{
   const {createSyntaxService,diagnostics}=await import('/syntax.js');const service=await createSyntaxService();
   const tree=service.parse('return 7;');const issues=diagnostics(tree.rootNode);tree.delete();service.dispose();
   const next=await createSyntaxService();const nextTree=next.parse('return 8;');
   const nextIssues=diagnostics(nextTree.rootNode);nextTree.delete();next.dispose();
   return {issues,nextIssues};
 });
 expect(result).toEqual({issues:[],nextIssues:[]});
});
