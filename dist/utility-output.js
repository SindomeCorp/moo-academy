// Illustrative examples must still satisfy an explicit, bounded result contract.
export function matchesUtilityOutput(actual,expected,choices={}) {
 if(actual.length!==expected.length)return false;
 return actual.every((line,i)=>{
  const prefix=Object.keys(choices).find(p=>expected[i].startsWith(p));
  if(!prefix)return line===expected[i];
  if(!line.startsWith(prefix))return false;
  const rule=choices[prefix],value=line.slice(prefix.length);
  if(Array.isArray(rule))return rule.includes(value);
  if(rule.kind==='number')return value.trim()!==''&&Number.isFinite(Number(value))&&Number(value)>=rule.min&&Number(value)<=rule.max&&(!rule.integer||Number.isInteger(Number(value)));
  return false;
 });
}
