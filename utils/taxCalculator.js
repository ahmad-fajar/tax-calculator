'use strict'

/** Tax codes/ types
 * Please refer to /models/constants.js for tax codes - types
 */

exports.calculator = (code, amount) => {
  let calc = {
    1: foodTax(amount),
    2: tobaccoTax(amount),
    3: entertainmentTax(amount)
  }

  return calc[code]
}

function foodTax(amount) {
  // 10% of value
  return amount * 0.1;
}

function tobaccoTax(amount) {
  // 10 + (2% of value )
  if (amount > 10) return amount * 0.02
  else return 0
}

function entertainmentTax(amount) {
  // 0 < value < 100: tax-free
  if (amount > 0 && amount < 100) {
    return 0
  } else {
    return (amount - 100) * 0.01
  }
}
