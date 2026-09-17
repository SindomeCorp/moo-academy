import {courseLesson,edit} from './utility-authoring.js';
const L=(...args)=>courseLesson('list',...args);
export const listUtilsLessons=[
L('range','Build numbered and repeated lists',[0,1],'<p><code>range()</code> includes both endpoints; its one-argument form starts at one. <code>make()</code> repeats a value, defaulting to zero. These helpers return new lists.</p>',`player:tell("RANGE from one: ", toliteral($list_utils:range(4)));
player:tell("RANGE selected interval: ", toliteral($list_utils:range(3, 6)));
player:tell("MAKE repeated value: ", toliteral($list_utils:make(3, "brush")));`,edit('make(3,','make(2,','Change <code>make(3, "brush")</code> to <code>make(2, "brush")</code>. The last list has two copies; the numbered lists stay unchanged.')),
L('combine','Combine lists without flattening everything',[10,13,7,9],'<p><code>append()</code> concatenates its list arguments by one level. <code>compress()</code> removes consecutive repetitions; <code>remove_duplicates()</code> removes repetitions throughout the list. <code>setremove_all()</code> removes every occurrence of one value. Ordinary string equality ignores case.</p>',`items = {"brush", "brush", "saw", "brush"};
player:tell("APPEND one level: ", toliteral($list_utils:append(items, {"hammer"})));
player:tell("COMPRESS neighboring copies: ", toliteral($list_utils:compress(items)));
player:tell("REMOVE_DUPLICATES all copies: ", toliteral($list_utils:remove_duplicates(items)));
player:tell("SETREMOVE_ALL brushes: ", toliteral($list_utils:setremove_all(items, "brush")));`,edit('"saw", "brush"','"saw", "saw"','Change the last brush to <code>"saw"</code>. Compression now leaves one brush and one saw; removing brushes leaves two saws.')),
L('flatten','Flatten nested lists and measure their contents',[27,26,28,41],'<p><code>flatten()</code> recursively removes list nesting. <code>count()</code> counts a selected value. <code>longest()</code> and <code>shortest()</code> share a definition but select opposite extremes. <code>max_length()</code> returns a length, not the item; explicitly supply its second argument because this core reads it even though its documentation calls it optional.</p>',`flat = $list_utils:flatten({"brush", {"saw", {"brush"}}});
player:tell("FLATTEN items: ", toliteral(flat));
player:tell("COUNT brushes: ", $list_utils:count("brush", flat));
player:tell("LONGEST item: ", $list_utils:longest(flat));
player:tell("SHORTEST item: ", $list_utils:shortest(flat));
player:tell("MAX_LENGTH minimum zero: ", $list_utils:max_length(flat, 0));`,edit('max_length(flat, 0)','max_length(flat, 10)','Set the minimum length to <code>10</code>. The final output becomes 10 even though no item is that long.')),
L('positions','Reorder items and edit nested positions',[8,11,32,37],'<p><code>reverse()</code>, <code>swap_elements()</code> and <code>setmove()</code> return reordered copies. Positions are one-based. <code>arrayset()</code> follows additional position arguments into nested lists; it does not modify your original variable unless you assign the returned list.</p>',`items = {"brush", "saw", "hammer"};
player:tell("REVERSE: ", toliteral($list_utils:reverse(items)));
player:tell("SWAP first and last: ", toliteral($list_utils:swap_elements(items, 1, 3)));
player:tell("SETMOVE first to last: ", toliteral($list_utils:setmove(items, 1, 3)));
player:tell("ARRAYSET nested count: ", toliteral($list_utils:arrayset({{"brush", 3}}, 7, 1, 2)));
player:tell("Original unchanged: ", toliteral(items));`,edit('7, 1, 2','9, 1, 2','Change the nested replacement from <code>7</code> to <code>9</code>. Only the nested count changes.')),
L('assoc','Look up an association',[17,18,38],'<p><code>assoc()</code> returns a matching record or an empty list. <code>iassoc()</code> returns its position or zero. <code>iassoc_new()</code> is stricter about malformed records and can return an error value. A returned error is data, distinct from an uncaught error.</p>',`records = {{"brush", 3}, {"hammer", 2}};
player:tell("ASSOC matching record: ", toliteral($list_utils:assoc("brush", records)));
player:tell("IASSOC record position: ", $list_utils:iassoc("brush", records));
player:tell("ASSOC absent record: ", toliteral($list_utils:assoc("saw", records)));
player:tell("IASSOC_NEW malformed input: ", toliteral($list_utils:iassoc_new("brush", {{}})));`,edit('assoc("saw",','assoc("hammer",','Search for <code>"hammer"</code> instead of saw in the absent-record call. It now prints <code>{"hammer", 2}</code>.')),
L('search','Search prefixes and sorted boundaries',[6,20,21,22],'<p><code>assoc_prefix()</code> returns the first matching record, while <code>iassoc_prefix()</code> returns its index; neither rejects ambiguous prefixes. <code>find_insert()</code> finds the first strictly greater key. <code>iassoc_sorted()</code> finds the last record whose key is less than or equal to the target, not necessarily an exact match.</p>',`records = {{"brush", 3}, {"brushes", 7}, {"saw", 2}};
player:tell("ASSOC_PREFIX first match: ", toliteral($list_utils:assoc_prefix("bru", records)));
player:tell("IASSOC_PREFIX position: ", $list_utils:iassoc_prefix("bru", records));
player:tell("FIND_INSERT after equals: ", $list_utils:find_insert({1, 3, 3, 7}, 3));
player:tell("IASSOC_SORTED predecessor: ", $list_utils:iassoc_sorted(4, {{1, "a"}, {3, "b"}, {7, "c"}}));`,edit('find_insert({1, 3, 3, 7}, 3)','find_insert({1, 3, 3, 7}, 7)','Change the insertion key to <code>7</code>. The returned position is 5, one beyond the last existing item.')),
L('parallel','Build records from flat and parallel lists',[36,39,42],'<p><code>build_alist()</code> groups a flat list into equal-size records; uneven input returns <code>E_RANGE</code>. <code>passoc()</code> looks up corresponding positions in two parallel lists. <code>make_alist()</code> transposes parallel lists into records. This native behavior currently reaches an argument-handling compatibility gap in the browser; run this exercise on ToastStunt.</p>',`player:tell("BUILD_ALIST pairs: ", toliteral($list_utils:build_alist({"brush", 3, "saw", 2}, 2)));
player:tell("PASSOC parallel lookup: ", toliteral($list_utils:passoc("saw", {"brush", "saw"}, {3, 2})));
player:tell("MAKE_ALIST records: ", toliteral(\`$list_utils:make_alist({{"brush", "saw"}, {3, 2}}) ! ANY'));`,edit('passoc("saw",','passoc("brush",','Change the parallel lookup to <code>"brush"</code>. The record becomes <code>{"brush", 3}</code>; the transposed records remain unchanged.'),{server:{names:['build_alist','passoc','make_alist'],prerequisites:'A disposable ToastStunt server with the pinned ToastCore utilities. The browser currently differs on the optional argument handling inside make_alist().'}}),
L('mapping','Map values through properties, verbs and builtins',[2,3,4,5],'<p><code>map_property()</code> reads one property from each object; <code>map_verb()</code> calls the named verb on each receiver. <code>map_args()</code> varies one argument to a single receiver. Pass its argument-position number explicitly so it is clear which argument changes for each call. <code>map_builtin()</code> applies a named builtin; a missing builtin returns <code>E_INVARG</code>.</p>',`objects = {$string_utils, $list_utils};
player:tell("MAP_PROPERTY names: ", toliteral($list_utils:map_property(objects, "name")));
player:tell("MAP_VERB titles: ", toliteral($list_utils:map_verb(objects, "title")));
player:tell("MAP_ARGS uppercase: ", toliteral($list_utils:map_args(1, $string_utils, "uppercase", {"brush", "saw"})));
player:tell("MAP_BUILTIN lengths: ", toliteral($list_utils:map_builtin({"brush", "saw"}, "length")));`,edit('"uppercase", {','"lowercase", {','Change the mapped verb to <code>"lowercase"</code>. The already lowercase input words stay lowercase.')),
L('sorting','Sort values and project record fields',[14,16,23,24,35],'<p><code>sort()</code> orders a list, optionally by separate keys. <code>slice()</code> projects record fields. <code>sort_alist()</code> orders records by a field and <code>amerge()</code> merges records with matching keys. These paths call <code>set_thread_mode()</code>, unavailable in the browser. <code>sort_alist_suspended()</code> adds cooperative yield points; it is not equivalent to a browser background task.</p>',`records = {{"saw", 2}, {"brush", 3}, {"brush", 4}};
player:tell("SORT values: ", toliteral($list_utils:sort({3, 1, 2})));
player:tell("SLICE counts: ", toliteral($list_utils:slice(records, 2)));
player:tell("SORT_ALIST by name: ", toliteral($list_utils:sort_alist(records)));
player:tell("SORT_ALIST_SUSPENDED: ", toliteral($list_utils:sort_alist_suspended(0, records)));
player:tell("AMERGE equal names: ", toliteral($list_utils:amerge(records)));`,edit('slice(records, 2)','slice(records, 1)','Change the projected field from 2 to 1. The SLICE line lists names rather than counts.'),{server:{names:['sort','slice','sort_alist','amerge','sort_alist_suspended'],prerequisites:'A disposable ToastStunt server with this ToastCore. The native threading builtin is required; no browser substitute is used.'}}),
L('yielding','Compare helpers that can yield',[15,19,29,34,40],'<p>Yielding variants keep similar result contracts but can call the scheduler on larger inputs. Small examples need not yield. <code>sort_suspended()</code> retains an interval argument for compatibility; ToastStunt ignores that interval and uses its sorting facility. Do not infer scheduling from the name or from this short run. The playground models suspension and caps each delay at five seconds.</p>',`records = {{"brush", 3}, {"saw", 2}};
player:tell("SORT_SUSPENDED: ", toliteral($list_utils:sort_suspended(0, {3, 1, 2})));
player:tell("ASSOC_SUSPENDED: ", toliteral($list_utils:assoc_suspended("saw", records)));
player:tell("IASSOC_SUSPENDED: ", $list_utils:iassoc_suspended("saw", records));
player:tell("REVERSE_SUSPENDED: ", toliteral($list_utils:reverse_suspended({1, 2, 3})));
player:tell("FLATTEN_SUSPENDED: ", toliteral($list_utils:flatten_suspended({1, {2, 3}})));`,edit('reverse_suspended({1, 2, 3})','reverse_suspended({1, 2, 3, 4})','Append 4 to the reversed input. The reversed line begins with 4; other operations keep their own results.'),{server:{names:['sort_suspended','assoc_suspended','iassoc_suspended','reverse_suspended','flatten_suspended'],manual:true,expectedEffect:'The sorted list is {1, 2, 3}; the matching record is {"saw", 2} at position 2; the reversed list is {3, 2, 1}; flattening produces {1, 2, 3}. Native sorting can suspend until its thread finishes.',prerequisites:'A running disposable ToastStunt server with the full core and scheduler; emergency mode cannot resume suspended sorting.'}}),
L('random','Choose and shuffle without assuming a fixed result',[25,31,33],'<p><code>random_item()</code> selects one element; <code>random_element()</code> is an alias. <code>randomly_permute()</code> returns a shuffled copy. Its suspended variant can yield during a larger shuffle. A shuffle may leave the order unchanged, and repeated choices may repeat. These are not cryptographic selection tools.</p>',`items = {1, 2, 3};
player:tell("RANDOM_ITEM choice: ", $list_utils:random_item(items));
player:tell("RANDOM_ELEMENT alias: ", $list_utils:random_element(items));
player:tell("RANDOMLY_PERMUTE: ", toliteral($list_utils:randomly_permute(items)));
player:tell("RANDOMLY_PERMUTE_SUSPENDED: ", toliteral($list_utils:randomly_permute_suspended(items)));`,edit('items = {1, 2, 3};','items = {3, 2, 1};','Reverse the initial list. Choices still belong to the same three values, and each shuffle still contains each value once.'),{outputChoices:{'RANDOM_ITEM choice: ':['1','2','3'],'RANDOM_ELEMENT alias: ':['1','2','3'],'RANDOMLY_PERMUTE: ':['{1, 2, 3}','{1, 3, 2}','{2, 1, 3}','{2, 3, 1}','{3, 1, 2}','{3, 2, 1}'],'RANDOMLY_PERMUTE_SUSPENDED: ':['{1, 2, 3}','{1, 3, 2}','{2, 1, 3}','{2, 3, 1}','{3, 1, 2}','{3, 2, 1}']}}),
L('inventory-report','Combine record lookup and a readable report',[], '<p>Keep the records as data, project the names with a loop, and print the summary only after computing it. Reuse the association helper for the selected item. This avoids confusing a human-readable sentence with the records used for computation.</p>',`records = {{"brush", 3}, {"saw", 2}};
names = {};
for record in (records)
  names = {@names, record[1]};
endfor
player:tell("Items: ", $string_utils:english_list(names));
player:tell("Selected record: ", toliteral($list_utils:assoc("brush", records)));
player:tell("Name count: ", length(names));`,edit('{"brush", 3}','{"brush", 9}','Change the brush count to 9. The selected record changes, while the name count and item description do not.')),
];
export const listExclusions={12:'Internal argument-splicing implementation of reverse(); teach reverse() instead.',30:'Internal implementation of reverse_suspended(); teach its public wrapper instead.'};
