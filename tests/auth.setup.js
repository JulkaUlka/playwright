import { test } from "@playwright/test";
import { RegisterPage } from "../page-object/Register.page.js";
import { newUser1 } from "../data/testData.js";
import { LoginPage } from "../page-object/Login.page.js";

test("setup: login and save storage state", async ({ page, context }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  await test.step("Open login page", async () => {
    await registerPage.openLoginPage();
  });
  await test.step("Register new user", async () => {
    await registerPage.fillRegistrationForm(newUser1);
  });

  await test.step("Login with new user", async () => {
    await loginPage.login(newUser1.emailAddress, newUser1.password);
  });

  await test.step("Save storage state to file", async () => {
    await context.storageState({ path: "data/storageState.json" });
  });
});
