// Control-flow checkpoints skip waits and deliberate failures.
// The final lesson initializes missing quota properties in the persistent world.
const warning = 'TEACHING ALLOWANCE: 3,000 evaluator ticks per execution slice. These are not native server bytecode ticks. Suspension refreshes this allowance; the editor still stops after 15 seconds total. Output and allocation limits do not refill.';
const lesson = (id, title, body, code, expected, experiment, extra = {}) => ({
  id: 'tasks-' + id, group:'TASKS AND TICKS', title, verb:'#42:' + id.replaceAll('-', '_'),
  body: body.split('\n\n').map(p=>`<p>${p}</p>`).join(''), code, expected, expectedOutput:[],
  exploration:true, limits:{steps:3000}, checkpointSource:'return 0;', warning,
  steps:['Read the explanation and predict the starter result.', 'Run the starter and inspect its result and diagnostic.'],
  experiment, hint:'The execution toolbar shows this lesson’s tick allowance. Restore example restores the code; a world reset does not replenish an active task. Each new Run starts a new allowance.',
  ...extra,
});
export function taskLessonsForProfile(profile) {
const toast = profile === 'toaststunt';
const name = toast ? 'ToastStunt' : 'LambdaMOO';
const foreground = toast ? 60000 : 30000;
const background = toast ? 30000 : 15000;
const manual = toast
  ? 'https://github.com/lisdude/toaststunt-documentation/blob/master/manual/toaststunt-programmers-manual.md'
  : 'https://github.com/sevenecks/lambda-moo-programming/blob/master/tutorials/moo-programmers-manual-updated.md';
const link = (anchor, label) => `<a href="${manual}#${anchor}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const quotaCode = `"Create a teaching options object only if this world has none.";
try
  options = $server_options;
except (E_PROPNF)
  options = create($thing);
  options.name = "Server options";
  add_property(#0, "server_options", options, {player, "r"});
endtry

"Snapshot the stored values before changing any quota properties.";
defaults = {{"fg_ticks", ${foreground}}, {"bg_ticks", ${background}}, {"fg_seconds", 5}, {"bg_seconds", 3}};
before = {};
for option in (defaults)
  name = option[1];
  try
    value = options.(name);
  except (E_PROPNF)
    value = E_PROPNF;
  endtry
  before = {@before, {name, value}};
endfor

"Define missing properties, then read their actual stored values.";
after = {};
for option in (defaults)
  name = option[1];
  try
    value = options.(name);
  except (E_PROPNF)
    add_property(options, name, option[2], {options.owner, "r"});
    value = options.(name);
  endtry
  after = {@after, {name, value}};
endfor
return {{"before", before}, {"after", after}};`;
const quotaExpected = `{{"before", {{"fg_ticks", E_PROPNF}, {"bg_ticks", E_PROPNF}, {"fg_seconds", E_PROPNF}, {"bg_seconds", E_PROPNF}}}, {"after", {{"fg_ticks", ${foreground}}, {"bg_ticks", ${background}}, {"fg_seconds", 5}, {"bg_seconds", 3}}}}`;
return [
  lesson('work','Ticks measure work, not seconds',
    'A task is one execution of MOO code, possibly through several verb calls. Ticks measure its computational work, not elapsed time or lines of source. Operators, expressions and loop iterations consume ticks. Compact code can still be expensive.\n\nThis track uses a small <code>3,000</code>-tick teaching allowance per execution slice. A slice runs until the task finishes, yields, or hits a limit. The editor runs verb source on <code>#42</code>; its local variables start fresh each Run. Native servers count work differently, so do not memorize this evaluator’s exact costs.\n\n<code class="builtin-name" title="MOO builtin">ticks_left</code> reports the remaining allowance. Calling it consumes ticks, so the result is already below the starting quota. The starter saves the count in <code>start</code>, loops ten times, then saves another reading in <code>end</code>. It returns <code>{start, end}</code>: the second number is smaller because the loop and surrounding statements consume ticks.',
    'start = ticks_left();\nfor i in [1..10]\nendfor\nend = ticks_left();\nreturn {start, end};', '{2997, 2981}',
    ['Change the loop endpoint from <code>10</code> to <code>20</code>. The starting count stays the same, but the ending count is lower. Return <code>start - end</code> to see how many ticks were consumed between readings.']),
  lesson('exhaust','Run a verb out of ticks',
    'This verb body has a loop that never finishes and never yields. Its tick allowance runs out, and the evaluator stops it with <code>Execution steps limit exceeded</code>. The <code>return</code> is never reached. Run it to see a controlled tick-limit diagnostic rather than waiting for the editor’s total timeout.\n\nThis failure is the intended starter result and counts as exploring the lesson. It has no world writes. <code>except (ANY)</code> cannot catch tick exhaustion, and <code>finally</code> is not guaranteed to finish after exhaustion or Stop. Neither calling another verb nor resetting the world mid-task gives the task more ticks.\n\nThe following lessons first measure remaining ticks, then introduce yielding before the allowance runs out.',
    '"This verb deliberately exhausts its tick allowance.";\nwhile (1)\nendwhile\nreturn "unreachable";', undefined,
    ['Replace the infinite loop with <code>for i in [1..10]</code> and <code>endfor</code>. The verb can now reach its return.', 'Try wrapping the infinite loop in <code>try/except (ANY)</code>. The tick limit still terminates execution.'],
    {starterError:'Execution steps limit exceeded (expected)', expectedFailure:{status:'limit-exceeded',message:'Execution steps limit exceeded'}}),
  lesson('remaining','Measure the cost of a loop',
    'Take two readings with <code class="builtin-name" title="MOO builtin">ticks_left</code> around a small piece of work. The difference includes the bookkeeping around the loop as well as its iterations; it is a useful comparison, not a native-server instruction count.\n\nThe starter sums the integers from <code>1</code> through <code>50</code>. It returns <code>{total, before, after}</code>: the sum, the starting tick count, and the ending tick count as separate list items. The ending count is smaller because the loop and surrounding statements consume ticks. Increase the workload gradually to find when it no longer fits in one slice. Reading the allowance does not replenish it.',
    '"Measure a bounded loop.";\nbefore = ticks_left();\ntotal = 0;\nfor i in [1..50]\n  total = total + i;\nendfor\nafter = ticks_left();\nreturn {total, before, after};', '{1275, 2996, 2687}',
    ['Return <code>{total, before, after, before - after}</code> to add the number of ticks consumed as a fourth list item.', 'Change the endpoint to <code>600</code>. This longer version exceeds the teaching allowance. Keep that workload in mind for the chunking lesson.']),
  lesson('replenish','Yield and replenish ticks',
    '<code class="builtin-name" title="MOO builtin">suspend</code> pauses the current task. <code>suspend(0)</code> yields without a requested delay. Execution later continues after the call, with local variables and the call stack intact and a refreshed tick/time allowance. It does not restart the verb.\n\nThe starter spends some ticks, saves a local value, yields, then returns <code>{before, after, saved}</code>: the tick balances before and after suspension, followed by the preserved local value. On a native server, resumption uses the background quota; here it refreshes this lesson’s configured <code>3,000</code>-tick allowance. Cumulative output and allocation limits remain in force.\n\nYield before exhaustion: a task that has already hit the tick limit cannot execute a rescue <code>suspend()</code>. Returning from an ordinary verb call also does not replenish ticks.',
    '"Continue the same task with a fresh slice.";\nfor i in [1..50]\n  total = i + 1;\nendfor\nbefore = ticks_left();\nsaved = "still here";\nsuspend(0);\nafter = ticks_left();\nreturn {before, after, saved};', '{2693, 2997, "still here"}',
    ['Remove <code>suspend(0);</code>. The <code>after</code> balance is now lower than <code>before</code>, while the saved local remains unchanged.', 'Return <code>{before, after, after - before, saved}</code> to include the increase in available ticks.']),
  lesson('chunks','Finish larger work in bounded chunks',
    'The <code>600</code>-iteration loop does not fit in one teaching slice. Before each small piece of work, check <code>ticks_left()</code> and yield if fewer than <code>200</code> ticks remain. The task can then finish across several slices.\n\nThe threshold is deliberately sized for this tiny loop. It is not a universal safe number: allow headroom for your check, the next chunk and the yield itself. One expensive operation can exhaust the allowance before control reaches the next check. Break large work into bounded pieces.\n\nThe result returns <code>{total, yields, remaining}</code>: the sum, the number of times the task yielded, and its final tick balance. On a real shared server, other tasks can change objects while you are suspended; revalidate shared state before using it again. This playground keeps one isolated working world during a run. It permits at most <code>100</code> suspensions and has a separate <code>15</code>-second total watchdog.',
    '"Finish a workload that needs several tick slices.";\ntotal = 0;\nyields = 0;\nfor i in [1..600]\n  if (ticks_left() < 200)\n    suspend(0);\n    yields = yields + 1;\n  endif\n  total = total + i;\nendfor\nremaining = ticks_left();\nreturn {total, yields, remaining};', '{180300, 2, 1997}',
    ['Remove the <code>if</code> block and run again: the same workload exhausts ticks.', 'Raise the threshold to <code>500</code> and compare the yield count and remaining tick balance; more frequent yielding leaves more headroom.']),
  lesson('time','Waiting, time limits, and Stop',
    'Ticks and time are separate limits. <code class="builtin-name" title="MOO builtin">seconds_left</code> reports the current slice’s execution-time allowance. <code>suspend(1)</code> requests a one-second pause; it does not busy-wait or consume loop ticks during the pause. The starter returns <code>{ticks_left(), seconds_left()}</code> so you can see the remaining ticks and whole seconds after resuming.\n\nOn a real MOO server, <code>suspend(seconds)</code> can request any nonnegative duration valid for that server; there is no general five-second cap. For example, <code>suspend(90)</code> requests a 90-second wait, and normal scheduled resumption occurs after at least that interval. ToastStunt accepts fractional seconds; LambdaMOO accepts integers. With no argument, <code>suspend()</code> waits indefinitely until <code>resume()</code> resumes the task. The server can still impose task-queue and other resource limits. Its execution-time quota limits active execution, not how long a task may remain suspended.\n\nIn this educational playground only, each requested delay is capped at five seconds: <code>suspend(90)</code> is shortened to five seconds. We require an explicit nonnegative delay and do not implement indefinite <code>suspend()</code>, external <code>resume()</code>, or full task queues. These are playground restrictions, not rules to carry over to a real server.\n\nResumption refreshes the slice’s ticks and seconds. This playground also imposes an absolute <code>15</code>-second run limit that keeps counting through waits, plus a maximum of <code>100</code> suspensions per run. Those limits are educational safeguards, not native MOO limits. The editor’s Stop button cancels its worker and discards that run’s uncommitted world changes; this rollback behavior should not be assumed when a task is killed on a real server. See '+link('moo-code-evaluation-and-task-manipulation','the server task-function documentation')+'.',
    '"Observe output on either side of a pause.";\nplayer:tell("Before pause");\nsuspend(1);\nplayer:tell("After pause");\nreturn {ticks_left(), seconds_left()};', '{2951, 30}',
    ['Change the delay to <code>90</code> and observe this playground’s five-second cap. On a real server, the same call requests a 90-second wait.', 'Run again and press Stop while waiting. The second line is not printed.'],
    {expectedOutput:['Before pause','After pause']}),
  lesson('server-quotas','Read and configure server quotas',
    'The '+name+' manual documents default foreground quotas of <code>'+foreground.toLocaleString('en-US')+'</code> ticks and <code>5</code> seconds, and background quotas of <code>'+background.toLocaleString('en-US')+'</code> ticks and <code>3</code> seconds. Command/server tasks are foreground; forked, suspended and reading tasks are background. An actual server can override these defaults.\n\nAdministrators configure integer properties <code>fg_ticks</code>, <code>bg_ticks</code>, <code>fg_seconds</code> and <code>bg_seconds</code> on <code>$server_options</code>. The starter reads each property. Only <code>E_PROPNF</code> (property not found) triggers <code>add_property()</code> with the documented default; other errors remain visible. Existing values, including inherited properties, are left unchanged. The verb first reads all four stored properties into <code>before</code>, then initializes missing properties and reads them into <code>after</code>. It returns <code>{{"before", before}, {"after", after}}</code>, with each snapshot pairing property names with actual stored values. <code>E_PROPNF</code> marks an absent property in the before snapshot; it is not written to the options object. The displayed starter result assumes all four properties are initially absent. On later runs, both snapshots show your existing values.\n\nThis playground may not yet have <code>$server_options</code>. The first block creates an options object and defines <code>#0.server_options</code> only if that reference is missing. On a real server, use its existing options object and appropriate administrative authority; creating properties requires permission. New quota properties use the options object’s owner and <code>"r"</code> permissions, without granting public write access.\n\nDefining these properties is optional on a real server: absent properties already use the server defaults. The example makes those defaults explicit in the database. Existing invalid values are preserved too; the server ignores non-integer quotas or values below <code>100</code> ticks or <code>1</code> second, so a stored value need not be the effective quota.'+(toast ? ' In ToastStunt, call <code>load_server_options()</code> as a wizard after editing server options to refresh the cached settings.' : '')+' Quotas apply when execution starts or resumes, not halfway through an already running slice. See '+link('controlling-the-execution-of-tasks','Controlling the Execution of Tasks')+' for configuration rules and '+link('moo-tasks','MOO Tasks')+' for task categories.\n\nThe starter really saves properties in this track’s world. This lesson still uses its explicit <code>3,000</code>-tick teaching allowance; changing these properties does not reconfigure the playground’s task scheduler or its fixed safety limits.',
    quotaCode, quotaExpected,
    ['Run the starter again: <code>before</code> and <code>after</code> now show the same stored values, without redefining any properties.', {label:'Change an existing property in this track’s world',code:'$server_options.bg_ticks = 45000;\nreturn $server_options.bg_ticks;'}, 'Run the starter again. The <code>bg_ticks</code> entry is <code>45000</code> in both snapshots; the existing value is preserved.', {label:'Remove one property to try the missing-property branch again',code:'delete_property($server_options, "bg_ticks");'}, 'Run the starter again. The <code>bg_ticks</code> entry changes from <code>E_PROPNF</code> in <code>before</code> to the selected profile’s default in <code>after</code>; the other properties keep their values.', ...(toast ? [{label:'Real ToastStunt server only — refresh cached options as a wizard',code:'load_server_options();'}] : [])],
    {checkpointSource:quotaCode, steps:['Run the starter to read existing quotas and initialize missing properties.', 'Inspect the Server options object in World to see the saved values.', 'Try the edits below, then restore and rerun the starter to compare its returned values.']}),
];
}

export const taskLessons = taskLessonsForProfile('toaststunt');
