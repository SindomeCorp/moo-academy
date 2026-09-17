// Package data is fetched only when a Common Packages workspace is opened.
import { commonManifest } from './packages/common-packages/metadata.js';
export { commonManifest };
let snapshot, pending;
export function installCommonPackages(data) { snapshot=data; }
export async function ensureCommonPackages() {
  if(snapshot)return;
  pending??=fetch('./packages/common-packages/world.json').then(response=>{if(!response.ok)throw new Error('Common Packages download failed');return response.json();}).then(installCommonPackages).catch(error=>{pending=undefined;throw error;});
  await pending;
}
export function commonWorld(runtime) {
  if(!snapshot)throw new Error('Common Packages has not loaded yet');
  return runtime.loadWorld(snapshot,commonLoadOptions);
}
export const commonLoadOptions={worldLimits:commonManifest.worldLimits,unsupportedSourcePolicy:'retain'};
export const defaultContext={this:42,player:7,caller:7};
export const executionIdentity=lesson=>lesson?.worldSeed==='common-packages'?commonManifest.context:defaultContext;
export const loadOptions=lesson=>lesson?.worldSeed==='common-packages'?commonLoadOptions:{};
