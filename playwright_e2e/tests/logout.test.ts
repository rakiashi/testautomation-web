import { test } from "../fixtures";
import data from "../testData/data.json";

test.beforeEach(async ({ basePage }, testInfo) => {
  await basePage.visit(testInfo.project.use.baseURL);
});

test.describe("Simulating session storage expiry by clearing localStorage", async () => {
  test("An logged-in user should logout successfully by clearing localstorage. @Regression", async ({
    basePage,
    loginPage,
    accountPage,
  }) => {
    // using one of the valid user to loging-in
    const userIndex = Math.floor(Math.random() * data.users.validCredentials.length);
    const user = data.users.validCredentials[userIndex];
    await loginPage.login(user.email, user.password);
    await accountPage.ensureUserLoggedIn();
    await accountPage.clearingLocalStorage();
    await basePage.browserRefresh();
    await accountPage.ensureUserNotLoggedIn();
  });
});
