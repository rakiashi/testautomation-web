import { Page, Locator, expect } from "@playwright/test";

export class CommonHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * This Method checks if Element is displayed and provides useful info if not
   * it also returns boolean value
   */
  public async isElementDisplayed(elementLocator: Locator) {
    try {
      const element = await elementLocator;
      await element.waitFor({
        state: "visible",
      });
      return true;
    } catch (error) {
      throw new Error(
        `isElementDisplayed : Could not find selector: "${elementLocator}"`
      );
    }
  }

  /**
   * This Method checks if Element is NOT displayed and provides useful info if present
   * it also returns boolean value
   */
  public async isElementNotDisplayed(
    elementLocator: Locator
  ): Promise<boolean> {
    try {
      const element = await elementLocator;
      await element.waitFor({
        state: "hidden",
      });
      return true;
    } catch (error) {
      if (
        error.message.includes(
          `isElementNotDisplayed : Could not find selector : "${elementLocator}"`
        )
      ) {
        return true;
      }
      return false;
    }
  }

  /**
   * Fills the given input field with the provided value.
   * @param inputFieldLocator - The Locator of the input field.
   * @param value - The value to fill in the input field.
   */
  public async fillInputField(inputFieldLocator: Locator, value: string) {
    try {
      await inputFieldLocator.waitFor({
        state: "visible",
      });
      await inputFieldLocator.fill(value);
    } catch (error) {
      throw new Error(
        `Could not fill input field: "${inputFieldLocator.toString()}" with value: "${value}"`
      );
    }
  }

  /**
   * Clicks on the given button/link of element.
   * @param clickElement - The Locator of the button or element to click.
   */
  public async clickElement(clickLocator: Locator) {
    try {
      // Wait for the button to be visible and click it
      await clickLocator.waitFor({
        state: "visible",
      });
      await clickLocator.click();
    } catch (error) {
      throw new Error(
        `Could not click on element: "${clickLocator.toString()}"`
      );
    }
  }

  /**
   * verifyLocalStorageLoggedKey : checks the localStaoge logged key 
   * to ensure expected value is storing correctly
   */
  public async verifyLocalStorageLoggedKey(expectedValue: string) {
    const localStorageValue = await this.page.evaluate(() => {
      return localStorage.getItem("logged");
    });
    expect(localStorageValue).toBe(expectedValue);
  }

  /**
   * deleteLocalStorageLoggedKey : clearing the localStorage logged key 
   * to mimic the session expiry storage an dit returns the boolean value
   */
  public async deleteLocalStorageLoggedKey() {
    await this.page.evaluate(() => {
      return localStorage.removeItem("logged");
    });
    const isKeyDeleted = await this.page.evaluate(
      () => !localStorage.getItem("logged")
    );
    return isKeyDeleted;
  }
}
