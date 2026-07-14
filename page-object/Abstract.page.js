import { expect } from "@playwright/test";

export class AbstractPage {
  constructor(page) {
    this.page = page;
  }

  async openLoginPage(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }

  async checkVisualRegression(name, options = {}) {
    await expect(this.page).toHaveScreenshot(name, {
      fullPage: true,
      animations: "disabled",
      ...options,
    });
  }
}