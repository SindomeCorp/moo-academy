export function displayValue(value) {
  switch (value.type) {
    case 'object': return '#' + value.value;
    case 'int': return String(value.value);
    case 'float': return Object.is(value.value, -0) ? '-0.0' : Number.isInteger(value.value) ? value.value + '.0' : String(value.value);
    case 'string': return JSON.stringify(value.value);
    case 'error': return value.value;
    case 'list': return '{' + value.value.map(displayValue).join(', ') + '}';
    case 'map': return '[' + value.value.map(([key, entry]) => displayValue(key) + ' -> ' + displayValue(entry)).join(', ') + ']';
  }
}
