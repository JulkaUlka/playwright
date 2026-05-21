const { faker } = require("@faker-js/faker");

export const newUser1 = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  emailAddress: faker.internet.email(),
  password: faker.internet.password(),
  city: faker.location.city(),
  country: "Ukraine",
  phone: "+380666666666",
  street: faker.location.streetAddress(),
  zip: "08130",
};

export const cardData = {
  cardNumber: process.env.CARD_NUMBER,
  cardDate: process.env.CARD_DATE,
  cardCVV: faker.finance.creditCardCVV(),
};

export const apiDataPost = {
  title: "foo",
  body: "bar",
  userId: 1,
};

export const apiDataPatch = {
  title: "hello aqa",
};
