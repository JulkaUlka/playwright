import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-object/Login.page.js";
import { AbstractPage } from "../page-object/Abstract.page.js";

test.describe("Visual regression test", () => {
  test("Login page - Visual regression test", async ({ page }) => {
    const abstractPage = new AbstractPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage("/login");
    await abstractPage.checkVisualRegression("login-page.png", {
      maxDiffPixels: 100
    });
  });
});
