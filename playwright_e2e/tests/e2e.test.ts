import { test } from "../fixtures";
import data from "../testData/data.json";

test.beforeEach(async ({ basePage }, testInfo) => {
    await basePage.visit(testInfo.project.use.baseURL);
  });

test.describe("E2E Test : Multiple Valid Credentials", async () => {
  // a list of valid credentials for e2e test to login and logout
  for (const user of data.users.validCredentials) {
    test(`A valid user as : ${user.email} should be able to log-in and log-out successfully.`,{ tag: ['@P1' ,'@Regression']}, async ({
      loginPage,
      accountPage,
    }) => {
      await loginPage.login(user.email, user.password);
      await accountPage.ensureUserLoggedIn();
      await accountPage.logout();
      await accountPage.ensureUserNotLoggedIn();
    });
  }
});