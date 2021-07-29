// I want to scan a product to know its price //
// I want to scan many products to know their total price //
// I want discounts to be applied if there are multibuyQuantity offers,
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
// const unitPricingChart = {
//   //   kiwi: 50,
//   banana: 32,
//   apple: 48,
// };
//const calculateTotal = () => {
//   return scannedItems.reduce((acc, cur) => {
//     return (acc += cur);
//   });
// };
const pricingRules = [
  {
    item: "kiwi",
    price: 50,
    multibuyQuantity: 3,
    discount: 20,
  },
  {
    item: "banana",
    price: 32,
    multibuyQuantity: 1,
    discount: 0,
  },
  {
    item: "apple",
    price: 48,
    multibuyQuantity: 1,
    discount: 0,
  },
];

class checkout {
  constructor(pricingRules) {
    this.basket = {}
    this.pricingRules = pricingRules
    this.total = 0;
  }
  scan(item) {
    if (!this.findPricingRule(item)) {
      console.log(`${item} not found in pricing rules - please contact a staff member`)
      return;
    }
    this.basket[item] = ++this.basket[item] || 1;
  }
  calculateMultibuyDiscount(item, quantity) {
    const { multibuyQuantity, discount } = this.findPricingRule(item)
    let discountToApply = 0;
    while (quantity >= multibuyQuantity) {
      discountToApply += discount
      quantity -= multibuyQuantity
    }
    return discountToApply;
  }
  calculateTotal() {
    for (const [item, quantity] of Object.entries(this.basket)) {
      const discount = this.calculateMultibuyDiscount(item, quantity);
      this.total += this.findPricingRule(item).price * quantity - discount;
    }
    return this.total;
  }
 findPricingRule(item) {
    return this.pricingRules.find((rule) => rule.item == item)
  }
  clearBasket () {
    this.basket = {}
  }
}

// const clearBasket = () => {
//   basket = {};
// };

// const calculateMultibuyDiscount = (item, quantity) => {
//   const pricingRule = pricingRules.find((rule) => rule.item == item);
//   return pricingRule.multibuyQuantity === quantity ? pricingRule.discount : 0;
// };

// // const scan = (item) => {
// //   basket[item] = ++basket[item] || 1;
// //   console.log(basket)
// // };

// const calculateTotal = () => {
//   let total = 0;
//   for (const [item, quantity] of Object.entries(basket)) {
//     const discount = calculateMultibuyDiscount(item, quantity);
//     total +=
//       pricingRules.find((rule) => rule.item == item).price * quantity +
//       discount;
//   }
//   return total;
// };

module.exports = {
  checkout,
  pricingRules
};
