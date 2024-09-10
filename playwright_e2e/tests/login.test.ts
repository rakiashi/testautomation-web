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
    const userIndex = Math.floor(Math.random() * data.users.validCredentials.length);
    const user = data.users.validCredentials[userIndex];
    await loginPage.verifyHeaderTitleAndDefaultElements();
    await loginPage.login(user.email, user.password);
    await accountPage.verifyAccountPageDefaultElements();
    // verify login state : successful logged-in users information is stored in localStorage
    await accountPage.loginStateLocalStorage(user.email);
  });
});

test.describe("Login Validation For Incorrect Credentials", async () => {
  test("An incorrect credential should fail to log-in. @P1", async ({
    loginPage,
    accountPage,
  }) => {
    // using one of the invalid user to loging-in
    const userIndex = Math.floor(Math.random() * data.users.inValidCredentials.length);
    const user = data.users.inValidCredentials[userIndex];
    await loginPage.login(user.email, user.password);
    await accountPage.ensureUserNotLoggedIn();
  });
});
