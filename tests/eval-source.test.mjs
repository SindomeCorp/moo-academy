import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {Parser,Language} from 'web-tree-sitter';
import {createRuntime} from '@sindomecorp/moo-in-javascript';
import {prepareEvalSource} from '../dist/eval-source.js';
import {displayValue} from '../dist/display.js';
await Parser.init();
const parser=new Parser();parser.setLanguage(await Language.load('dist/vendor/tree-sitter-moo.wasm'));
const runtime=await createRuntime({profile:'toaststunt'});
after(()=>{parser.delete();runtime.dispose();});
for(const [input,expected] of [
 [';a = 1; b = 2; c = 3;','3'],[';1 + 2','3'],['a=1; a+=2; a;','3'],
 [';"hello; world"','"hello; world"'],[';return {1, 2};','{1, 2}'],
 [';a=0; for i in [1..3] a=a+i; endfor return a;','6'],
 [';if (1) return 7; endif','7'],[';return 4; 2;','4'],
 [';a=1;\na + 2','3'],
])test('Eval: '+input,()=>{
 const source=prepareEvalSource(input,parser),result=runtime.run(source);
 assert.equal(result.status,'completed',JSON.stringify(result.diagnostics));
 assert.equal(displayValue(result.value),expected);
});
test('Eval rejects empty and malformed input',()=>{
 for(const source of ['',';',';a = ;',';"unterminated',';if (1)'])assert.throws(()=>prepareEvalSource(source,parser));
});

test('Eval preserves Unicode source offsets when inserting return',()=>{
 assert.equal(prepareEvalSource(';s="é🙂"; length(s);',parser),' s="é🙂"; return length(s);');
});
