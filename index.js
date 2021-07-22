// I want to scan a product to know its price //
// I want to scan many products to know their total price //
// I want discounts to be applied if there are multibuy offers,
// when the total is finally calculated.
// https://freesoft.dev/program/113094459

// We need to be able to pass in a set of pricing rules each time
// we start handling a checkout transaction.

// SKU Unit Price Special Price
// A 50 3 for 130
// B 30 2 for 45
// C 20
// D 15

// The pricing structure should be separate from the checkout (and passed in)

let scannedItems = {};

let pricingRules = [
  {
    item: "kiwi",
    quantity: 3,
    discount: -20,
  },
];

const clearBasket = () => {
  scannedItems = {};
};

const applyAnyDiscounts = () => {
  // loop through the scanned items object keys,
  // if one of the keys is in the pricingRules,
  // we want to count the number of scans to see if it meets the discount
};

const unitPricingChart = {
  kiwi: 50,
  banana: 32,
  apple: 48,
};

const scan = (item) => {
  let value = unitPricingChart[item];

  scannedItems[item] = ++scannedItems[item] || 1;

  console.log("Scanned items", scannedItems);
  return value;
};

const calculateTotal = () => {
  return scannedItems.reduce((acc, cur) => {
    return (acc += cur);
  });
};

module.exports = { scan, calculateTotal, clearBasket, applyAnyDiscounts };
