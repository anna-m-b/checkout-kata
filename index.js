// I want to scan a product to know its price
// I want to scan many products to know their total price
// I want discounts to be applied if there are multibuy offers, when the total is finally calculated

// SKU Unit Price Special Price
// A 50 3 for 130
// B 30 2 for 45
// C 20
// D 15

// The pricing structure should be separate from the checkout (and passed in)

let scannedItems = []

const clearBasket = () => {
    scannedItems = []
}

const unitPricingChart = {
    banana: 32,
    apple: 48
}

const scan = (item) => {
    let value = unitPricingChart[item]
    scannedItems.push(value)
    return value
}

const calculateTotal = () => {
    return scannedItems.reduce((acc, cur) => { return acc += cur })
}


module.exports = { scan, calculateTotal, clearBasket }