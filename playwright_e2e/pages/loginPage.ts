import { Page, expect } from "@playwright/test";
import { CommonHelper } from "../utils/commonHelpers";
import data from "../testData/data.json";

export class LoginPage {
  private readonly page: Page;
  private readonly commonHelper: CommonHelper;

  constructor(page: Page) {
    this.page = page;
    this.commonHelper = new CommonHelper(this.page);
  }

  // Static locators as data-testid , to avoid flaky tests due to locator changes in future if we use id/class-name
  public headerDescription = () =>
    this.page.locator('[data-testid="headerDesc"]');
  public emailInput = () => this.page.locator('[data-testid="emailInput"]');
  public passwordInput = () =>
    this.page.locator('[data-testid="passwordInput"]');
  public loginButton = () => this.page.locator('[data-testid="loginButton"]');

  /**
   * Verifies the header title and checks if the default elements are displayed.
   * This method waits for the header title to match the expected value and
   * ensures that key elements on the page are visible.
   */
  public async verifyHeaderTitleAndDefaultElements() {
    await this.commonHelper.isElementDisplayed(this.headerDescription());
    await this.commonHelper.isElementDisplayed(this.emailInput());
    await this.commonHelper.isElementDisplayed(this.passwordInput());
    await this.commonHelper.isElementDisplayed(this.loginButton());
    expect((await this.headerDescription().textContent()).trim()).toBe(
      data.pages.headerTitle
    );
  }

  /**
   * The login method logs in
   * @param email - email id to log-in
   * @param password - password to log-in
   */
  public async login(email: string, password: string) {
    await this.commonHelper.isElementDisplayed(this.headerDescription());
    await this.commonHelper.fillInputField(this.emailInput(), email);
    await this.commonHelper.fillInputField(this.passwordInput(), password);
    await this.commonHelper.clickElement(this.loginButton());
  }
}
