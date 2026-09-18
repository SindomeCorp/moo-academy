import {test} from 'node:test';
import assert from 'node:assert/strict';
import {moo} from '@sindomecorp/moo-in-javascript';
import {displayValue} from '../dist/display.js';
import {builtinSignature} from '../dist/builtin-reference.js';
for(const [name,value,expected] of [
 ['integer',moo.int(-12),'-12'], ['object',moo.object(-1),'#-1'], ['error',moo.error('E_TYPE'),'E_TYPE'],
 ['negative zero',moo.float(-0),'-0.0'], ['whole float',moo.float(2),'2.0'], ['fraction',moo.float(0.5),'0.5'],
 ['escaping',moo.string('a"\n\\b'),'"a\\"\\n\\\\b"'], ['empty list',moo.list([]),'{}'], ['empty map',moo.map([]),'[]'],
 ['nested values',moo.list([moo.map([[moo.string('x'),moo.list([moo.object(7),moo.error('E_TYPE')])]])]),'{["x" -> {#7, E_TYPE}]}'],
]) test(`display ${name}`,()=>assert.equal(displayValue(value),expected));
test('signature preserves unknown type names alongside optional and variadic arguments',()=>{
 assert.equal(builtinSignature({name:'example',parameters:[{name:'x',types:['int','future'],optional:true}],rest:{name:'rest',types:['any']}}),'example([x: INT | future], ...rest: any)');
});
