// I want to scan a product to know its price
// I want to scan many products to know their total price
// I want discounts to be applied if there are multibuy offers, when the total is finally calculated

// SKU Unit Price Special Price
// A 50 3 for 130
// B 30 2 for 45
// C 20
// D 15

// The pricing structure should be separate from the checkout (and passed in)

// ARRANGE / ACT / ASSERT

const {
  scan,
  calculateTotal,
  clearBasket,
  applyAnyDiscounts,
} = require("./index");

afterEach(() => {
  clearBasket();
});

test("I want to scan a product to know its price", () => {
  // ARRANGE
  const expected = 32;

  // ACT
  const checkoutScan = scan("banana");

  // ASSERT
  expect(checkoutScan).toBe(expected);
});

test("I want to scan a different product to know its price", () => {
  // ARRANGE
  const expected = 48;

  // ACT
  const checkoutScan = scan("apple");

  // ASSERT
  expect(checkoutScan).toBe(expected);
});

test("If I scan 2 items, the checkout tells me the total price", () => {
  //ARRANGE
  const expected = 80;
  scan("apple");
  scan("banana");

  // ACT
  const checkoutTotal = calculateTotal();

  // ASSERT
  expect(checkoutTotal).toBe(expected);
});

test("If I scan enough of the same items that are on a multi-buy, the discount is applied", () => {
  // ARRANGE
  const expected = 130;
  scan("kiwi");
  scan("kiwi");
  scan("kiwi");
    
  // ACT
  const checkoutDiscountedTotal = applyAnyDiscounts();

  // ASSERT
  expect(checkoutDiscountedTotal).toBe(expected);
});
