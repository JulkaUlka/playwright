import { expect } from "@playwright/test";

export class BascketPage {
  constructor(
    page,
    tabletNameValue,
    coffeeMachineNameValue,
    tabletPriceValue,
    coffeeMachinePriceValue,
  ) {
    this.page = page;
    this.firstProductItem = page.locator('[id="cart-item-name-5"]');
    this.secondProductItem = page.locator('[id="cart-item-name-6"]');
    this.firstProductPrice = page.locator('[id="cart-item-price-5"]');
    this.secondProductPrice = page.locator('[id="cart-item-price-6"]');
    this.totalValue = page.locator('[id="cart-total"]');
    this.checkoutBtn = page.locator('[id="cart-checkout-button"]');
    this.addFirstItemBtn = page.locator('[id="cart-item-increase-5"]');
    this.removeFirstItemBtn = page.locator('[id="cart-item-decrease-5"]');

    this.tabletNameValue = tabletNameValue;
    this.coffeeMachineNameValue = coffeeMachineNameValue;
    this.tabletPriceValue = tabletPriceValue;
    this.coffeeMachinePriceValue = coffeeMachinePriceValue;
  }

  async compareProductDetails() {
    await expect(this.firstProductItem).toHaveText(this.tabletNameValue);
    await expect(this.secondProductItem).toHaveText(
      this.coffeeMachineNameValue,
    );
    await expect(this.firstProductPrice).toHaveText(this.tabletPriceValue);
    await expect(this.secondProductPrice).toHaveText(
      this.coffeeMachinePriceValue,
    );
  }

  async checkTotalprice() {
    const firstProductPriceNumber = Number(
      (await this.firstProductPrice.innerText()).replace(/\D/g, ""),
    );
    const secondProductPriceNumber = Number(
      (await this.secondProductPrice.innerText()).replace(/\D/g, ""),
    );
    const totalNumber = parseInt(
      (await this.totalValue.innerText()).replace(/[^\d.]/g, ""),
      10,
    );

    expect(totalNumber).toBe(
      firstProductPriceNumber + secondProductPriceNumber,
    );

    // await this.addFirstItemBtn.click({clickCount:1, delay: 1000});
    await this.checkoutBtn.click();
    await this.page.waitForURL("https://aqa-app.vercel.app/checkout");
  }
}
