import { Page, expect } from "@playwright/test";
import { CommonHelper } from "../utils/commonHelpers";

export class AccountPage {
  private readonly page: Page;
  private readonly commonHelper: CommonHelper;

  constructor(page: Page) {
    this.page = page;
    this.commonHelper = new CommonHelper(this.page);
  }

  // Static locators as data-testid , to avoid flaky tests due to locator changes in future if we use id/class-name

  public userIcon = () => this.page.locator('[data-testid="userIcon"]');
  public logoutLink = () => this.page.locator('[data-testid="logoutLink"]');
  public homeTab = () => this.page.locator('[data-testid="homeTab"]');
  public productTab = () => this.page.locator('[data-testid="productTab"]');
  public contactTab = () => this.page.locator('[data-testid="contactTab"]');

  /**
   * Verifies the default elements are displayed.
   */
  public async verifyAccountPageDefaultElements() {
    await this.commonHelper.isElementDisplayed(this.homeTab());
    await this.commonHelper.isElementDisplayed(this.productTab());
    await this.commonHelper.isElementDisplayed(this.contactTab());
    await this.commonHelper.isElementDisplayed(this.userIcon());
  }

  /**
   * This method is for loggin out from application
   */
  public async logout() {
    await this.userIcon().click();
    await this.commonHelper.isElementDisplayed(this.logoutLink());
    await this.logoutLink().click();
    await this.ensureUserNotLoggedIn();
  }

  /**
   * This method checks if user logged status
   */
  public async ensureUserLoggedIn() {
    const isDisplayed = await this.commonHelper.isElementDisplayed(
      this.userIcon()
    );
    expect(isDisplayed, "ensureUserLoggedIn").toBe(true);
  }

  /**
   * This method checks user logged-in status
   */
  public async ensureUserNotLoggedIn() {
    const notDisplayed = await this.commonHelper.isElementNotDisplayed(
      this.homeTab()
    );
    expect(notDisplayed, "ensureUserNotLoggedIn").toBe(true);
  }

  /**
   * This method checks login-state localStorage
   * @param emailid : expected emailid to be verified with logged key
   */
  public async loginStateLocalStorage(email: string) {
    await this.commonHelper.verifyLocalStorageLoggedKey(email);
  }

  /**
   * This method clears the logged key from localStorage
   */
  public async clearingLocalStorage() {
    const clearingStorage =
      await this.commonHelper.deleteLocalStorageLoggedKey();
    expect(clearingStorage, "clearingLocalStorage").toBe(true);
  }
}
