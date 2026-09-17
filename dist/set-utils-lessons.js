import {courseLesson,edit} from './utility-authoring.js';
const L=(...args)=>courseLesson('set',...args);
export const setUtilsLessons=[
L('combine','Combine sets and find shared members',[0,1],'<p>These utilities represent sets as lists and use MOO equality. <code>union()</code> adds missing members; it does not first remove duplicates already in the first input. <code>intersection()</code> finds shared membership but its output order can follow a shorter input. Start with duplicate-free inputs.</p>',`a = {"brush", "saw"};
b = {"saw", "hammer"};
player:tell("UNION: ", toliteral($set_utils:union(a, b)));
player:tell("INTERSECTION: ", toliteral($set_utils:intersection(a, b)));`,edit('"saw", "hammer"','"brush", "hammer"','Replace saw with brush in the second set. The shared member becomes brush.')),
L('membership','Check containment of whole sets',[3],'<p><code>contains()</code> asks whether its first list contains every member of each following list. It is a superset test, not a count and not a positional lookup. Every set contains the empty set.</p>',`tools = {"brush", "saw"};
player:tell("CONTAINS a subset: ", $set_utils:contains(tools, {"brush"}));
player:tell("CONTAINS missing member: ", $set_utils:contains(tools, {"hammer"}));
player:tell("CONTAINS empty set: ", $set_utils:contains(tools, {}));`,edit('{"hammer"}','{"saw"}','Replace the missing hammer with saw. The second containment test becomes 1.')),
L('difference','Subtract sets and compare exclusive membership',[2,4],'<p><code>difference()</code> removes members found in later lists; <code>diff()</code> is a shorter accepted spelling. <code>exclusive_or()</code> and <code>xor()</code> select members found in exactly one input set. For more than two inputs, that is not parity: a member in three inputs is still excluded.</p>',`a = {1, 2};
b = {2, 3};
player:tell("DIFFERENCE a minus b: ", toliteral($set_utils:difference(a, b)));
player:tell("DIFF b minus a: ", toliteral($set_utils:diff(b, a)));
player:tell("EXCLUSIVE_OR: ", toliteral($set_utils:exclusive_or(a, b)));
player:tell("XOR three inputs: ", toliteral($set_utils:xor(a, b, {2, 4})));`,edit('{2, 4}','{1, 4}','Change the third set to <code>{1, 4}</code>. Member 1 is now present more than once and is excluded from the three-input result.')),
L('equal','Compare membership and preserve original spelling',[6,7],'<p><code>equal()</code> ignores order and duplicate count. Ordinary list equality still compares positions. String membership ignores case; <code>intersection_preserve_case()</code> preserves the spelling of members from the first input even when the ordinary intersection selects a differently cased shorter input.</p>',`player:tell("EQUAL membership: ", $set_utils:equal({1, 2, 2}, {2, 1}));
player:tell("List equality: ", {1, 2} == {2, 1});
player:tell("Preserved spelling: ", toliteral($set_utils:intersection_preserve_case({"BRUSH", "SAW"}, {"brush"})));`,edit('{2, 1}));','{3, 1}));','Replace 2 with 3 in the membership comparison. EQUAL becomes 0.')),
L('yielding','Use the yielding difference variant',[5],'<p><code>difference_suspended()</code> and <code>diff_suspended()</code> share one implementation. They can yield as work consumes ticks. The result is still a list difference; small examples may finish without suspending. Native scheduler behavior is not established by this short browser run.</p>',`a = {1, 2, 3, 4};
player:tell("DIFFERENCE_SUSPENDED: ", toliteral($set_utils:difference_suspended(a, {2, 4})));
player:tell("DIFF_SUSPENDED alias: ", toliteral($set_utils:diff_suspended(a, {2, 4})));`,edit('{2, 4}','{1, 3}','Change both removal sets to <code>{1, 3}</code>. Both results become <code>{2, 4}</code>.')),
L('supply-report','Report missing and shared supplies',[], '<p>Combine set operations into a practical comparison. Keep the requested and available sets separate so reversing the subtraction has an obvious meaning.</p>',`wanted = {"brush", "saw", "hammer"};
available = {"brush", "saw"};
missing = $set_utils:difference(wanted, available);
shared = $set_utils:intersection_preserve_case(wanted, available);
player:tell("Available: ", $string_utils:english_list(shared));
player:tell("Missing: ", $string_utils:english_list(missing));
player:tell("Complete supply set: ", $set_utils:contains(available, wanted));`,edit('available = {"brush", "saw"};','available = {"brush", "saw", "hammer"};','Add hammer to available supplies. Missing becomes nothing and the completeness test becomes 1.')),
];
export const setExclusions={};
