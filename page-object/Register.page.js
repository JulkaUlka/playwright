export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerBtn = page.locator('[id="login-register-button"]');
    this.firstNameField = page.locator('[id="register-first-name"]');
    this.lastNameField = page.locator('[id="register-last-name"]');
    this.emailAddressField = page.locator('[id="register-email"]');
    this.passwordField = page.locator('[id="register-password"]');
    this.cityField = page.locator('[id="register-city"]');
    this.countryField = page.locator('[id="register-country"]');
    this.phoneField = page.locator('[id="register-phone"]');
    this.streetField = page.locator('[id="register-street"]');
    this.zipField = page.locator('[id="register-zip"]');
    this.submitBtn = page.locator('[id="register-button"]');
  }

  async navigate() {
    await this.page.goto("https://aqa-app.vercel.app/login");
  }

  async fillRegistrationForm(testData) {
    await this.registerBtn.click();
    await this.firstNameField.fill(testData.firstName);
    await this.lastNameField.fill(testData.lastName);
    await this.emailAddressField.fill(testData.emailAddress);
    await this.passwordField.fill(testData.password);
    await this.cityField.fill(testData.city);
    await this.countryField.selectOption(testData.country);
    await this.phoneField.fill(testData.phone);
    await this.streetField.fill(testData.street);
    await this.zipField.fill(testData.zip);
    await this.submitBtn.click();
  }
}
