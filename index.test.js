// I want to testCheckout.scan a product to know its price
// I want to testCheckout.scan many products to know their total price
// I want discounts to be applied if there are multibuy offers, when the total is finally calculated

// SKU Unit Price Special Price
// A 50 3 for 130
// B 30 2 for 45
// C 20
// D 15

// The pricing structure should be separate from the checkout (and passed in)

// ARRANGE / ACT / ASSERT

const {
checkout,
pricingRules
} = require("./index");

let testCheckout;
beforeEach(() => {
  testCheckout = new checkout(pricingRules)
})

test("testCheckout.scan should add item and quantity to the basket", () => {
  // ARRANGE
  const expected = {banana: 1}
  // ACT
  testCheckout.scan("banana");
  // ASSERT
  expect(testCheckout.basket).toEqual(expected);
});

test("scan can add multiple items to the basket", () => {
  // ARRANGE
  const expected = {apple: 2, banana: 1}
  // ACT
 testCheckout.scan("apple");
 testCheckout.scan("banana");
 testCheckout.scan("apple");
  // ASSERT
  expect(testCheckout.basket).toEqual(expected);
});

test("checkout can calculate the total price of 2 items", () => {
  //ARRANGE
  const expected = 80;
  testCheckout.scan("apple");
  testCheckout.scan("banana");
  // ACT
  const checkoutTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutTotal).toBe(expected);
});

test("checkout can calculate the total price of items, including multiples of the same item", () => {
  //ARRANGE
  const expected = 194;
  testCheckout.scan("apple");
  testCheckout.scan("banana");
  testCheckout.scan("banana");
  testCheckout.scan("banana");
  testCheckout.scan("kiwi");
  // ACT
  const checkoutTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutTotal).toBe(expected);
});

test("If I scan enough of the same items that are on a multibuy, calculateMultibuyDiscount returns the amount to be deducted", () => {
  //ARRANGE
  const expectedDiscount = 20;
  // ACT
  const checkoutDiscountedTotal = testCheckout.calculateMultibuyDiscount("kiwi", 3);
  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expectedDiscount);
});

test("Discount is accurately calculated for items when more than the multibuy quantity are bought", () => {
  //ARRANGE
  const expectedDiscount = 20;
  // ACT
  const checkoutDiscountedTotal = testCheckout.calculateMultibuyDiscount("kiwi", 5);
  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expectedDiscount);
})

test("Discount is accurately calculated for items when multiples of the multibuy quantity are bought", () => {
  //ARRANGE
  const expectedDiscount = 40;
  // ACT
  const checkoutDiscountedTotal = testCheckout.calculateMultibuyDiscount("kiwi", 6);
  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expectedDiscount);
})


/*xtest("checkout throws an error if an item is not found in pricing rules", () => {
  //ARRANGE
  testCheckout.scan("unknownItem");
  const expectedErrorMessage = "unknownItem not found in database. Please contact a staff member."
  //ACT
  const checkoutUnknownItem = () => testCheckout.calculateTotal();
  //ASSERT
  expect(checkoutUnknownItem).toThrow(expectedErrorMessage)
})*/

test("scan does not add items to the basket if they do not exist in the pricing rules", () => {
  //ARRANGE
  const expectedBasket = {}
  //ACT
  testCheckout.scan("unknown item");
  //ASSERT
  expect(testCheckout.basket).toEqual(expectedBasket)
})

test("checkout disregards items not in pricing rules and allows user to continue scanning items", () => {
  //ARRANGE
  const expectedBasket = {kiwi: 1}
  //ACT
  testCheckout.scan("unknown item");
  testCheckout.scan("kiwi");
  //ASSERT
  expect(testCheckout.basket).toEqual(expectedBasket)
})