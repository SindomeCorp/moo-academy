import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',
  workers:4,
  use:{baseURL:'http://127.0.0.1:8017',trace:'retain-on-failure',screenshot:'only-on-failure'},
  projects:[
    {name:'chromium',use:{browserName:'chromium',launchOptions:process.env.MOO_BROWSER_EXECUTABLE?{executablePath:process.env.MOO_BROWSER_EXECUTABLE}:{}}},
    {name:'firefox',testMatch:'**/{smoke,common-packages,startup,lesson-scroll,utility-expansion,recovery-regressions}.spec.js',use:{browserName:'firefox'}},
    {name:'webkit',testMatch:'**/{smoke,common-packages,startup,lesson-scroll,utility-expansion,recovery-regressions}.spec.js',use:{browserName:'webkit'}},
  ],
  webServer:{command:'python3 scripts/serve.py --port 8017',url:'http://127.0.0.1:8017',reuseExistingServer:false},
});
