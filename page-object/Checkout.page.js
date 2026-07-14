import { AbstractPage } from "./Abstract.page.js";

export class CheckoutPage extends AbstractPage{
  constructor(page) {
    super(page);
    this.page = page;
    this.cardNumberField = page.getByPlaceholder("Card Number (16 digits)");
    this.dateField = page.getByPlaceholder("MM/YY");
    this.cvvField = page.getByPlaceholder("CVV (3 digits)");
    this.payNowBtn = page.getByRole("button", { name: "Pay Now" });
    this.checkoutSuccess = page.locator('[id="checkout-success"]');
    this.myAccountBtn = page.locator('[href="/account"]');
  }

  async fillPaymentData(cardNumber, cardDate, cardCVV) {
    await this.cardNumberField.fill(cardNumber);
    await this.dateField.fill(cardDate);
    await this.cvvField.fill(cardCVV);
    await this.payNowBtn.click();
  }

  async goToMyAccount() {
    await this.myAccountBtn.click();
  }
}
