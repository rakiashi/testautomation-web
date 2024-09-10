import { test } from "../fixtures";
import data from "../testData/data.json";

test.beforeEach(async ({ basePage }, testInfo) => {
  await basePage.visit(testInfo.project.use.baseURL);
});

test.describe("Login Test Using Valid Credentials", async () => {
  test("An valid user should be able to login successfully. @P1", async ({
    loginPage,
    accountPage,
  }) => {
    // using one of the valid user to loging-in
    const user = data.users.validCredentials[1];
    await loginPage.verifyHeaderTitleAndDefaultElements();
    await loginPage.login(user.email, user.password);
    await accountPage.verifyAccountPageDefaultElements();
    // verify login state : successful logged-in users information is stored in localStorage
    await accountPage.loginStateLocalStorage(user.email);
  });
});

test.describe("E2E Test : A List Of Valid Credentials", async () => {
  // a list of valid credentials for e2e test to login and logout
  for (const user of data.users.validCredentials) {
    test(`A valid user as : ${user.email} should be able to log in and log out successfully. @Regression`, async ({
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

test.describe("Login Validation For Incorrect Credentials", async () => {
  test("An incorrect credential should fail to log-in. @P1", async ({
    loginPage,
    accountPage,
  }) => {
    // using one of the invalid user to loging-in
    const user = data.users.inValidCredentials[1];
    await loginPage.login(user.email, user.password);
    await accountPage.ensureUserNotLoggedIn();
  });
});
