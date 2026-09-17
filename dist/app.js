import {runtimeBase} from './runtime-version.js';
import {ensureCommonPackages,executionIdentity,loadOptions} from './common-packages.js';
import {renderUtilityReference} from './utility-reference.js';
import { prepareEvalSource } from './eval-source.js';
import { matchesCourseCheck, matchesExpectedFailure } from './course-checks.js';
import { coursesForProfile, pathDefinitions } from './curriculum.js';
import { prepareCheckpoint, lessonContext } from './checkpoints.js';
import { renderInstructions, renderResult, renderInline, inlineText } from './instructions.js';
import {createWorkspaceController} from './workspace-controller.js';
import { createWorkspaceStorage, maxDraftLength } from './workspace-storage.js';
import { createWorldBrowser } from './world-browser.js';
import { builtinLessons } from './builtin-lessons.js';
import { lessons as foundationLessons, foundationLessonsForProfile } from './lessons.js';
import { createSyntaxService, diagnostics } from './syntax.js';
import { assess } from './assessment.js';
import { scenarios, matchesBehavior } from './behavior.js';
import { displayValue } from './display.js';
import { renderBuiltinReference } from './builtin-reference.js';

const refs=[['this','The receiver of this verb call, even when its verb definition is inherited from an ancestor.'],['player','The player associated with the task. Not always the caller.'],['caller','The object whose verb called this verb.'],['args','Explicit calls: passed values. Command dispatch: command words. Lists start at index 1.'],['return value;','Stop the verb and return a value to its caller.'],['fork (seconds) — unsupported here','MOO scheduling syntax; unavailable in this educational runtime.'],['object:verb()','Call a verb on an object.'],['object.property','Read or assign a property value.'],['$name','A conventional property on #0 containing an important object.'],['E_*','MOO runtime error values such as E_PERM and E_PROPNF.']];

const $ = selector => document.querySelector(selector);
const editor = $('#codeEditor');
const evalEditor = $('#evalEditor');
const startingStateBox = $('#startingRequirements');
const startingStatePreference = 'moo-starting-state-expanded';
try { startingStateBox.open = localStorage.getItem(startingStatePreference) !== 'false'; } catch {}
startingStateBox.addEventListener('toggle', () => {
  try { localStorage.setItem(startingStatePreference, String(startingStateBox.open)); } catch {}
});

let startingUp = true;
async function startupStage(message) {
  if (!startingUp) return;
  $('#startupMessage').textContent = message;
  // Let the notice paint before synchronous world validation. The fallback also
  // lets initialization finish in background tabs, where animation frames pause.
  await new Promise(resolve => {
    let frame;
    const done = () => { clearTimeout(fallback); cancelAnimationFrame(frame); resolve(); };
    const fallback = setTimeout(done, 100);
    frame = requestAnimationFrame(() => setTimeout(done, 0));
  });
}
function finishStartup(failed = false) {
  if (!startingUp) return;
  startingUp = false;
  $('.shell').setAttribute('aria-busy', 'false');
  $('#startupNotice').hidden = !failed;
  if (failed) {
    $('#startupTitle').textContent = 'Workspace could not start';
    $('#startupMessage').textContent = 'The parser or runtime could not load. Reload the page to retry. Your saved work has been kept.';
  }
}

let evalWorkspace;
const evalInputs = new Map(), savedEvalInputs = new Map();
const progressKey = 'moo-progress-v3-executed';
const modeKey = 'moo-workspace-mode';
let mode = 'training';
try { if (localStorage.getItem(modeKey) === 'sandbox') mode = 'sandbox'; } catch {}
const sandbox = {id:'sandbox', verb:'#42:sandbox', exploration:true,
  code:'"Experiment with the world. Changes persist between runs.";\nreturn children(#1);'};
const activeExample = () => mode === 'sandbox' ? {...sandbox,worldSeed:sandboxSeed()?.worldSeed,verb:`#${executionIdentity(sandboxSeed()).this}:sandbox`} : lessons[current];
const profileKey = 'moo-profile';
let profile = 'toaststunt';
try { if (localStorage.getItem(profileKey) === 'lambdamoo') profile = 'lambdamoo'; } catch {}
const profileName = () => profile === 'toaststunt' ? 'ToastStunt' : 'LambdaMOO';
let tracks;
function filterTracks() { tracks = coursesForProfile(profile); $('#trackSelect').replaceChildren(...pathDefinitions.filter(p=>tracks[p.id]).map(path=>Object.assign(document.createElement('option'),{value:path.id,textContent:path.title}))); }
$('#trackSelect').replaceChildren(...pathDefinitions.map(path => { const option=document.createElement('option'); option.value=path.id; option.textContent=path.title; return option; }));
filterTracks();
const trackKey = 'moo-selected-track';
const lessonKey = 'moo-selected-lesson';
let selectedTrack = 'foundations';
try {
  const storedTrack = localStorage.getItem(trackKey+':'+profile)??localStorage.getItem(trackKey);
  if (Object.hasOwn(tracks, storedTrack)) selectedTrack = storedTrack;
} catch { /* Use Foundations when browser storage is unavailable. */ }
let lessons = tracks[selectedTrack];
let selectedSandbox='basic';
function sandboxChoices(){return [{id:'basic',title:'Basic playground'},...pathDefinitions.filter(p=>tracks[p.id]&&!p.id.startsWith('utility-')).map(p=>({id:p.id,title:p.title.replace(/^\d+ · /,'')})),...(profile==='toaststunt'?[{id:'common-packages',title:'Common Packages'}]:[])];}
function restoreSandboxChoice(){try{selectedSandbox=localStorage.getItem('moo-sandbox-world:'+profile)??'basic';}catch{}if(!sandboxChoices().some(w=>w.id===selectedSandbox))selectedSandbox='basic';}
restoreSandboxChoice();
function sandboxSeed(){return selectedSandbox==='common-packages'?{worldSeed:'common-packages'}:selectedSandbox==='basic'?undefined:tracks[selectedSandbox]?.[0];}
const workspaceLesson=()=>mode==='sandbox'?sandboxSeed():lessons[current];

function syncTrackSelect() {
  $('#trackSelect').value = selectedTrack;
  $('#workspaceMode').value = mode;
  $('#sandboxWorldControl').hidden=mode!=='sandbox';
  $('#sandboxWorld').replaceChildren(...sandboxChoices().map(w=>Object.assign(document.createElement('option'),{value:w.id,textContent:w.title})));
  $('#sandboxWorld').value=selectedSandbox;
  $('#runtimeProfileSelect').value = profile;
  $('#trackSelect option[value="builtins"]').textContent = `Builtins · ${tracks.builtins.length} runnable examples`;
  $('#runtimeProfile').textContent = profileName();
}
// Browsers can restore form controls independently of application state.
window.addEventListener('pageshow', syncTrackSelect);
const validIds = new Set(['toaststunt','lambdamoo'].flatMap(p=>Object.values(coursesForProfile(p)).flat().map(l=>l.id)));
let completed;
try {
  const stored = JSON.parse(localStorage.getItem(progressKey) || '[]');
  completed = new Set(Array.isArray(stored) ? stored.filter(id => validIds.has(id)) : []);
} catch { completed = new Set(); }
// Earlier syntax-only completions do not prove executed lesson behavior.
let current = 0;
try {
  const savedIndex = lessons.findIndex(lesson => lesson.id === (localStorage.getItem(`moo-lesson:${profile}:${selectedTrack}`) ?? localStorage.getItem(lessonKey)));
  if (savedIndex >= 0) current = savedIndex;
} catch { /* Start with the first lesson when storage is unavailable. */ }
let syntax;
let parserState = 'loading';
let timer;
let runtime, api, fixtures, activeRun, busy = false, stopped = false;
let learnerWorker;
function releaseLearnerWorker(){learnerWorker?.dispose();learnerWorker=undefined;}
function learnerSession(){
  if(!learnerWorker || learnerWorker.world!==teachingWorld){
    releaseLearnerWorker();
    learnerWorker=api.createWorkerSession({runtime,world:teachingWorld,reuseWorker:true,...loadOptions(workspaceLesson())});
  }
  return learnerWorker;
}
let teachingWorld, recovery = false, originalSaved, suspended = false;
let storageKind = 'loading';
let storageMessage = 'Loading saved workspace…', loadingWorkspace = true, observedOwner;
function showPersistenceStatus() {
  // Routine autosaves stay in the existing status line, without moving the page.
  const hideNotice = !recovery && !['read-only','session-only','error'].includes(storageKind);
  if ($('#saveNotice').hidden !== hideNotice) $('#saveNotice').hidden = hideNotice;
  $('#saveNoticeText').textContent = recovery ? 'Saved workspace needs recovery.' : storageMessage;
  document.querySelectorAll('.persistence-status').forEach(node => {
    node.textContent = loadingWorkspace ? 'Loading saved workspace…' : recovery ? 'Saved workspace needs recovery. Open World to retry, download the original save, import, or reset.' : storageMessage;
  });
}
const storage = createWorkspaceStorage((message, state) => {
  storageKind = state.kind;
  storageMessage = message; showPersistenceStatus();
  const ownershipChanged = observedOwner !== storage.owner; observedOwner = storage.owner;
  if (ownershipChanged && runtime && parserState === 'ready' && !loadingWorkspace) {
    if (!storage.owner && activeRun) stopRun();
    setBusy(busy);
  }
});
storage.setProfile(profile);
const scope = () => mode === 'sandbox' ? (selectedSandbox==='basic'?'sandbox':'sandbox-'+selectedSandbox) : selectedTrack;
const workspaceId = () => profile + ':' + scope();
storage.setScope(scope());
const sessionWorlds = new Map();
const workspace = createWorkspaceController({storage, serialize: world => runtime.saveWorld(world), getWorld: () => teachingWorld, sessionWorlds, workspaceId});
const worldBrowser = createWorldBrowser($('#worldPanel'), { onReset: resetWorld, onStop: stopRun });
const persistenceControls = document.createElement('section');
persistenceControls.className = 'persistence-controls';
persistenceControls.innerHTML = '<p class="persistence-status" role="status">Loading saved workspace…</p><p id="workspaceProblem" class="workspace-problem" role="alert" hidden></p><div class="persistence-actions"><button id="exportWorld">EXPORT WORLD</button><button id="exportDrafts">DOWNLOAD DRAFTS</button><button id="importWorld">IMPORT WORLD</button><button id="retrySave">RETRY</button><button id="downloadOriginal" hidden>DOWNLOAD ORIGINAL SAVE</button><button id="takeWorkspace" hidden>TRY EDITING HERE</button></div><p>Export world saves objects and properties. Download drafts saves code from this tab, including unrun Eval text; open the JSON file to copy code back into an editor.</p><input id="worldFile" type="file" accept="application/json,.json" hidden />';
$('#worldPanel').prepend(persistenceControls);
const output = (text, kind) => {
  $('#output').replaceChildren();
  if (!kind) { $('#output').textContent = text; return; }
  const section = document.createElement('section'), heading = document.createElement('h3'), body = document.createElement('div');
  section.className = 'feedback-section error'; heading.textContent = kind; body.textContent = text;
  section.append(heading, body); $('#output').append(section);
};
function saveProgress() {
  try { localStorage.setItem(progressKey, JSON.stringify([...completed])); }
  catch { showToast('Progress is available for this session only'); }
}
function nextTrack() {
  const available=pathDefinitions.filter(p=>tracks[p.id]); return available[available.findIndex(path => path.id === selectedTrack) + 1];
}
function updateNextButton(working = false) {
  const last = current === lessons.length - 1, next = nextTrack();
  $('#nextButton').textContent = last && next ? 'Continue to ' + next.title.replace(/^\d+ · /, '') : 'NEXT LESSON →';
  $('#nextButton').disabled = working || (last && !next);
}
function render() {
  clearTimeout(timer);
  syncTrackSelect();
  const lesson = lessons[current];
  const example = activeExample();
  const identity=executionIdentity(workspaceLesson());
  worldBrowser.setContext(identity);
  document.body.classList.toggle('sandbox', mode === 'sandbox');
  $('.rail').hidden = mode === 'sandbox';
  $('#browseLessons').hidden = mode === 'sandbox';
  selectedTab = mode === 'sandbox' ? 'editor' : 'lesson';
  $('#trainingNote').hidden = mode === 'sandbox';
  $('#sandboxNote').hidden = mode !== 'sandbox';
  $('#resetWorld').textContent = mode === 'sandbox' ? 'Reset sandbox world' : 'Reset track world';
  layoutPanels();
  try { localStorage.setItem(lessonKey, lesson.id); localStorage.setItem(`moo-lesson:${profile}:${selectedTrack}`,lesson.id); }
  catch { /* Lesson navigation still works without storage. */ }
  $('#lessonNumber').textContent = String(current + 1).padStart(2, '0');
  $('#lessonEyebrow').textContent = lesson.group;
  $('#lessonTitle').textContent = lesson.title;
  $('#lessonBody').innerHTML = lesson.body;
  const path=pathDefinitions.find(p=>p.id===selectedTrack);
  $('#pathSummary').textContent=path.level+' · '+path.description+' Prerequisites: '+path.prerequisites;
  $('#lessonWarning').textContent=lesson.warning??''; $('#lessonWarning').hidden=!lesson.warning;
  $('#checkpointControls').open = false;
  renderInline($('#startingState'), lesson.startingState ? 'Required starting state: ' + lesson.startingState : '');
  (lesson.startingState ? $('#startingRequirements') : $('#checkpointControls')).append($('#resetLessonWorld'));
  $('#resetLessonWorld').hidden = mode === 'sandbox';
  $('#startingState').hidden = !lesson.startingState;
  $('#startingRequirements').hidden = !lesson.startingState;
  $('#checkpointControls').hidden=mode==='sandbox'||Boolean(lesson.startingState);
  $('#conceptMap').textContent = lesson.diagram ? 'Concept diagram\n' + lesson.diagram : '';
  $('#conceptMap').hidden = !lesson.diagram;
  renderInstructions($('#challengeText'), lesson.steps ?? lesson.challenge, {numbered:true});
  renderResult($('#starterResult'), lesson.executionMode === 'source-walkthrough' ? 'Source walkthrough result' : lesson.outputChoices ? 'Example output (varies)' : 'Starter result', lesson.expected, lesson.expectedOutput, lesson.starterError);
  renderInstructions($('#experiment'), lesson.experiment ?? []);
  $('#experiment').hidden = !lesson.experiment;
  if (lesson.experiment) $('#experiment').prepend(Object.assign(document.createElement('h3'), {textContent:'Suggested experiment'}));
  const serverSection=$('#serverExercise');
  serverSection.replaceChildren();serverSection.hidden=!lesson.serverExercise;
  if(lesson.serverExercise){
    const exercise=lesson.serverExercise;
    const heading=document.createElement('h3');heading.textContent='Run on a real ToastStunt server';serverSection.append(heading);
    const instructions=document.createElement('div');serverSection.append(instructions);
    renderInstructions(instructions,[exercise.prerequisites,{kind:'code',label:'Server exercise code',code:exercise.code}]);
    const result=document.createElement('section');result.className='result-card';serverSection.append(result);
    if(exercise.expectedEffect){const title=document.createElement('h3');title.textContent='Expected server effect';result.append(title);const text=document.createElement('div');result.append(text);renderInstructions(text,[exercise.expectedEffect]);}
    else renderResult(result,exercise.outputChoices?'Example server output (varies)':'Expected server result',exercise.expected,exercise.expectedOutput);
    if(exercise.manual)result.append(Object.assign(document.createElement('p'),{textContent:'Requires a running server and the stated fixtures; this is not a browser execution result.'}));
    const experiment=document.createElement('div');serverSection.append(experiment);
    renderInstructions(experiment,['Server experiment: '+exercise.experiment.effect]);
  }

  $('#runtimeProfile').textContent = profileName();
  const suppliedArgs = (example.checks ?? ((example.exploration || example.builtin) ? [] : scenarios(example.id)))?.[0]?.args ?? [];
  $('#executionContext').textContent = `this #${identity.this} · player #${identity.player} · args {` + suppliedArgs.map(value => JSON.stringify(value)).join(', ') + '}' + (example.limits?.steps ? ' · ' + example.limits.steps.toLocaleString() + ' ticks per slice' : '');
  worldBrowser.setResetLabel(mode === 'sandbox' ? 'Reset sandbox world' : 'Reset track world');
  $('#taskLabel').textContent = lesson.project ? 'PROJECT OBJECTIVE' : (lesson.builtin || lesson.exploration) ? 'RUN AND EXPERIMENT' : 'YOUR OBJECTIVE';
  $('#restoreExample').hidden = false;
  renderInstructions($('#hintBox'), lesson.hint);
  $('#hintBox').hidden = true;
  $('#hintButton').textContent = 'SHOW HINT';
  $('#verbName').textContent = example.verb;
  $('#restoreExample').textContent = mode === 'sandbox' ? 'RESTORE STARTER' : 'RESTORE EXAMPLE';
  editor.value = storage.draft(example.id) ?? example.code;
  if (!evalInputs.has(workspaceId())) savedEvalInputs.set(workspaceId(), storage.draft('eval-console:' + scope()) ?? '');
  evalEditor.value = evalInputs.get(workspaceId()) ?? storage.draft('eval-console:' + scope()) ?? '';
  $('#evalContext').textContent = profileName() + ' · ' + scope() + ` · this #${identity.this} · player #${identity.player} · args {}`;
  if (evalWorkspace !== workspaceId()) $('#evalOutput').replaceChildren();
  evalWorkspace = workspaceId();
  $('#prevButton').disabled = current === 0;
  updateNextButton();
  renderNav();
  lines();
  output('');
  validate();
}
function renderNav() {
  const nav=$('#lessonNav'), previousScroll=nav.scrollTop;
  const previousLesson=nav.querySelector('[aria-current="step"]')?.dataset.lessonId;
  const query=$('#lessonSearch').value.trim().toLowerCase();
  let previousGroup;
  $('#lessonNav').replaceChildren();
  lessons.forEach((lesson, index) => {
    if(query&&!`${lesson.title} ${lesson.group} ${lesson.builtin??''}`.toLowerCase().includes(query))return;
    if(lesson.group!==previousGroup){const heading=document.createElement('h2');heading.className='nav-group';heading.textContent=lesson.group;$('#lessonNav').append(heading);previousGroup=lesson.group;}
    const button = document.createElement('button');
    button.dataset.lessonId = lesson.id;
    if(index===current)button.setAttribute('aria-current','step');
    button.className = `nav-item ${index === current ? 'active' : ''} ${completed.has(lesson.id) ? 'complete' : ''}`;
    button.textContent = `${completed.has(lesson.id) ? '✓' : String(index + 1).padStart(2, '0')}  ${lesson.title}`;
    button.disabled = busy || parserState !== 'ready';
    button.onclick = () => navigate(() => { current = index; });
    $('#lessonNav').append(button);
  });
  nav.scrollTop=previousScroll;
  if(previousLesson!==lessons[current].id)revealCurrentLesson();
  if(!$('#lessonNav').children.length){const empty=document.createElement('p');empty.textContent='No lessons match. Clear the search to see this track.';$('#lessonNav').append(empty);}
  $('#currentLesson').textContent = mode === 'sandbox' ? 'Sandbox' : $('#trackSelect').selectedOptions[0].textContent + ' · ' + lessons[current].title;
  $('#progressText').textContent = `${lessons.filter(lesson => completed.has(lesson.id)).length} / ${lessons.length} ${selectedTrack === 'builtins' ? 'EXPLORED' : 'LESSONS'}`;
}
function revealCurrentLesson() {
  const nav=$('#lessonNav'), active=nav.querySelector('[aria-current="step"]');
  if(!active)return;
  const item=active.getBoundingClientRect(),box=nav.getBoundingClientRect();
  if(item.top<box.top)nav.scrollTop+=item.top-box.top;
  else if(item.bottom>box.bottom)nav.scrollTop+=item.bottom-box.bottom;
}
window.addEventListener('resize',revealCurrentLesson);
function lines() {
  $('#lineNumbers').textContent = editor.value.split('\n').map((_, index) => index + 1).join('\n');
}
function parserFailure() {
  finishStartup(true);
  releaseLearnerWorker();
  parserState = 'failed';
  worldBrowser.unavailable();
  $('#runButton').disabled = true;
  $('#evalRun').disabled = true; evalEditor.disabled = true;
  $('#syntaxStatus').textContent = 'Parser or runtime unavailable. Reload to retry.';
  $('#builtinReferenceStatus').textContent = 'Builtin reference unavailable. Reload to retry.';
  output('Cannot execute or complete exercises because initialization failed. Serve this directory over HTTP and reload to retry.', 'Errors');
}
function validate(checkObjective = false) {
  if (parserState !== 'ready') {
    if (parserState === 'failed') parserFailure();
    return;
  }
  if (editor.value.length > maxDraftLength) { output("Source exceeds the exercise limit of 100,000 characters.", 'Errors'); return false; }
  let tree;
  try {
    tree = syntax.parse(editor.value);
    if (!tree) throw new Error('Parser returned no tree');
    const issues = diagnostics(tree.rootNode);
    $('#syntaxStatus').textContent = issues.length ? `${issues.length} syntax diagnostic(s)` : 'No syntax errors found by Tree-sitter.';
    if (issues.length) {
      output(issues.map(d => `Line ${d.line}, column ${d.column}: ${d.message}${d.context ? '\n  ' + d.context : ''}`).join('\n\n'), 'Errors');
      return;
    }
    return true;
  } catch (error) {
    console.error('Syntax validation failed', error);
    parserFailure();
  } finally { tree?.delete(); }
}
function showToast(text) {
  $('#toast').textContent = text;
  $('#toast').hidden = false;
  setTimeout(() => { $('#toast').hidden = true; }, 2200);
}
function changed() {
  if (storage.owner && !suspended) storage.setDraft(activeExample().id, editor.value);
  lines();
  clearTimeout(timer);
  if (parserState !== 'ready') return;
  $('#syntaxStatus').textContent = 'Checking syntax…';
  output('Code changed. Run code to check its behavior.');
  timer = setTimeout(() => validate(), 200);
}
function canEdit() { return parserState === 'ready' && storage.owner && !recovery && !suspended; }
function setBusy(value) {
  busy = value;
  const editable = canEdit(), replaceable = storage.owner && runtime && !suspended;
  editor.disabled = value || !editable;
  evalEditor.disabled = value || !editable;
  $('#evalRun').disabled = value || !editable;
  $('#evalClear').disabled = value;
  worldBrowser.setBusy(value);
  worldBrowser.setWritable(Boolean(replaceable));
  $('#trackSelect').disabled = value || parserState !== 'ready' || suspended;
  $('#sandboxWorld').disabled=value||parserState!=='ready'||suspended;
  $('#workspaceMode').disabled = value || parserState !== 'ready' || suspended;
  $('#runtimeProfileSelect').disabled = value || !replaceable || parserState !== 'ready';
  $('#restoreExample').disabled = value || !editable;
  $('#resetLessonWorld').disabled = value || !replaceable;
  $('#runButton').disabled = value || !editable;
  const reason = value ? 'Working…' : parserState !== 'ready' ? 'Waiting for the parser and runtime.' : recovery ? 'Recover the saved world in the World tab before running code.' : !storage.owner ? 'Waiting for workspace access. Editing resumes when the other tab closes.' : suspended ? 'Restoring workspace access…' : '';
  $('#executionAccess').textContent = reason;
  $('#executionAccess').hidden = !reason;
  $('#evalAccess').textContent = reason; $('#evalAccess').hidden = !reason;
  $('#evalStop').disabled = !activeRun; $('#evalStop').hidden = !activeRun;
  $('#runButton').title = reason || 'Run the code';
  editor.title = reason || 'MOO code editor';
  $('#stopButton').disabled = !activeRun;
  $('#stopButton').hidden = !activeRun;
  $('#resetWorld').disabled = value || !replaceable;
  $('#importWorld').disabled = value || !replaceable;
  $('#exportWorld').disabled = value || !teachingWorld;
  $('#retrySave').disabled = value || !runtime;
  $('#takeWorkspace').hidden = storage.owner;
  $('#takeWorkspace').disabled = value || !runtime;
  $('#prevButton').disabled = value || current === 0;
  updateNextButton(value);
  renderNav();
}
async function navigate(change, {resumeLesson = true} = {}) {
  if (busy || parserState !== 'ready' || suspended) return;
  const previousScope=scope();
  const pagePosition={x:window.scrollX,y:window.scrollY};
  let navigated=false;
  setBusy(true);
  try {
    if (!await workspace.saveBeforeNavigation()) {problem('Save pending changes before navigating. Retry, export your world, or download drafts.');return;}
    change();
    closeDrawer();
    if(previousScope!==scope()){
      storage.setScope(scope()); teachingWorld=undefined;
      if (resumeLesson) {try {const id=localStorage.getItem(`moo-lesson:${profile}:${selectedTrack}`);current=Math.max(0,lessons.findIndex(l=>l.id===id));}catch{}}
      await restoreWorkspace();
    } else render();
    $('.lab-pane').scrollTop=0;
    $('#lessonPanel').scrollTop=0;
    editor.scrollTop=0;editor.scrollLeft=0;$('#lineNumbers').scrollTop=0;
    navigated=true;
  } finally {
    setBusy(false);
    if(navigated) {
      if(sandboxWide.matches)window.scrollTo(pagePosition.x,pagePosition.y);
      else window.scrollTo(0,0);
    }
  }
}
async function check() {
  if (busy || !canEdit()) return;
  clearTimeout(timer);
  if (!validate()) return;
  const lesson = activeExample(), source = editor.value;
  let tree, structure;
  try { tree = syntax.parse(source); structure = (lesson.builtin || lesson.exploration) ? true : assess(lesson.id, tree.rootNode); }
  catch (error) { output("Exercise structure could not be assessed: " + error.message, 'Errors'); return; }
  finally { tree?.delete(); }
  stopped = false; setBusy(true); output('');
  const sections = {};
  const append = (text, kind = 'Exercise result') => {
    if (!sections[kind]) {
      const section = document.createElement('section'), heading = document.createElement('h3'), body = document.createElement('div');
      heading.textContent = kind; section.className = 'feedback-section'; section.append(heading, body);
      const priorities = lesson.expectedOutput?.length && (kind === 'Output' || sections.Output)
        ? ['Output', 'Exercise result', 'Returned value']
        : ['Returned value', 'Exercise result'];
      const rank = priorities.indexOf(kind);
      const priority = rank < 0 ? priorities.length : rank;
      section.dataset.priority = priority;
      const following = [...$('#output').children].find(item => Number(item.dataset.priority) > priority);
      $('#output').insertBefore(section, following ?? null); sections[kind] = body;
      if (kind === 'Errors') section.classList.add('error');
    }
    sections[kind].append(document.createTextNode(text + '\n'));
  };
  let passed = true, learnerFinished = false, expectedFailureObserved = false;
  try {
    await storage.flush();
    if (suspended || !storage.owner) return;
    // Execute once in the learner's world, then grade Foundations on isolated fixtures.
    const gradingCases = lesson.checks ?? ((lesson.builtin || lesson.exploration) ? [] : scenarios(lesson.id));
    const cases = [{ args: gradingCases[0]?.args }, ...gradingCases];
    for (let index = 0; index < cases.length; index++) {
      if (stopped) { passed = false; break; }
      const scenario = cases[index];
      const world = index === 0 ? teachingWorld : lesson.checks ? prepareCheckpoint(runtime,api,fixtures,lesson) : fixtures.createTeachingWorld({ profile: runtime.profile });
      if (index > 0 && scenario.locked !== undefined) world.setProperty(BigInt(executionIdentity(lesson).this), 'locked', api.moo.int(scenario.locked));
      const beforeIds = index === 0 ? new Set(world.objects().map(object => object.id)) : null;
      const session = index===0 ? learnerSession() : api.createWorkerSession({ runtime, world, ...loadOptions(workspaceLesson()) });
      activeRun = session.run(source, {
        context: lessonContext(api,lesson,scenario.args??[]),
        limits: { steps: lesson.limits?.steps ?? 1_000_000, outputCharacters: 20_000, outputEvents: 1000 }, timeoutMs: 15000,
        onOutput: event => { if (index === 0) append(event.text, 'Output'); },
      });
      setBusy(true);
      const result = await activeRun.result; activeRun = undefined;
      if (index === 0) {
        learnerFinished = true;
        await workspace.saveCommitted(result, world);
        append(result.commit === 'committed' ? 'World changes from this run were kept.' : 'This run’s world changes were discarded.', 'World changes');
        worldBrowser.update(world, {created: world.objects().filter(object => !beforeIds.has(object.id)).map(object => object.id)});
      }
      if (result.status !== 'completed') {
        append(`${index === 0 ? 'Execution' : 'Objective check (separate world)'}: ${result.status} (${result.commit}).`, 'Errors');
        for (const diagnostic of result.diagnostics) append(`${diagnostic.code ?? diagnostic.category}: ${diagnostic.message}${diagnostic.span ? ' — line ' + (diagnostic.span.start.row + 1) + ', column ' + (diagnostic.span.start.column + 1) : ''}`, 'Errors');
        if (index === 0 && mode === 'training' && matchesExpectedFailure(result, lesson.expectedFailure)) {
          expectedFailureObserved = true;
          break;
        }
        if (index === 0 && mode === 'training' && lesson.startingState) {
          append('Required starting state: ' + inlineText(lesson.startingState), 'Errors');
          const load = document.createElement('button'); load.textContent = 'Load lesson starting world';
          load.onclick = () => $('#resetLessonWorld').click(); sections['Errors'].append(load);
        }
        passed = false; break;
      }
      if (index === 0) {
        append('Return: ' + displayValue(result.value), 'Returned value');
        if (gradingCases.length) append('Checking the objective in separate teaching worlds; your world keeps the result above.');
      }
      if (index > 0) {
        if(lesson.checks){
          if(!matchesCourseCheck(result,world,scenario,BigInt(executionIdentity(lesson).this))){passed=false;break;}
          if(scenario.probe){
            activeRun=api.createWorkerSession({runtime,world,...loadOptions(workspaceLesson())}).run(scenario.probe,{context:lessonContext(api,lesson),timeoutMs:5000});
            setBusy(true);
            const probe=await activeRun.result;activeRun=undefined;
            if(probe.status!=='completed'||displayValue(probe.value)!==scenario.probeExpected)passed=false;
          }
          if(!passed)break;
        } else if(!matchesBehavior(result,world,scenario)){passed=false;break;}
      }
    }
    if (passed && structure && !stopped) {
      if (mode === 'sandbox') { append('Execution completed.'); return; }
      append('', 'Exercise result'); sections['Exercise result'].classList.add('success');
      completed.add(lesson.id); saveProgress(); renderNav();
      append(lesson.executionMode==='source-walkthrough' ? 'Source walkthrough explored. The server exercise has not been executed here.' : expectedFailureObserved ? 'Expected tick exhaustion observed. This diagnostic is the intended lesson result; continue to learn how to avoid it.' : (!lesson.checks && (lesson.builtin || lesson.exploration)) ? 'Example explored: execution completed. Try the suggested edit and compare results.' : 'Objective passed: behavior verified in a separate prepared world.'); showToast((!lesson.checks && (lesson.builtin || lesson.exploration)) ? 'EXAMPLE EXPLORED' : 'EXERCISE PASSED');
    } else if (!stopped) append((!lesson.checks && (lesson.builtin || lesson.exploration)) ? 'Execution did not complete. Review the diagnostics or restore the example.' : 'Objective not yet met. Review the output, resulting state and required exercise structure.');
  } catch (error) {
    if (!learnerFinished) worldBrowser.update(teachingWorld, {created: []});
    append('Host error: ' + error.message + '. No incomplete worker state was committed.', 'Errors');
  } finally { activeRun = undefined; setBusy(false); }
}
async function evaluateCode() {
  if (busy || !canEdit()) return;
  storage.setDraft('eval-console:' + scope(), evalEditor.value);
  savedEvalInputs.set(workspaceId(), evalEditor.value);
  const target = $('#evalOutput');
  target.replaceChildren();
  const sections = new Map();
  function append(text, kind) {
    if (!sections.has(kind)) {
      const section = document.createElement('section'), heading = document.createElement('h3'), body = document.createElement('div');
      section.className = 'feedback-section' + (kind === 'Errors' ? ' error' : '');
      heading.textContent = kind; section.append(heading, body); target.append(section); sections.set(kind, body);
    }
    sections.get(kind).append(document.createTextNode(text + '\n'));
  }
  let source;
  try { source = prepareEvalSource(evalEditor.value, syntax); }
  catch (error) { append(error.message, 'Errors'); return; }
  stopped = false; setBusy(true);
  try {
    await storage.flush();
    if (suspended || !storage.owner) return;
    const world = teachingWorld, beforeIds = new Set(world.objects().map(object => object.id));
    activeRun = learnerSession().run(source, {
      context: {...lessonContext(api,workspaceLesson(),[]),verb:'eval'},
      limits: {steps:1_000_000, outputCharacters:20_000, outputEvents:1000}, timeoutMs:15000,
      onOutput: event => append(event.text, 'Output'),
    });
    setBusy(true);
    const result = await activeRun.result; activeRun = undefined;
    await workspace.saveCommitted(result, world);
    append(result.commit === 'committed' ? 'World changes from this evaluation were kept.' : 'This evaluation’s world changes were discarded.', 'World changes');
    worldBrowser.update(world, {created:world.objects().filter(object => !beforeIds.has(object.id)).map(object => object.id)});
    if (result.status === 'completed') append('Return: ' + displayValue(result.value), 'Returned value');
    else {
      append('Evaluation: ' + result.status + '.', 'Errors');
      for (const diagnostic of result.diagnostics) append((diagnostic.code ?? diagnostic.category) + ': ' + diagnostic.message, 'Errors');
    }
  } catch (error) { append('Evaluation failed: ' + error.message, 'Errors'); }
  finally { activeRun = undefined; setBusy(false); }
}
evalEditor.addEventListener('input', () => {
  evalInputs.set(workspaceId(), evalEditor.value);
});
evalEditor.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {event.preventDefault(); evaluateCode();}
  if (event.key === 'Tab') {
    event.preventDefault(); if (!insertIndent(evalEditor)) return;
    evalEditor.dispatchEvent(new Event('input'));
  }
});
$('#evalRun').onclick = evaluateCode;
$('#evalStop').onclick = stopRun;
$('#evalClear').onclick = () => { if (!busy) $('#evalOutput').replaceChildren(); };
$('#evalInspect').onclick = () => { if (!(mode === 'sandbox' && sandboxWide.matches)) activateTab('world'); worldBrowser.select(BigInt(executionIdentity(workspaceLesson()).this)); };
editor.addEventListener('input', changed);
editor.addEventListener('scroll', () => { $('#lineNumbers').scrollTop = editor.scrollTop; });
function insertIndent(input) {
  if (input.value.length - (input.selectionEnd - input.selectionStart) + 2 > maxDraftLength) {showToast('Code is limited to 100,000 characters. Shorten it before adding indentation.');return false;}
  input.setRangeText('  ', input.selectionStart, input.selectionEnd, 'end');return true;
}
editor.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    event.preventDefault();
    if (!insertIndent(editor)) return;
    changed();
  }
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); check(); }
});
$('#workspaceMode').onchange = async event => {
  const nextMode=event.target.value;
  if(busy||suspended){syncTrackSelect();return;}
  await navigate(()=>{mode=nextMode;try{localStorage.setItem(modeKey,mode);}catch{} activateTab('editor');});
  syncTrackSelect();
};
$('#sandboxWorld').onchange=async event=>{const choice=event.target.value;await navigate(()=>{selectedSandbox=choice;try{localStorage.setItem('moo-sandbox-world:'+profile,choice);}catch{}});syncTrackSelect();};
$('#lessonSearch').oninput=renderNav;
function selectTrack(track, options) {
  return navigate(() => {
    selectedTrack = track; lessons = tracks[selectedTrack]; current = 0; $('#lessonSearch').value='';
    try { localStorage.setItem(trackKey, selectedTrack); localStorage.setItem(trackKey+':'+profile,selectedTrack); }
    catch { showToast('Track selection is available for this session only'); }
  }, options);
}
$('#trackSelect').onchange = event => selectTrack(event.target.value);
function refreshReference() {
  renderUtilityReference($('#utilityReference'),{profile});
  renderBuiltinReference($('#builtinReferenceGrid'), runtime.listBuiltins());
  $('#builtinReferenceStatus').textContent = `Available builtins — ${profileName()}`;
}
$('#runtimeProfileSelect').onchange = async event => {
  const nextProfile = event.target.value;
  if (busy || !runtime || !storage.owner || suspended) { syncTrackSelect(); return; }
  setBusy(true);
  let candidate;
  try {
    const saved = await workspace.saveBeforeNavigation();
    if (!saved) { problem('Could not save pending changes. Retry saving before switching profiles; you can export a backup from World. Your current workspace is still open.'); return; }
    if (!storage.owner || suspended) return;
    candidate = await api.createRuntime({profile:nextProfile});
    if (!storage.owner || suspended) return;
    storage.setProfile(nextProfile);
    const previousRuntime = runtime, lessonId = lessons[current].id;
    runtime = candidate; candidate = undefined; profile = nextProfile;
    teachingWorld = undefined;
    filterTracks();
    try{selectedTrack=localStorage.getItem(trackKey+':'+profile)??selectedTrack;}catch{}
    if(!Object.hasOwn(tracks,selectedTrack))selectedTrack='foundations';
    restoreSandboxChoice();storage.setScope(scope());
    lessons = tracks[selectedTrack];
    let targetLesson=lessonId;try{targetLesson=localStorage.getItem(`moo-lesson:${profile}:${selectedTrack}`)??lessonId;}catch{}
    current = Math.max(0, lessons.findIndex(lesson => lesson.id === targetLesson));
    try { localStorage.setItem(profileKey, profile); } catch {}
    refreshReference();
    await restoreWorkspace();
    previousRuntime.dispose();
  } catch (error) { problem('Profile switch failed: ' + error.message); }
  finally { candidate?.dispose(); syncTrackSelect(); setBusy(false); validate(); }
};
$('#restoreExample').onclick = async () => {
  if (busy || !canEdit()) return;
  editor.value = activeExample().code;
  storage.setDraft(activeExample().id, activeExample().code);
  lines(); validate(); setBusy(true); await storage.flush(); setBusy(false);
};
$('#runButton').onclick = check;
function stopRun() { stopped = true; activeRun?.stop(); }
$('#stopButton').onclick = stopRun;
async function resetWorld() {
  if (busy || !runtime || !storage.owner || suspended) return;
  if (!window.confirm((mode === 'training' ? 'Reset the entire track to its beginning, not the current lesson. To prepare the current lesson instead, cancel and use Load lesson starting world beside the exercise or under Lesson options.\n\n' : '') + 'Reset the ' + profileName() + ' ' + scope() + ' world?\n\nThis removes objects you created and restores all objects, properties, and verbs to this workspace’s starting checkpoint. The saved world, browser selection, and search will also reset. These world changes cannot be undone.\n\nOther tracks, sandbox and runtime profiles keep their worlds. Editor code and lesson progress will be kept.')) return;
  setBusy(true);
  try {
    const seed=mode==='sandbox'?sandboxSeed():lessons[0];
    if(seed?.worldSeed==='common-packages')await ensureCommonPackages();
    const candidate = prepareCheckpoint(runtime,api,fixtures,seed);
    if (storage.available) {
      if (!await storage.replaceWorld(runtime.saveWorld(candidate))) { problem('Reset was not saved; your current world is unchanged.'); return; }
    } else await storage.saveWorld(runtime.saveWorld(candidate));
    activateWorld(candidate); clearProblem();
    output(mode === 'training'
      ? 'This track’s world was reset to the beginning of the track. To run a later lesson without completing earlier ones, use Load lesson starting world beside the exercise or under Lesson options. Your code, progress, and other worlds are unchanged.'
      : 'The sandbox world was reset. Your code and other worlds are unchanged.');
    if (mode === 'training' && current > 0) $('#checkpointControls').open = true;
  } catch(error) {problem('Could not reset world: '+error.message+'. Your current world is unchanged.');}
  finally { setBusy(false); }
}
$('#resetWorld').onclick = resetWorld;

$('#resetLessonWorld').onclick=async()=>{
  if(busy||!runtime||!storage.owner||suspended||mode==='sandbox')return;
  const lesson=lessons[current];
  if(!window.confirm('Load the prepared starting world for “'+lesson.title+'”?\n\nThis replaces only this track’s current world, removing your experiments and restoring the expected state before this lesson. Your lesson code, progress, other tracks, sandbox and other runtime profile are kept. Export the current world first if you want a backup.'))return;
  setBusy(true);
  try{
    if(lesson.worldSeed==='common-packages')await ensureCommonPackages();
    const candidate=prepareCheckpoint(runtime,api,fixtures,lesson),snapshot=runtime.saveWorld(candidate);
    if(storage.available&&!await storage.replaceWorld(snapshot)){problem('Checkpoint was not saved; your current world is unchanged.');return;}
    if(!storage.available)await storage.saveWorld(snapshot);
    activateWorld(candidate);clearProblem();output('Prepared lesson world loaded. Your code is unchanged; Restore Example restores the starter code.');
  }catch(error){problem('Could not load lesson checkpoint: '+error.message);}finally{setBusy(false);}
};

$('#clearOutput').onclick = () => output('Feedback cleared.');
$('#hintButton').onclick = () => {
  $('#hintBox').hidden = !$('#hintBox').hidden;
  $('#hintButton').textContent = $('#hintBox').hidden ? 'SHOW HINT' : 'HIDE HINT';
};
$('#prevButton').onclick = () => { if (current > 0) navigate(() => { current--; }); };
$('#nextButton').onclick = () => {
  if (current < lessons.length - 1) navigate(() => { current++; });
  else if (nextTrack()) {
    const unfinished = lessons.filter(lesson => !completed.has(lesson.id)).length;
    const destination = nextTrack().title.replace(/^\d+ · /, '');
    if (unfinished && !window.confirm(`You have ${unfinished} unfinished lesson${unfinished === 1 ? '' : 's'} in this track.\n\nWe recommend completing all lessons before continuing, because the next track builds on what you have learned.\n\nContinue to ${destination} anyway? Your saved world, code, and progress will be kept. Choose Cancel to stay in this track.`)) return;
    selectTrack(nextTrack().id, {resumeLesson:false});
  }
};
$('#resetProgress').onclick = () => {
  const path = pathDefinitions.find(path => path.id === selectedTrack);
  if (!window.confirm(`Reset progress for "${path.title}"?\n\nThis clears completion and explored markers for the lessons available in this track under ${profileName()}. These markers are shared between LambdaMOO and ToastStunt.\n\nOther progress, saved worlds, your code, and your selected lesson will be kept. This cannot be undone.`)) return;
  lessons.forEach(lesson => completed.delete(lesson.id));
  saveProgress();
  renderNav();
  showToast('PROGRESS RESET');
};
const tabs = [...document.querySelectorAll('.tab')];
const sandboxWide = window.matchMedia('(min-width: 1200px)');
let selectedTab = 'lesson';
let labTab = 'editor';
function layoutPanels() {
  const focusedTab = tabs.includes(document.activeElement) ? document.activeElement : null;
  const wide = sandboxWide.matches;
  const split = mode === 'sandbox' && wide;
  if (wide && $('#lessonDrawer').open) closeDrawer();
  const railParent=wide ? $('.shell') : $('#drawerContent');
  const tabsParent=wide ? $('.lab-pane') : $('.workspace');
  // Moving an existing rail, even into the same parent, resets nested scroll.
  const railMoved=$('.rail').parentElement!==railParent;
  if(railMoved)railParent.prepend($('.rail'));
  if($('.panel-tabs').parentElement!==tabsParent)tabsParent.prepend($('.panel-tabs'));
  if (mode === 'sandbox' && selectedTab === 'lesson') selectedTab = 'editor';
  if (split && selectedTab === 'world') selectedTab = 'editor';
  for (const tab of tabs) {
    const name = tab.dataset.tab, active = (wide && selectedTab === 'lesson' ? labTab : selectedTab) === name;
    tab.hidden = (name === 'lesson' && (wide || mode === 'sandbox')) || (split && name === 'world');
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $('#' + name + 'Panel').hidden = name === 'lesson' ? mode === 'sandbox' || (!wide && selectedTab !== 'lesson') : !active && !(split && name === 'world');
    if (name === 'lesson') $('#' + name + 'Panel').setAttribute('role', wide ? 'region' : 'tabpanel');
  }
  if (focusedTab?.hidden) tabs.find(tab => !tab.hidden && tab.tabIndex === 0)?.focus();
  $('#worldPanel').setAttribute('role', split ? 'region' : 'tabpanel');
  $('#worldPanel').setAttribute('aria-label', 'World');
  if(wide && railMoved)revealCurrentLesson();
}

sandboxWide.addEventListener('change', layoutPanels);
function activateTab(name, focus = false) {
  selectedTab = name;
  if (name !== 'lesson') labTab = name;
  layoutPanels();
  if (!sandboxWide.matches) window.scrollTo(0, 0);
  if (focus) tabs.find(tab => tab.dataset.tab === selectedTab).focus();
}
for (const tab of tabs) {
  const name = tab.dataset.tab;
  tab.id = name + 'Tab'; tab.setAttribute('aria-controls', name + 'Panel');
  $('#' + name + 'Panel').setAttribute('role', 'tabpanel');
  $('#' + name + 'Panel').setAttribute('aria-labelledby', tab.id);
  tab.onclick = () => activateTab(name);
  tab.onkeydown = event => {
    let target;
    const visible = tabs.filter(tab => !tab.hidden), at = visible.indexOf(tab);
    if (event.key === 'ArrowRight') target = (at + 1) % visible.length;
    if (event.key === 'ArrowLeft') target = (at + visible.length - 1) % visible.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = visible.length - 1;
    if (target !== undefined) { event.preventDefault(); activateTab(visible[target].dataset.tab, true); }
  };
}
activateTab(mode === 'sandbox' ? 'editor' : 'lesson');
$('#openCode').onclick = () => { activateTab('editor', true); };
$('#recoverWorkspace').onclick = () => activateTab('world', true);
$('#manageWorld').onclick = () => activateTab('world', true);
$('#browseLessons').onclick = () => { $('#lessonDrawer').showModal(); $('#trackSelect').focus(); };
function closeDrawer() { if ($('#lessonDrawer').open) { $('#lessonDrawer').close(); $('#browseLessons').focus(); } }
$('#closeDrawer').onclick = closeDrawer;
$('#lessonDrawer').addEventListener('click', event => { if (event.target === $('#lessonDrawer')) closeDrawer(); });
$('#inspectWorld').onclick = () => { activateTab('world'); worldBrowser.select(BigInt(executionIdentity(workspaceLesson()).this)); };
$('#referenceGrid').innerHTML = refs.map(([name, description]) => `<div class="ref-card"><strong>${name}</strong><p>${description}</p></div>`).join('');
function problem(message) { document.querySelectorAll('.workspace-problem').forEach(node => { node.hidden = false; node.textContent = message; }); showPersistenceStatus(); }
function clearProblem() { recovery = false; originalSaved = undefined; document.querySelectorAll('.workspace-problem').forEach(node => { node.hidden = true; }); $('#downloadOriginal').hidden = true; showPersistenceStatus(); }
function activateWorld(world) {
  releaseLearnerWorker();
  teachingWorld = world; worldBrowser.setContext(executionIdentity(workspaceLesson())); worldBrowser.update(world, {reset:true});
  learnerSession().warmup();
}
async function restoreWorkspace() {
  loadingWorkspace = true; showPersistenceStatus();
  try {
    const saved = storage.available ? await storage.read() : sessionWorlds.get(workspaceId()); originalSaved = saved;
    if(saved === undefined && workspaceLesson()?.worldSeed==='common-packages') {
      await startupStage('Loading Common Packages. This larger world can take a moment; editing is temporarily unavailable.');
      await ensureCommonPackages();
    }
    await startupStage('Preparing your world and checking its verb code. Editing will be available shortly.');
    const world = saved === undefined ? prepareCheckpoint(runtime,api,fixtures,workspaceLesson()) : runtime.loadWorld(saved,loadOptions(workspaceLesson()));
    await startupStage('Preparing the code runner and restoring your lesson.');
    activateWorld(world); clearProblem();
    if (saved === undefined && storage.owner) await storage.saveWorld(runtime.saveWorld(world));
  } catch (error) {
    recovery = true;
    if (!teachingWorld) activateWorld(fixtures.createTeachingWorld({profile:runtime.profile}));
    problem('Saved workspace could not be loaded: ' + error.message + '. The saved data has been kept. Retry, download the original save, import a replacement, or reset. The inspector is a preview until recovery.');
    $('#downloadOriginal').hidden = originalSaved === undefined;
  } finally { loadingWorkspace = false; showPersistenceStatus(); }
  render();
}
function download(json, prefix) {
  const blob = new Blob([json], {type:'application/json'}), url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url;
  link.download = prefix + '-' + new Date().toISOString().replace(/[:.]/g,'-') + '.json';
  link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('#exportWorld').onclick = () => {
  if (busy || !teachingWorld) return;
  try { download(runtime.saveWorld(teachingWorld), 'moo-world'); }
  catch (error) { problem('Export failed: ' + error.message); }
};
$('#exportDrafts').onclick = () => download(JSON.stringify({format:'moo-field-manual-drafts',version:1,profile,scope:scope(),drafts:storage.exportDrafts(),evalInputs:Object.fromEntries(evalInputs),currentCode:editor.value,currentEval:evalEditor.value},null,2), 'moo-drafts');
$('#downloadOriginal').onclick = () => download(typeof originalSaved === 'string' ? originalSaved : JSON.stringify(originalSaved), 'moo-original-save');
$('#importWorld').onclick = () => { if (!busy && storage.owner && !suspended) $('#worldFile').click(); };
$('#worldFile').onchange = async event => {
  const file = event.target.files[0]; event.target.value = '';
  if (!file || busy || !storage.owner || suspended) return;
  setBusy(true);
  try {
    if (file.size > 32_000_000) throw new Error('File exceeds the snapshot size limit');
    const candidate = runtime.loadWorld(await file.text(),loadOptions(workspaceLesson()));
    if (!window.confirm('Import this world (' + candidate.objects().length + ' objects)?\n\nThis replaces your current and saved world. Your lesson drafts and progress will be kept.')) return;
    if (!await storage.replaceWorld(runtime.saveWorld(candidate))) { problem('Import was not saved; your current world is unchanged.'); return; }
    activateWorld(candidate); clearProblem(); output('Imported world saved for this workspace. Lesson drafts and progress are unchanged.');
  } catch (error) { problem('Import failed: ' + error.message + '. Your current world is unchanged.'); }
  finally { setBusy(false); }
};
function confirmWorkspaceReload() {
  return !storage.hasChanges || window.confirm('Reload the latest saved workspace? Unsaved world changes and drafts in this tab will be replaced. Export your world and download drafts first to keep copies.');
}
$('#retrySave').onclick = async () => {
  if (busy || !runtime) return;
  setBusy(true);
  try {
    if (recovery || !storage.owner) {
      if (confirmWorkspaceReload()) await restoreWorkspace();
    }
    else if (await storage.flush()) clearProblem();
  } finally { setBusy(false); }
};
$('#takeWorkspace').onclick = async () => {
  if (busy || !runtime) return;
  setBusy(true);
  try {
    if (!confirmWorkspaceReload()) return;
    if (await storage.acquire()) await restoreWorkspace();
  }
  finally { setBusy(false); }
};
const ownershipRetry = setInterval(async () => {
  if (!runtime || parserState !== 'ready' || busy || suspended || loadingWorkspace || storage.owner || storage.hasChanges) return;
  setBusy(true);
  try { if (await storage.acquire()) await restoreWorkspace(); }
  finally { setBusy(false); }
}, 1000);
document.addEventListener('visibilitychange', () => {if(document.visibilityState==='hidden' && storage.owner && storage.hasChanges) void storage.flush();});
window.addEventListener('beforeunload', event => {
  if (storage.unsaved || activeRun || [...evalInputs].some(([id,code]) => code !== (savedEvalInputs.get(id) ?? ''))) { event.preventDefault(); event.returnValue = ''; }
});
let departure = Promise.resolve();
window.addEventListener('pagehide', () => {
  suspended = true;
  const pendingRun = activeRun; stopRun(); releaseLearnerWorker(); setBusy(busy);
  departure = workspace.leave(pendingRun);
});
window.addEventListener('pageshow', async event => {
  if (!event.persisted || !runtime) return;
  await departure; suspended = false; setBusy(true);
  try { if (await workspace.resume()) await restoreWorkspace(); else problem('Unsaved work is still held in this tab. Retry saving or download drafts before reloading.'); }
  finally { setBusy(false); }
});
$('#runButton').disabled = true; editor.disabled = true;
render();
try {
  await startupStage('Loading the syntax checker and code runtime. Editing is temporarily unavailable.');
  [syntax, api, fixtures] = await Promise.all([
    createSyntaxService(),
    import(runtimeBase+'/dist/browser/index.js'),
    import(runtimeBase+'/dist/browser/fixtures.js'),
  ]);
  runtime = await api.createRuntime({ profile });
  refreshReference();
  await startupStage('Reading your saved workspace and checking editing access.');
  await storage.open();
  await restoreWorkspace();
  parserState = 'ready';
  setBusy(false); validate();
  finishStartup();
} catch (error) {
  console.error('Parser initialization failed', error);
  parserFailure();
}
