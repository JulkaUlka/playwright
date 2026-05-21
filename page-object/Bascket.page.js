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

  }


  async checkTotalprice() {
    // await this.addFirstItemBtn.click({clickCount:1, delay: 1000});
    await this.checkoutBtn.click();
    await this.page.waitForURL("/checkout");
  }
}
