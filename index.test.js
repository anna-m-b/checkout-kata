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

test("testCheckout.scan should add item and quantity to the testCheckout.scannedItemsQuantity object", () => {
  // ARRANGE
  const expected = {banana: 1}
  // ACT
  testCheckout.scan("banana");
  // ASSERT
  expect(testCheckout.basket).toEqual(expected);
});

test("scan can handle multiple items", () => {
  // ARRANGE
  const expected = {apple: 2, banana: 1}
  // ACT
 testCheckout.scan("apple");
 testCheckout.scan("banana");
 testCheckout.scan("apple");
  // ASSERT
  expect(testCheckout.basket).toEqual(expected);
});

test("If I scan 2 items, the checkout tells me the total price", () => {
  //ARRANGE
  const expected = 80;
  testCheckout.scan("apple");
  testCheckout.scan("banana");
  // ACT
  const checkoutTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutTotal).toBe(expected);
});

test("If I scan multiple items, the checkout tells me the total price", () => {
  //ARRANGE
  const expected = 162;
  testCheckout.scan("apple");
  testCheckout.scan("banana");
  testCheckout.scan("banana");
  testCheckout.scan("kiwi");
  // ACT
  const checkoutTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutTotal).toBe(expected);
});

test("If I scan enough of the same items that are on a multi-buy, the discount is applied", () => {
  // ARRANGE
  const expected = 130;
  testCheckout.scan("kiwi");
  testCheckout.scan("kiwi");
  testCheckout.scan("kiwi");
  // ACT
  const checkoutDiscountedTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expected);
});

test("Discount is accurately applied to items when more than the multibuy quantity are bought", () => {
  //ARRANGE
  const expected = 180;
  testCheckout.scan("kiwi");
  testCheckout.scan("kiwi");
  testCheckout.scan("kiwi");
  testCheckout.scan("kiwi");
  // ACT
  const checkoutDiscountedTotal = testCheckout.calculateTotal();
  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expected);
})

test("checkout handles case of item missing from pricing rules gracefully", () => {
  //ARRANGE
  testCheckout.scan("unknownItem");
  //ACT
  const checkoutUnknownItem = testCheckout.calculateTotal();
  //ASSERT
  console.log(checkoutUnknownItem)
})
