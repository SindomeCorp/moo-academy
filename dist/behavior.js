// Expectations derive from lesson objectives, never from evaluator output.
export function scenarios(id) {
  switch (id) {
    case 'comments': return [{ output: ['Hello from MOO!'] }];
    case 'objects': return [{ output: ['A workshop humming with possibility.'] }];
    case 'properties': return [{ output: ['The lamp clicks on.'], lamp: 1 }];
    case 'args': return [{ args: ['green'], output: ['Color: green'] }, { args: ['blue'], output: ['Color: blue'] }];
    case 'branching': return [{ locked: 1, output: ['The door is locked.'] }, { locked: 0, output: ['You enter.'] }];
    case 'lists': return [{ output: ['wrench', 'probe', 'torch'] }];
    case 'errors': return [{ output: ['That property does not exist.'] }];
    default: throw new Error('Unknown lesson');
  }
}
export function matchesBehavior(result, world, scenario) {
  return result.status === 'completed'
    && result.output.length === scenario.output.length
    && result.output.every((event, i) => event.text === scenario.output[i] && event.recipient.type === 'object' && event.recipient.value === 7n)
    && (scenario.lamp === undefined || (world.getProperty(42n, 'lamp_on').type === 'int' && world.getProperty(42n, 'lamp_on').value === BigInt(scenario.lamp)));
}
