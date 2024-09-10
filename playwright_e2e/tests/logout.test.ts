import { test } from "../fixtures";
import data from "../testData/data.json";

test.beforeEach(async ({ basePage }, testInfo) => {
  await basePage.visit(testInfo.project.use.baseURL);
});

test.describe("Logout Test Using Valid Credentials", async () => {
  test("An valid user should be able to login and logout successfully. @P1", async ({
    loginPage,
    accountPage,
  }) => {
    // using one of the valid user to loging-in & logout
    const user = data.users.validCredentials[1];
    await loginPage.login(user.email, user.password);
    await accountPage.ensureUserLoggedIn();
    await accountPage.logout();
    await accountPage.ensureUserNotLoggedIn();
  });
});

test.describe("Simulating session expiry by clearing localStorage", async () => {
  test("An logged-in user should logout successfully by clearing localstorage. @Regression", async ({
    basePage,
    loginPage,
    accountPage,
  }) => {
    // using one of the valid user to loging-in
    const user = data.users.validCredentials[1];
    await loginPage.login(user.email, user.password);
    await accountPage.ensureUserLoggedIn();
    await accountPage.clearingLocalStorage();
    await basePage.browserRefresh();
    await accountPage.ensureUserNotLoggedIn();
  });
});
