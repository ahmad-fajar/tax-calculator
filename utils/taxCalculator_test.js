'use strict'

const expect = require('chai').expect

const calc = require('./taxCalculator')


describe('taxCalculator: calculator', () => {
  const cases = [
    // [input: {code, amount}, expected]
    [{code: 1, amount: 100}, 10], [{code: 1, amount: 1000}, 100]
    , [{code: 2, amount: 10}, 0], [{code: 2, amount: 100}, 12], [{code: 2, amount: 1000}, 30]
    , [{code: 3, amount: 100}, 0], [{code: 3, amount: 101}, 0.01], [{code: 3, amount: 1000}, 9]
  ]

  it('should return tax amount', () => {
    var [code, amount, tax, expected] = [0, 0, 0, 0]
    for (var i = 0; i <= cases.length - 1; i++) {
      code = cases[i][0].code
      amount = cases[i][0].amount
      tax = calc.calculator(code, amount)
      expected = cases[i][1]

      expect(tax).to.be.equal(expected, `code: ${code} | amount: ${amount} | tax: ${tax}\n`)
    }
  })
})
