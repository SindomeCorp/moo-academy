import {commonManifest} from './common-packages.js';
let reference;
const node=(tag,text)=>Object.assign(document.createElement(tag),{textContent:text});
export function renderUtilityReference(container,{profile}) {
 container.replaceChildren();container.hidden=profile!=='toaststunt';if(container.hidden)return;
 const heading=node('h2','Common Packages · ToastCore'),intro=node('p','375 verb definitions, including their aliases and unchanged source. A documented server call is not a claim that its services are implemented in this browser.');
 const details=document.createElement('details');details.append(node('summary','Browse utility verbs'));
 const label=node('label','Search names, aliases and documentation');label.htmlFor='utilitySearch';
 const search=document.createElement('input');search.id='utilitySearch';search.type='search';
 const select=document.createElement('select');select.setAttribute('aria-label','Utility object');
 select.append(Object.assign(node('option','All utilities'),{value:''}));
 commonManifest.utilities.forEach(u=>select.append(Object.assign(node('option',u.title+' · '+u.aliases.join(', ')),{value:u.id})));
 const status=node('p','Open to load the verb reference.');status.setAttribute('role','status');
 const results=document.createElement('div');results.className='utility-results';
 details.append(label,search,select,status,results);container.append(heading,intro,details);
 let loaded;
 async function render(){
  try{
   reference??=fetch('./packages/common-packages/reference.json').then(r=>{if(!r.ok)throw new Error('Reference download failed');return r.json();}).catch(e=>{reference=undefined;throw e;});
   loaded??=await reference;
   const query=search.value.toLowerCase();const matches=loaded.filter(v=>(!select.value||v.utility===select.value)&&[v.names.join(' '),v.documentation.join(' '),v.sourceVerbId].join(' ').toLowerCase().includes(query));
   status.textContent=matches.length+' definitions';results.replaceChildren();
   for(const v of matches){
    const entry=document.createElement('details');entry.dataset.sourceVerbId=v.sourceVerbId;
    entry.append(node('summary',v.objectAlias+':'+v.names.join(' / ')+' · '+v.support.label));
    entry.addEventListener('toggle',()=>{if(!entry.open||entry.children.length>1)return;
     entry.append(node('p','Definition '+v.sourceVerbId+' · '+v.support.reason));
     entry.append(node('h3','Original documentation'));
     if(v.documentation.length) v.documentation.forEach(s=>entry.append(node('p',s)));
     else entry.append(node('p','This source has no introductory documentation. Read its argument handling before calling it.'));
     entry.append(node('h3','Programmatic arguments'));
     if(v.argumentPatterns.length)v.argumentPatterns.forEach(pattern=>entry.append(node('pre',pattern)));
     else entry.append(node('p','See the original documentation and uses of args in the source below.'));
     entry.append(node('h3','Command signature'),node('code',v.args.join(' ')),node('p','These argument specifications control command matching. Programmatic calls pass their arguments explicitly in args.'));
     entry.append(node('h3','Inspection example'),node('pre',v.inspectionExample),node('p','Result: the original verb source as a list of lines. This inspection does not run the verb or change the world.'));
     for(const example of v.examples){
      entry.append(node('h3',example.title),node('pre',example.code));
      if(example.expectedOutput?.length)entry.append(node('p',example.executionMode==='source-walkthrough'?'Source walkthrough output':example.outputChoices?'Example output (varies)':'Starter output'),node('pre',example.expectedOutput.join('\n')));
      entry.append(node('p','Returned value: '+example.expected));
      if(example.serverExercise){const e=example.serverExercise;entry.append(node('h3','Real-server exercise'),node('p',e.prerequisites),node('pre',e.code));if(e.expectedEffect)entry.append(node('p','Expected effect: '+e.expectedEffect));else entry.append(node('p',e.outputChoices?'Example server output (varies)':'Expected server output'),node('pre',e.expectedOutput.join('\n')),node('p','Returned value: '+e.expected));}
     }
     entry.append(node('h3','Side effects'),node('p',v.sideEffects),node('h3','Original source'),node('pre',v.source));
     const link=node('a','Pinned ToastCore database');link.href=commonManifest.source.repository+'/blob/'+commonManifest.source.commit+'/toastcore.db';entry.append(link);
    });
    results.append(entry);
   }
  }catch(e){status.textContent=e.message+'. Close and reopen to retry.';}
 }
 details.addEventListener('toggle',()=>{if(details.open)render();});search.addEventListener('input',render);select.addEventListener('change',render);
}
