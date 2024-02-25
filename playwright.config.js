
const { defineConfig, devices } = require('@playwright/test');


 
module.exports = defineConfig({
  testDir: './tests',
 // max time one test can run for
 timeout: 30 * 1000,
expect: {
    timeout: 5000
},
reporter : 'html',
  use: {

        browserName : 'chromium',
        headless: false
  },

  /* Configure projects for major browsers */
  

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

