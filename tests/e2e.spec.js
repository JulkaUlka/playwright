import { test } from "@playwright/test";
import { RegisterPage } from "../page-object/Register.page.js";
import { newUser1, cardData } from "../data/testData.js";
import { LoginPage } from "../page-object/Login.page.js";
import { CatalogPage } from "../page-object/Catalog.page.js";
import { BascketPage } from "../page-object/Bascket.page.js";
import { CheckoutPage } from "../page-object/Checkout.page.js";
import { MyAccountPage } from "../page-object/MyAccount.page.js";

test.setTimeout(50 * 1000);

test("test", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const checkoutPage = new CheckoutPage(page);
  const myAccountPage = new MyAccountPage(page);

  await registerPage.navigate();
  await registerPage.fillRegistrationForm(newUser1);
  await loginPage.login(newUser1.emailAddress, newUser1.password);
  await catalogPage.selectProduct();

  const bascketPage = new BascketPage(
    page,
    catalogPage.tabletNameValue,
    catalogPage.coffeeMachineNameValue,
    catalogPage.tabletPriceValue,
    catalogPage.coffeeMachinePriceValue,
  );

  await bascketPage.compareProductDetails();
  await bascketPage.checkTotalprice();
  await checkoutPage.fillPaymentData(
    cardData.cardNumber,
    cardData.cardDate,
    cardData.cardCVV,
  );
  await checkoutPage.successOrderMessage();
  await checkoutPage.goToMyAccount();
//   await myAccountPage.checkFinalOrder(
//     catalogPage.tabletPriceValue,
//     catalogPage.coffeeMachinePriceValue,
//   );
//   await myAccountPage.checkTwoItems();
  await myAccountPage.logout();
});
