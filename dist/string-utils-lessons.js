// Authored against the pinned ToastCore definitions. Existing IDs retain saved progress.
export const stringUtilsLessons = [
 {
  id:'trim', title:'Remove padding',
  body:'<p>Start with text cleanup. <code>trim()</code> removes padding from both ends; <code>triml()</code> and <code>trimr()</code> remove it from just the left or right. Spaces inside the text remain. Each call returns a new string; the original variable stays unchanged.</p><p>The optional second argument selects a single padding character; it defaults to a space. This older implementation builds a regular expression from that character, so regex punctuation needs care.</p><p>Each <code>player:tell()</code> prints a labeled line in Output. It does not return that message from your code. These examples finish with the default returned value <code>0</code>; compare the Output lines. Use <code>toliteral()</code> when you need to see list structure or spaces inside a quoted string.</p>',
  code:String.raw`text = "  hello world  ";
player:tell("Original text: ", toliteral(text));
player:tell("TRIM both ends: ", toliteral($string_utils:trim(text)));
player:tell("TRIML left end: ", toliteral($string_utils:triml(text)));
player:tell("TRIMR right end: ", toliteral($string_utils:trimr(text)));
player:tell("TRIM custom padding: ", $string_utils:trim("***hello***", "*"));`,
  expected:"0",
  expectedOutput:["Original text: \"  hello world  \"", "TRIM both ends: \"hello world\"", "TRIML left end: \"hello world  \"", "TRIMR right end: \"  hello world\"", "TRIM custom padding: hello"],
  steps:['Run the starter and compare the original text with the three trimmed copies.','Read the labeled output lines. The quoted text makes leading and trailing spaces visible.'],
  experiment:'Change the first string to <code>"  hello   world  "</code>. All three spaces between the words remain, even after <code>trim()</code>.'
 },
 {
  id:'words', title:'Split and describe a list',
  body:'<p><code>explode()</code> turns separator-delimited text into a list. With the default separator, repeated spaces are skipped. <code>english_list()</code> turns that list into a sentence fragment, including commas and a final conjunction.</p><p>These are utility verb calls on <code>$string_utils</code>. In this core, <code>$string_utils:explode()</code> delegates to the builtin <code>explode()</code>.</p>',
  code:String.raw`text = "hammer  saw brush";
words = $string_utils:explode(text);
player:tell("Original text: ", text);
player:tell("EXPLODE words: ", toliteral(words));
player:tell("ENGLISH_LIST description: ", $string_utils:english_list(words));
player:tell("ENGLISH_LIST empty list: ", $string_utils:english_list({}));`,
  expected:"0",
  expectedOutput:["Original text: hammer  saw brush", "EXPLODE words: {\"hammer\", \"saw\", \"brush\"}", "ENGLISH_LIST description: hammer, saw, and brush", "ENGLISH_LIST empty list: nothing"],
  steps:['Compare the list of separate strings with the human-readable sentence fragment.','Observe the labeled empty-list wording.'],
  experiment:'Replace the input with <code>"hammer"</code>. The list has one item and its English description is simply <code>"hammer"</code>.'
 },
 {
  id:'case', title:'Change letter case',
  body:'<p><code>uppercase()</code> and <code>lowercase()</code> convert the ASCII letters throughout a string. <code>capitalize()</code> changes only its first character; it does not lowercase the rest. <code>capitalise()</code> is an alias.</p><p><code>capitalize_each()</code> works word by word, optionally leaving words from an ignore list alone. Its third argument controls whether the first word is always capitalized. It splits and rejoins words, so it also normalizes spacing.</p>',
  code:String.raw`text = "the tools of MOO";
player:tell("Original text: ", text);
player:tell("UPPERCASE example: ", $string_utils:uppercase(text));
player:tell("LOWERCASE example: ", $string_utils:lowercase(text));
player:tell("CAPITALIZE first character: ", $string_utils:capitalize(text));
player:tell("CAPITALIZE_EACH title: ", $string_utils:capitalize_each(text, {"the", "of"}));`,
  expected:"0",
  expectedOutput:["Original text: the tools of MOO", "UPPERCASE example: THE TOOLS OF MOO", "LOWERCASE example: the tools of moo", "CAPITALIZE first character: The tools of MOO", "CAPITALIZE_EACH title: The Tools of MOO"],
  steps:['Compare conversion of every letter with conversion of only the first letter.','Observe how the ignore list affects the title, including the first word.'],
  experiment:'Add <code>0</code> as the third argument to <code>capitalize_each()</code>. The result becomes <code>"the Tools of MOO"</code>, keeping the first ignored word lowercase.'
 },
 {
  id:'filter', title:'Remove characters or keep a pattern',
  body:'<p>Trimming affects the ends. <code>strip_chars()</code> removes the specified characters anywhere in a string. <code>strip_all_but()</code> instead keeps characters matching a regex character class.</p><p><code>strip_all_but_seq()</code> keeps complete matches of a pattern, in order. Its second argument is a regular expression, not an automatically escaped literal. A pattern must consume characters; avoid patterns that match an empty string.</p>',
  code:String.raw`text = "ab-12 cd-34";
player:tell("Original text: ", text);
player:tell("STRIP_CHARS remove punctuation: ", $string_utils:strip_chars(text, "- "));
player:tell("STRIP_ALL_BUT keep digits: ", $string_utils:strip_all_but(text, "0-9"));
player:tell("STRIP_ALL_BUT_SEQ keep digit pairs: ", $string_utils:strip_all_but_seq(text, "[0-9][0-9]"));`,
  expected:"0",
  expectedOutput:["Original text: ab-12 cd-34", "STRIP_CHARS remove punctuation: ab12cd34", "STRIP_ALL_BUT keep digits: 1234", "STRIP_ALL_BUT_SEQ keep digit pairs: 1234"],
  steps:['Compare removing punctuation with retaining only digits.','Notice that the two keep operations agree here because every digit occurs in a pair.'],
  experiment:'Change <code>"cd-34"</code> to <code>"cd-3"</code>. Character filtering keeps <code>"123"</code>, while the two-digit pattern keeps only <code>"12"</code>.'
 },
 {
  id:'join', title:'Choose separators and empty-list wording',
  body:'<p><code>from_list()</code> joins the string representations of list items using a separator. Its default separator is empty. Use it for a predictable format; use <code>english_list()</code> for prose.</p><p>The second argument to <code>english_list()</code> supplies empty-list wording; the third replaces the conjunction. Supply its surrounding spaces yourself. Joining is not CSV escaping: items containing the separator need a format of their own.</p>',
  code:String.raw`items = {"hammer", "saw", "brush"};
player:tell("Original items: ", toliteral(items));
joined = $string_utils:from_list(items, " / ");
player:tell("FROM_LIST joined text: ", joined);
player:tell("ENGLISH_LIST choices: ", $string_utils:english_list(items, "no tools", " or "));
player:tell("ENGLISH_LIST empty wording: ", $string_utils:english_list({}, "no tools"));`,
  expected:"0",
  expectedOutput:["Original items: {\"hammer\", \"saw\", \"brush\"}", "FROM_LIST joined text: hammer / saw / brush", "ENGLISH_LIST choices: hammer, saw, or brush", "ENGLISH_LIST empty wording: no tools"],
  steps:['Compare the separator used between every pair with the conjunction used only at the end.','Read the explicitly chosen empty-list message.'],
  experiment:'Change the separator to <code>""</code>. The labeled joined text becomes <code>"hammersawbrush"</code>; the English descriptions stay the same.'
 },
 {
  id:'quoted-words', title:'Read quoted words and their source positions',
  body:'<p><code>words()</code> interprets command-style double quotes and backslash escapes. Quoted spaces stay within one argument. <code>explode()</code> just splits at separators; it does not interpret those quotes.</p><p><code>word_start()</code> returns a list of <code>{start, end}</code> ranges in the original text, despite its name. Positions are one-based and include the original quotation marks.</p>',
  code:String.raw`text = "take \"red brush\" now";
player:tell("Original command: ", text);
player:tell("EXPLODE at spaces: ", toliteral($string_utils:explode(text)));
player:tell("WORDS with quoting: ", toliteral($string_utils:words(text)));
player:tell("WORD_START source ranges: ", toliteral($string_utils:word_start(text)));`,
  expected:"0",
  expectedOutput:["Original command: take \"red brush\" now", "EXPLODE at spaces: {\"take\", \"\\\"red\", \"brush\\\"\", \"now\"}", "WORDS with quoting: {\"take\", \"red brush\", \"now\"}", "WORD_START source ranges: {{1, 4}, {6, 16}, {18, 20}}"],
  steps:['Compare how the two splitters handle the space inside the quoted tool name.','Use the second source range to locate the quoted text in the original string.'],
  experiment:'Change <code>red brush</code> to <code>blue brush</code> inside the quotes. It remains one argument, but its end position and the start of <code>now</code> each move one character right.'
 },
 {
  id:'first-word', title:'Separate a command from its remainder',
  body:'<p><code>first_word()</code> returns the first command-style word and the unconsumed remainder. An all-space input returns an empty list, so check before destructuring the result.</p><p>This is useful when a command has a simple leading action but a more structured remainder. Parsing text does not execute a MOO command or find a verb.</p>',
  code:String.raw`text = "  paint \"red brush\" now";
parts = $string_utils:first_word(text);
player:tell("Original command: ", text);
if (parts)
  player:tell("FIRST_WORD action: ", parts[1]);
  player:tell("FIRST_WORD remaining text: ", parts[2]);
  player:tell("WORDS remaining arguments: ", toliteral($string_utils:words(parts[2])));
endif
player:tell("FIRST_WORD blank input: ", toliteral($string_utils:first_word("   ")));`,
  expected:"0",
  expectedOutput:["Original command:   paint \"red brush\" now", "FIRST_WORD action: paint", "FIRST_WORD remaining text: \"red brush\" now", "WORDS remaining arguments: {\"red brush\", \"now\"}", "FIRST_WORD blank input: {}"],
  steps:['Read the separately labeled action and remaining text.','Compare the raw remainder with its parsed arguments.'],
  experiment:'Replace the initial <code>paint</code> with <code>inspect</code>. The action changes, while the remainder and its parsed arguments stay the same.'
 },
 {
  id:'characters', title:'Work with characters and ASCII codes',
  body:'<p><code>char_list()</code> exposes individual characters as a list, and <code>reverse()</code> returns them in reverse order. <code>from_list()</code> can join the character list again.</p><p><code>to_ASCII()</code> and <code>from_ASCII()</code> use the core’s printable ASCII table, covering codes 32–126. They are not general Unicode encoders; pass one printable character to <code>to_ASCII()</code>.</p>',
  code:String.raw`text = "MOO";
letters = $string_utils:char_list(text);
player:tell("Original text: ", text);
player:tell("CHAR_LIST characters: ", toliteral(letters));
player:tell("FROM_LIST joined characters: ", $string_utils:from_list(letters, "-"));
player:tell("REVERSE text: ", $string_utils:reverse(text));
player:tell("TO_ASCII code for A: ", $string_utils:to_ASCII("A"));
player:tell("FROM_ASCII character: ", $string_utils:from_ASCII(65));`,
  expected:"0",
  expectedOutput:["Original text: MOO", "CHAR_LIST characters: {\"M\", \"O\", \"O\"}", "FROM_LIST joined characters: M-O-O", "REVERSE text: OOM", "TO_ASCII code for A: 65", "FROM_ASCII character: A"],
  steps:['Follow the string-to-list-to-string conversion in the character-list and joined-character lines.','Compare the numeric character code with the character reconstructed from it.'],
  experiment:'Change the final code from <code>65</code> to <code>66</code>. The labeled character becomes <code>"B"</code>.'
 },
 {
  id:'find', title:'Find occurrences and shared prefixes',
  body:'<p><code>index_all()</code> returns one-based positions of non-overlapping occurrences. Use a nonempty search string. <code>common()</code> returns the length of a shared prefix, not the prefix text.</p><p>MOO’s ordinary string comparisons ignore letter case. These helpers inherit that behavior; they do not offer a case-sensitive option.</p>',
  code:String.raw`first = "brush";
shared = $string_utils:common(first, "broom");
player:tell("INDEX_ALL an in banana: ", toliteral($string_utils:index_all("banana", "an")));
player:tell("INDEX_ALL non-overlapping aa: ", toliteral($string_utils:index_all("aaaa", "aa")));
player:tell("COMMON prefix length: ", shared);
player:tell("Shared prefix text: ", first[1..shared]);`,
  expected:"0",
  expectedOutput:["INDEX_ALL an in banana: {2, 4}", "INDEX_ALL non-overlapping aa: {1, 3}", "COMMON prefix length: 2", "Shared prefix text: br"],
  steps:['Find each reported occurrence in the original text.','Use the returned prefix length to slice out the shared text.'],
  experiment:'Replace <code>"broom"</code> with <code>"brushes"</code>. The shared length becomes <code>5</code> and the slice becomes <code>"brush"</code>.'
 },
 {
  id:'choices', title:'Distinguish exact, ambiguous and missing choices',
  body:'<p><code>find_prefix()</code> looks for a unique prefix and returns its list index, zero for no match, or <code>$ambiguous_match</code> for multiple matches.</p><p><code>match_stringlist()</code> prefers a unique exact match before considering prefixes. Its failure value is <code>$failed_match</code>, not zero. <code>match_string_list()</code> is an alias. Check which return convention each helper uses.</p>',
  code:String.raw`choices = {"brush", "brushes", "hammer"};
player:tell("Available choices: ", toliteral(choices));
player:tell("FIND_PREFIX brush: ", $string_utils:find_prefix("brush", choices));
player:tell("MATCH_STRINGLIST exact brush: ", $string_utils:match_stringlist("brush", choices));
player:tell("MATCH_STRING_LIST ambiguous bru: ", $string_utils:match_string_list("bru", choices));
player:tell("FIND_PREFIX missing saw: ", $string_utils:find_prefix("saw", choices));
player:tell("MATCH_STRINGLIST missing saw: ", $string_utils:match_stringlist("saw", choices));`,
  expected:"0",
  expectedOutput:["Available choices: {\"brush\", \"brushes\", \"hammer\"}", "FIND_PREFIX brush: #-2", "MATCH_STRINGLIST exact brush: 1", "MATCH_STRING_LIST ambiguous bru: #-2", "FIND_PREFIX missing saw: 0", "MATCH_STRINGLIST missing saw: #-3"],
  steps:['Observe how an exact match resolves the otherwise ambiguous prefix.','Compare the two labeled no-match values.'],
  experiment:'Change the first prefix to <code>"ham"</code>. Its result becomes index <code>3</code>, the position of <code>"hammer"</code>.'
 },
 {
  id:'wildcards', title:'Capture text with wildcard templates',
  body:'<p><code>match_string()</code> matches a simple wildcard template. Each <code>*</code> captures text; successful captures are returned as a list. A failed match returns zero, and an exact match without captures can return one.</p><p>This is not a regular expression engine and does not try every possible ambiguous split. Optional integer arguments control case sensitivity; an optional string changes the wildcard marker.</p>',
  code:String.raw`text = "River gives brush to Sky";
pattern = "* gives * to *";
player:tell("Original text: ", text);
player:tell("Wildcard template: ", pattern);
player:tell("MATCH_STRING captures: ", toliteral($string_utils:match_string(text, pattern)));
player:tell("MATCH_STRING no match: ", $string_utils:match_string("hello", "goodbye"));
player:tell("MATCH_STRING case-sensitive: ", $string_utils:match_string("HELLO", "hello", 1));`,
  expected:"0",
  expectedOutput:["Original text: River gives brush to Sky", "Wildcard template: * gives * to *", "MATCH_STRING captures: {\"River\", \"brush\", \"Sky\"}", "MATCH_STRING no match: 0", "MATCH_STRING case-sensitive: 0"],
  steps:['Identify the three captured pieces and the fixed text separating them.','Compare a template mismatch with a case-sensitive mismatch.'],
  experiment:'Change the last argument from <code>1</code> to <code>0</code>. The last call becomes a successful case-insensitive exact match and returns <code>1</code>.'
 },
 {
  id:'replace', title:'Make several substitutions in one pass',
  body:'<p><code>substitute()</code> accepts a list of <code>{search, replacement}</code> pairs. It finds matches in the original text: newly inserted text is not substituted again. <code>subst()</code> is a shortened spelling accepted by the verb’s alias pattern.</p><p>For overlaps, the leftmost match wins; at the same position, the longer search text wins. An optional third argument makes matching case-sensitive. These utility calls differ from the builtin <code>substitute()</code>, which expands regex captures.</p>',
  code:String.raw`text = "red blue";
replacements = {{"red", "blue"}, {"blue", "green"}};
player:tell("Original text: ", text);
player:tell("SUBSTITUTE parallel replacements: ", $string_utils:substitute(text, replacements));
player:tell("SUBST longest match: ", $string_utils:subst("brushes", {{"brush", "tool"}, {"brushes", "tools"}}));`,
  expected:"0",
  expectedOutput:["Original text: red blue", "SUBSTITUTE parallel replacements: blue green", "SUBST longest match: tools"],
  steps:['Notice that the newly inserted blue is not turned into green.','Observe which overlapping search string wins in the second call.'],
  experiment:'Reverse the order of the two pairs in <code>replacements</code>. It still returns <code>"blue green"</code>, because replacements are applied to the original input.'
 },
 {
  id:'boundaries', title:'Replace whole words and quote regex text',
  body:'<p><code>index_delimited()</code> finds a target only when its neighbors are not alphanumeric, or it touches an end of the string. <code>substitute_delimited()</code> uses the same rule for replacements, avoiding matches inside larger words.</p><p><code>regexp_quote()</code> escapes special characters for MOO’s regular expression syntax. It is useful when a literal user-supplied string becomes part of a regex; it is a different kind of quoting from MOO source-string quoting.</p>',
  code:String.raw`text = "cat scatter cat";
player:tell("Original text: ", text);
player:tell("INDEX_DELIMITED first whole word: ", $string_utils:index_delimited(text, "cat"));
player:tell("SUBSTITUTE_DELIMITED whole words: ", $string_utils:substitute_delimited(text, {{"cat", "dog"}}));
player:tell("REGEXP_QUOTE literal pattern: ", $string_utils:regexp_quote("a.b*"));`,
  expected:"0",
  expectedOutput:["Original text: cat scatter cat", "INDEX_DELIMITED first whole word: 1", "SUBSTITUTE_DELIMITED whole words: dog scatter dog", "REGEXP_QUOTE literal pattern: a%.b%*"],
  steps:['Compare the complete word with the same letters inside scatter.','Read the percent escapes added to the literal regex text.'],
  experiment:'Use <code>substitute()</code> instead of <code>substitute_delimited()</code>. The result becomes <code>"dog sdogter dog"</code>, because the embedded letters now match too.'
 },
 {
  id:'padding', title:'Align text and choose whether to truncate',
  body:'<p><code>left()</code>, <code>right()</code> and <code>center()</code> pad text to a minimum width. Positive widths preserve longer text; negative widths also permit truncation to the absolute width. <code>centre()</code> is an alias.</p><p><code>space()</code> builds a run of padding, optionally using a supplied fill string. In ToastCore, the public padding verbs delegate to <code>$ansi_utils</code> to handle styled text. We start with plain text so spaces and truncation are easy to inspect.</p>',
  code:String.raw`text = "MOO";
player:tell("Original text: ", text);
player:tell("LEFT alignment: ", $string_utils:left(text, 5, "."));
player:tell("RIGHT alignment: ", $string_utils:right(text, 5, "."));
player:tell("CENTER alignment: ", $string_utils:center(text, 7, "."));
player:tell("LEFT truncation: ", $string_utils:left("brush", -3));
player:tell("SPACE custom fill: ", $string_utils:space(4, "-"));`,
  expected:"0",
  expectedOutput:["Original text: MOO", "LEFT alignment: MOO..", "RIGHT alignment: ..MOO", "CENTER alignment: ..MOO..", "LEFT truncation: bru", "SPACE custom fill: ----"],
  steps:['Compare the same text aligned at the left, right and center.','Compare a negative truncating width with the padding-only calls.'],
  experiment:'Change <code>-3</code> to <code>3</code>. The long word stays <code>"brush"</code> because a positive width is a minimum, not a maximum.'
 },
 {
  id:'columns', title:'Arrange a list into display columns',
  body:'<p><code>columnize()</code> turns a list of items into a list of formatted lines. Give the column count and an explicit total width; the default width may depend on player preferences. <code>columnise()</code> is an alias.</p><p>The returned strings contain layout spaces. Keep them intact for a monospace display; trimming or splitting the rows would undo the alignment.</p>',
  code:String.raw`items = {"a", "b", "c", "d", "e", "f"};
rows = $string_utils:columnize(items, 2, 12);
player:tell("Original items: ", toliteral(items));
player:tell("COLUMNIZE rows:");
for row in (rows)
  player:tell(row);
endfor
player:tell("Row count: ", length(rows));`,
  expected:"0",
  expectedOutput:["Original items: {\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"}", "COLUMNIZE rows:", "a     d", "b     e", "c     f", "Row count: 3"],
  steps:['Read the printed rows in order and observe how items are distributed across columns.','Compare the number of input items with the number of formatted rows.'],
  experiment:'Change the column count from <code>2</code> to <code>3</code>. Six items fit into two rows instead of three, with narrower columns.'
 },
 {
  id:'numeric-text', title:'Check numeric text before converting it',
  body:'<p><code>is_integer()</code> and its alias <code>is_numeric()</code> recognize signed integer text, including surrounding spaces. They return zero or one. Decimal fractions do not pass that test.</p><p><code>is_float()</code> is different: it returns the builtin regex match structure, or an empty list. The source’s pattern is not a strict whole-string validator on every branch. Inspect its result before using it for validation; do not equate this older helper with a full numeric parser.</p>',
  code:String.raw`player:tell("IS_INTEGER signed integer: ", $string_utils:is_integer(" +42 "));
player:tell("IS_NUMERIC decimal fraction: ", $string_utils:is_numeric("3.5"));
float_match = $string_utils:is_float("3.5");
player:tell("IS_FLOAT match details: ", toliteral(float_match));
if (float_match)
  player:tell("Matched start position: ", float_match[1]);
  player:tell("Matched end position: ", float_match[2]);
endif
player:tell("IS_FLOAT nonnumeric input: ", toliteral($string_utils:is_float("oops")));`,
  expected:"0",
  expectedOutput:["IS_INTEGER signed integer: 1", "IS_NUMERIC decimal fraction: 0", "IS_FLOAT match details: {1, 3, {{1, 3}, {1, 3}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}}, \"3.5\"}", "Matched start position: 1", "Matched end position: 3", "IS_FLOAT nonnumeric input: {}"],
  steps:['Compare the integer helper’s numeric boolean with the float helper’s match details.','Read the matched start and end positions at the beginning of the float result.'],
  experiment:'Replace <code>"3.5"</code> in the float call with <code>"3.5junk"</code>. This implementation still matches the numeric prefix: evidence that it is not a strict validator.'
 },
 {
  id:'number-words', title:'Format quantities, ranks and durations',
  body:'<p><code>group_number()</code> inserts thousands separators. <code>ordinal()</code> adds a rank suffix such as <code>st</code> or <code>th</code>. <code>english_number()</code> and <code>english_ordinal()</code> spell the corresponding values in words.</p><p><code>from_seconds()</code> gives a rough duration in a single unit; it is not an exact elapsed-time formatter. These older English-formatting helpers have finite ranges and conventions, so use modest values here.</p>',
  code:String.raw`player:tell("GROUP_NUMBER thousands: ", $string_utils:group_number(12345));
player:tell("ORDINAL rank: ", $string_utils:ordinal(21));
player:tell("ENGLISH_NUMBER quantity: ", $string_utils:english_number(21));
player:tell("ENGLISH_ORDINAL rank: ", $string_utils:english_ordinal(21));
player:tell("FROM_SECONDS duration: ", $string_utils:from_seconds(7200));`,
  expected:"0",
  expectedOutput:["GROUP_NUMBER thousands: 12,345", "ORDINAL rank: 21st", "ENGLISH_NUMBER quantity: twenty-one", "ENGLISH_ORDINAL rank: twenty-first", "FROM_SECONDS duration: 2 hours"],
  steps:['Compare a quantity with a rank expressed both numerically and in words.','Observe the approximate duration wording.'],
  experiment:'Change the three instances of <code>21</code> to <code>12</code>. The results become <code>"12th"</code>, <code>"twelve"</code> and <code>"twelfth"</code>.'
 },
 {
  id:'render-values', title:'Choose a full value or a short display',
  body:'<p><code>from_value()</code> formats a value with optional string quoting and list depth. Its default depth abbreviates nested lists. <code>abbreviated_value()</code> offers more display limits; its second argument is a target length, not a guaranteed exact bound.</p><p>In this ToastCore, <code>print()</code> calls <code>toliteral()</code>, so it returns a complete literal string, including maps. Despite its name, it does not send output to the player. For reliable literal serialization, prefer that full representation over a shortened display.</p>',
  code:String.raw`value = {"brush", {1, 2, 3}};
player:tell("FROM_VALUE default depth: ", $string_utils:from_value(value));
player:tell("PRINT full literal: ", $string_utils:print(value));
player:tell("ABBREVIATED_VALUE short display: ", $string_utils:abbreviated_value(value, 14));
player:tell("PRINT map literal: ", $string_utils:print(["count" -> 3]));`,
  expected:"0",
  expectedOutput:["FROM_VALUE default depth: {brush, {...}}", "PRINT full literal: {\"brush\", {1, 2, 3}}", "ABBREVIATED_VALUE short display: {\"brush\", ...}", "PRINT map literal: [\"count\" -> 3]"],
  steps:['Compare abbreviated nested data with the full literal string.','Compare the full literal with the short display. The formatting verbs return strings; <code>player:tell()</code> prints those strings as readable text.'],
  experiment:'Change the first call to <code>from_value(value, 1, -1)</code>. For this list it now quotes strings and expands every nesting level, matching <code>print(value)</code>.'
 },
 {
  id:'parse-values', title:'Parse literal text and check the result tag',
  body:'<p><code>to_value()</code> attempts to read a MOO literal and returns <code>{1, value}</code> on success or <code>{0, message}</code> on failure. Check the first item before using the second as data.</p><p>This is a library parser with its own supported syntax, not an evaluator for arbitrary MOO code. <code>print()</code> and <code>to_value()</code> can round-trip supported literals, including the list in this example.</p>',
  code:String.raw`original = {"brush", 3};
text = $string_utils:print(original);
player:tell("PRINT literal text: ", text);
parsed = $string_utils:to_value(text);
player:tell("TO_VALUE tagged result: ", toliteral(parsed));
if (parsed[1])
  player:tell("Parsed value: ", toliteral(parsed[2]));
endif
player:tell("TO_VALUE second attempt: ", toliteral($string_utils:to_value("1, 2")));`,
  expected:"0",
  expectedOutput:["PRINT literal text: {\"brush\", 3}", "TO_VALUE tagged result: {1, {\"brush\", 3}}", "Parsed value: {\"brush\", 3}", "TO_VALUE second attempt: {0, \"comma unexpected.\"}"],
  steps:['Follow the value to its textual literal and then back into the tagged result.','Read the failed parse as a returned error message, not as a raised MOO error.'],
  experiment:'Replace <code>"1, 2"</code> with <code>"{1, 2}"</code>. The second attempt becomes <code>{1, {1, 2}}</code>, a successful list parse.'
 },
 {
  id:'parse-prefix', title:'Read one value and keep the remaining text',
  body:'<p><code>prefix_to_value()</code> reads a literal from the start of text and returns <code>{remainder, value}</code>. Unlike <code>to_value()</code>, its first item is a string on success—even an empty string. Separator spaces can remain at the start of the remainder. An integer zero marks failure.</p><p>Use <code>typeof(parsed[1]) == STR</code> to distinguish success from failure. Testing truthiness alone would reject a successful parse that consumed all the text.</p>',
  code:String.raw`parsed = $string_utils:prefix_to_value("42 brushes");
player:tell("PREFIX_TO_VALUE with remainder: ", toliteral(parsed));
if (typeof(parsed[1]) == STR)
  player:tell("Remaining text: ", toliteral(parsed[1]));
  player:tell("Parsed value: ", parsed[2]);
endif
player:tell("PREFIX_TO_VALUE fully consumed: ", toliteral($string_utils:prefix_to_value("42")));
player:tell("PREFIX_TO_VALUE empty input: ", toliteral($string_utils:prefix_to_value("")));`,
  expected:"0",
  expectedOutput:["PREFIX_TO_VALUE with remainder: {\" brushes\", 42}", "Remaining text: \" brushes\"", "Parsed value: 42", "PREFIX_TO_VALUE fully consumed: {\"\", 42}", "PREFIX_TO_VALUE empty input: {0, \"empty string\"}"],
  steps:['Compare a parse that leaves text with a parse that consumes it all.','Distinguish the empty string in a successful result from integer zero in a failed result.'],
  experiment:'Change <code>"42 brushes"</code> to <code>"7 hammers"</code>. Its result becomes <code>{" hammers", 7}</code>.'
 },
 {
  id:'pronouns', title:'Expand message templates and preserve literal percent signs',
  body:'<p><code>pronoun_sub()</code> expands message tokens such as <code>%n</code> for the subject’s name. Passing the subject explicitly makes the example’s context clear. <code>pronoun_quote()</code> doubles percent signs so text can pass through substitution literally.</p><p>These are object-aware message templates, not general string replacement. More advanced tokens read object properties or call verbs. The browser models task permissions; do not treat it as a test of a production server’s security boundary.</p>',
  code:String.raw`literal = "%n keeps 100% of the tools";
player:tell("Original literal text: ", literal);
player:tell("PRONOUN_SUB expanded name: ", $string_utils:pronoun_sub("%n keeps the tools.", $string_utils));
quoted = $string_utils:pronoun_quote(literal);
player:tell("PRONOUN_QUOTE protected text: ", quoted);
player:tell("PRONOUN_SUB protected result: ", $string_utils:pronoun_sub(quoted, $string_utils));`,
  expected:"0",
  expectedOutput:["Original literal text: %n keeps 100% of the tools", "PRONOUN_SUB expanded name: String Utilities keeps the tools.", "PRONOUN_QUOTE protected text: %%n keeps 100%% of the tools", "PRONOUN_SUB protected result: %n keeps 100% of the tools"],
  steps:['Compare the expanded name with the unchanged literal template.','Observe the doubled percent signs in the intermediate quoted string.'],
  experiment:'Remove <code>pronoun_quote()</code> by assigning <code>quoted = literal;</code>. The final <code>%n</code> now expands to the supplied object’s name.'
 },
 {
  id:'object-labels', title:'Label objects and resolve explicit references',
  body:'<p><code>name_and_number()</code>, also called <code>nn()</code>, produces a readable object label. <code>nn_list()</code> applies that convention to an object list and joins the labels as English prose.</p><p><code>literal_object()</code> resolves explicit forms such as a corified reference or an object number. It also has player and mailing-list lookup branches; here we use explicit references so the result does not depend on who is connected.</p>',
  code:String.raw`player:tell("NN object label: ", $string_utils:nn($string_utils));
player:tell("NN_LIST object labels: ", $string_utils:nn_list({$string_utils, $list_utils}));
player:tell("LITERAL_OBJECT corified lookup: ", $string_utils:literal_object("$string_utils"));
player:tell("LITERAL_OBJECT numbered lookup: ", $string_utils:literal_object("#20"));`,
  expected:"0",
  expectedOutput:["NN object label: String Utilities (#20)", "NN_LIST object labels: String Utilities (#20) and List Utilities (#55)", "LITERAL_OBJECT corified lookup: #20", "LITERAL_OBJECT numbered lookup: #20"],
  steps:['Compare the labels with the underlying object references.','Observe that the corified and numbered references identify the same imported object.'],
  experiment:'Change <code>"$string_utils"</code> in the lookup to <code>"$list_utils"</code>. That lookup returns <code>#55</code>, while the explicit <code>"#20"</code> still resolves to String Utils.'
 },
 {
  id:'yielding', title:'Recognize helpers that can yield',
  body:'<p><code>from_value_suspended()</code> formats values like <code>from_value()</code> but can yield when its tick threshold is reached. <code>columnize_suspended()</code> takes a suspend interval before the usual item list, column count and width.</p><p>Small inputs may never suspend. In this core, <code>print_suspended()</code> is merely an alias of <code>print()</code>, whose source calls <code>toliteral()</code> without suspending. A name alone does not establish scheduling behavior.</p><p>The educational runtime caps each requested suspend at five seconds. A real server uses its own scheduling and quota settings; see the Tasks, ticks and suspension track for the fuller model.</p>',
  code:String.raw`value = {"brush", {1, 2}};
player:tell("FROM_VALUE_SUSPENDED full value: ", $string_utils:from_value_suspended(value, 1, -1));
player:tell("PRINT_SUSPENDED full value: ", $string_utils:print_suspended(value));
rows = $string_utils:columnize_suspended(0, {"a", "b", "c", "d"}, 2, 12);
player:tell("COLUMNIZE_SUSPENDED rows:");
for row in (rows)
  player:tell(row);
endfor`,
  expected:"0",
  expectedOutput:["FROM_VALUE_SUSPENDED full value: {\"brush\", {1, 2}}", "PRINT_SUSPENDED full value: {\"brush\", {1, 2}}", "COLUMNIZE_SUSPENDED rows:", "a     c", "b     d"],
  steps:['Compare the two full value strings; inspect their source to distinguish their yielding behavior.','Read the formatted rows; this small input is not intended to force tick exhaustion.'],
  experiment:'Change the depth argument in <code>from_value_suspended()</code> from <code>-1</code> to <code>1</code>. Its nested list becomes <code>{...}</code>, while <code>print_suspended()</code> still includes the complete value.'
 },
 {
  id:'tool-report', title:'Build a readable tool report',
  body:'<p>Combine cleanup, splitting, case conversion and formatting into one small pipeline. Print each intermediate value with a label so you can see what each stage contributes.</p><p><code>a_or_an()</code> chooses an English article using core conventions and may consult a player override. It is a language helper, not a guarantee of perfect grammar for every noun.</p>',
  code:String.raw`raw = "  HAMMER,SAW,BRUSH  ";
player:tell("Original input: ", toliteral(raw));
clean = $string_utils:lowercase($string_utils:trim(raw));
player:tell("Cleaned text: ", clean);
items = $string_utils:explode(clean, ",");
player:tell("Parsed items: ", toliteral(items));
report = $string_utils:capitalize($string_utils:english_list(items)) + ".";
player:tell("Finished report: ", report);
sample = $string_utils:a_or_an("axe") + " axe";
player:tell("A_OR_AN article example: ", sample);`,
  expected:"0",
  expectedOutput:["Original input: \"  HAMMER,SAW,BRUSH  \"", "Cleaned text: hammer,saw,brush", "Parsed items: {\"hammer\", \"saw\", \"brush\"}", "Finished report: Hammer, saw, and brush.", "A_OR_AN article example: an axe"],
  steps:['Follow the raw text through the cleaned string, parsed list and finished report.','Predict the report before editing the input; keep printing the intermediate values while experimenting.'],
  experiment:'Replace the raw input with <code>"  AXE  "</code>. The list has one item and the report becomes <code>"Axe."</code>, with no comma or conjunction.'
 },
];
