import { test as base } from "@playwright/test";
import { BasePage } from "../playwright_e2e/pages/basePage";
import { LoginPage } from "../playwright_e2e/pages/loginPage";
import { AccountPage } from "./pages/accountPage";
import { CommonHelper } from "./utils/commonHelpers";

// Extend the base test with custom fixtures for pages
export const test = base.extend<{
  basePage: BasePage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  commonHelper: CommonHelper;
}>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  commonHelper: async ({ page }, use) => {
    await use(new CommonHelper(page));
  }
});
