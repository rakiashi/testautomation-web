### Test Assesment 

Playwright_2e testing framework is integrated within the local[FE] existing source code of the login web app , along with capabities of cross browser testing , testing on local / different test levels enviornments using enviornment variables.

Basic test steps are focused during implementing this framework which helps during debugging failed tests through report, a static locators (data-testid) has been added on source code level to minimizing acessing controls using class-names/id.

### Test Scenarios Covered

* Login Test Using Valid Credentials : An valid user should be able to login successfully.
* E2E Test : Multiple Valid Credentials 
* Login Validation For Incorrect Credentials : An incorrect credential should fail to log-in.
* Simulating browser storage clear data by clearing localStorage : An logged-in user should logout successfully by clearing localstorage.

## playwright_e2e test

    tests
      |-login.test.ts
      |-logout.test.ts

### **Pre-requisites**
  * node version* - >v21.0.x
  * git
 
  ## Installation Steps
   * git clone https://github.com/rakiashi/testautomation-web.git
   * unzip the project and navigate to project directory from your terminal
   * run cmd *npm ci* 
   * run cmd *npm playwright install --with-deps*
   * run cmd *npm run test*
   * run cmd to view latest run playwright report *npm run playwright-report*

  **Note:** 
 * The BASE_URL is configured in *env.config.json* by default test runs on local [app_src/index.html]
 * By default test runs with workers=4 
 * You can configure ***process.env[ENV,BROWSER]*** options which can be modify within the npm cmds for desire test runs
 * Test-data is also shared *playwright_e2e/testData/data.json* 

### Initiating the playwright_e2e test runs locally using npm cmds 

  * *npm run test-local-chromium-p1*  # this cmd clean-ups the report folders & test runs on local using playwright-test-runner tests by @P1 tag on chromium browser with default headless mode OFF & generates-allure-report
  * *npm run test-local-firefox-regression*  # this cmd clean-ups the report folders & test runs on local of playwright-test-runner tests by @Regression tag on firefox browser & generates-allure-report
  * *npm run clean-reports* # this cmd cleanups *playwright-report* , *allure-report* & *allure-results* directories
  
### Test Report of playwright-e2e
  playwright-report

    |-index.html

  allure-report

    |-index.html   

* Latest tests report can be viewed on accessing index.html file on a browser which gives detailed information about the run
* *npm run playwright-report* # this cmd asses in launching latest test run of playwright-report on your default browser
* *npm run allure-report* # this cmd asses in launching latest test run of allure-report on your default browser

* playwright-report is an default in-built report which has all the features such as screenshot & video on failure , traceview etc.

## Browsers tested 
	* Chromium 
	* Firefox

## Github Actions
- The github action workflow file is located in directory .github/workflows file name main.yml
- The workflow is triggered on every push to main branch or when a pull request is created 
- The workflow consist of single jobs: Build-and-Test # which runs playwright-test-runner tests with cmd *npm run test*