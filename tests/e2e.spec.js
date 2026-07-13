import { test, expect } from "@playwright/test";
import { RegisterPage } from "../page-object/Register.page.js";
import { newUser1, cardData } from "../data/testData.js";
import { LoginPage } from "../page-object/Login.page.js";
import { CatalogPage } from "../page-object/Catalog.page.js";
import { BascketPage } from "../page-object/Bascket.page.js";
import { CheckoutPage } from "../page-object/Checkout.page.js";
import { MyAccountPage } from "../page-object/MyAccount.page.js";

test.setTimeout(50 * 1000);

test("Create new user and login, add products to cart and complete checkout", async ({
  page,
}) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const checkoutPage = new CheckoutPage(page);
  const myAccountPage = new MyAccountPage(page);
  const bascketPage = new BascketPage(page);

  let items;

  await test.step("Open login page and create new user", async () => {
    await registerPage.openLoginPage();
  });
  await test.step("Register new user", async () => {
    await registerPage.fillRegistrationForm(newUser1);
  });

  await test.step("Login with new user", async () => {
    await loginPage.login(newUser1.emailAddress, newUser1.password);
  });

  await test.step("Add products to cart ", async () => {
     items = await catalogPage.selectProduct();
  });

  await test.step("verify products and total price", async () => {
    await expect(catalogPage.basketCount).toBeVisible();
    await expect(catalogPage.basketCount).toContainText("2", { timeout: 3000 });
  });

  await test.step("Go to basket", async () => {
    await catalogPage.goToBasket();
  });

  await test.step("Verify products details in basket", async () => {
    await expect(bascketPage.firstProductItem).toHaveText(
      items.firstProduct.name,
    );
    await expect(bascketPage.secondProductItem).toHaveText(
      items.secondProduct.name,
    );
    await expect(bascketPage.firstProductPrice).toHaveText(
      items.firstProduct.price,
    );
    await expect(bascketPage.secondProductPrice).toHaveText(
      items.secondProduct.price,
    );
  });

  await test.step("Verify total price in basket", async () => {
    const firstProductPriceNumber = Number(
      (await bascketPage.firstProductPrice.innerText()).replace(/\D/g, ""),
    );
    const secondProductPriceNumber = Number(
      (await bascketPage.secondProductPrice.innerText()).replace(/\D/g, ""),
    );
    const totalNumber = parseInt(
      (await bascketPage.totalValue.innerText()).replace(/[^\d.]/g, ""),
      10,
    );
    expect(totalNumber).toBe(
      firstProductPriceNumber + secondProductPriceNumber,
    );
  });

  await test.step("Go to checkout page and fill payment data", async () => {
    await bascketPage.goToCheckoutPage();
  });

  await test.step("Fill payment data ", async () => {
    await checkoutPage.fillPaymentData(
      cardData.cardNumber,
      cardData.cardDate,
      cardData.cardCVV,
    );
  });

  await test.step("Verify checkout success", async () => {
    await expect(checkoutPage.checkoutSuccess).toBeVisible({ timeout: 8000 });
    await expect(checkoutPage.page).toHaveURL("/checkout");
  });

  await test.step("Go to my account", async () => {
    await checkoutPage.goToMyAccount();
    await expect(checkoutPage.page).toHaveURL("/account");
  });

  // await test.step("Verify total amount in my account page", async () => {
  //   const totalPrice =
  //     Number(items.firstProduct.price.replace("$", "")) +
  //     Number(items.secondProduct.price.replace("$", ""));
  //   await expect(myAccountPage.totalAmountField).toContainText(
  //     `${totalPrice}`,
  //     {
  //       timeout: 5000,
  //     },
  //   );
  // });
  // await test.step("Verify item list", async () => {
  //   await expect(myAccountPage.items.first()).toBeVisible();
  //   await expect(myAccountPage.items.last()).toBeVisible();
  //   await expect(myAccountPage.logoutBtn).toBeEnabled();
  // });

  await test.step("Logout from my account", async () => {
    await myAccountPage.logout();
  });
});
