import { Page, expect } from "@playwright/test";
import path from "path";
import testData from "../testData/data.json";

export class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL and waits for the page to load completely.
   * @param url - The URL to visit and matches based on ENV variable
   */
  public async visit(url: string) {
    if (url.includes("file:///")) {
      const filePath = path.resolve("app_src", "index.html");
      await this.page.goto(`file://${filePath}`, { waitUntil: "load" });
    } else {
      await this.page.goto(url, { waitUntil: "load" });
    }
    const pageTitle = await this.page.title();
    expect(pageTitle).toBe(testData.pages.loginPageTitle);
  }

  /**
   * browserRefresh to mimic user behaviour of refreshing the browser
   */
  public async browserRefresh() {
    await this.page.reload({ waitUntil: "networkidle" });
  }
}
