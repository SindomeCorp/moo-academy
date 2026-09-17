import {displayValue} from './display.js';
// Check observable behavior, not source spelling. Probes are executed by the
// worker separately so a learner-defined verb remains subject to Stop/timeout.
export function matchesCourseCheck(result,world,check,executionObject=42n) {
  if(result.status!=='completed'||displayValue(result.value)!==check.expected)return false;
  if(check.output&&JSON.stringify(result.output.map(event=>event.text))!==JSON.stringify(check.output))return false;
  try {
    for(const [path,expected] of Object.entries(check.properties??{})){
      let id=executionObject,value;
      for(const name of path.split('.')){value=world.getProperty(id,name);id=value.value;}
      if(displayValue(value)!==expected)return false;
    }
  } catch {return false;}
  return true;
}

// Only an explicitly authored diagnostic is an expected failure. Stop and other
// resource limits must never count as observing tick exhaustion.
export function matchesExpectedFailure(result, expected) {
  return Boolean(expected && result.status === expected.status &&
    result.diagnostics?.some(diagnostic => diagnostic.message === expected.message));
}
