'use strict'

const { Client } = require('pg')
const { dbCfg } = require('../config/db')

const tc = require('../utils/taxCalculator')

const { types } = require('../models/constants')

const client = new Client(dbCfg)
client.connect()

// get all bill information
exports.getAll = (req, res) => {
  let result = {
    data: [],
    total_amount: 0,
    total_tax_amount: 0,
    grand_total: 0
  }

  client.query('SELECT * FROM bills')
  .then(rows => {
    rows.rows.forEach(r => {
      result.data.push(r)
      result.total_amount += r.amount
      result.total_tax_amount += r.tax_amount
      result.grand_total += r.total_amount
    })
    result.row_count = rows.rowCount

    // parse decimals to 2 digits
    result.total_tax_amount = parseFloat(result.total_tax_amount.toFixed(2))
    result.grand_total = parseFloat(result.grand_total.toFixed(2))

    res.send({
      data: result,
      status: 'ok',
      error: null
    })
  })
  .catch(e => {
    res.send({
      data: [],
      status: 'failed',
      error: e.stack
    })
  })
}


// save bill into db 
// handler for simgle or multiple insert into db
exports.inputBill = (req, res) => {
  if (req.query.multi === 'true') {
    return inputMultipleBills(req, res)
  } else {
    return inputSingleBill(req, res)
  }
}

// input single bill into db.
// accept parameters from req.body
// params:
//   name
//   tax_code
//   amount
let inputSingleBill = (req, res) => {
  let { name, tax_code } = req.body
  let amount = +req.body.amount
  let tax_amount = tc.calculator(+tax_code, amount)
  let total_amount = amount + tax_amount

  let query = {
    name: 'input-bills',
    text: `INSERT INTO bills("name", "tax_code", "type", "amount", "tax_amount", "total_amount") VALUES($1, $2, $3, $4, $5, $6);`,
    values: [name, tax_code, types[tax_code], amount, tax_amount, total_amount]
  }
  client.query(query)
  .then(() => {
    res.send({
      data: req.body,
      status: 'ok',
      error: null
    })
  })
  .catch(e => {
    res.send({
      data: req.body,
      status: 'failed',
      error: e.stack
    })
  })
}

// input multiple bills into db.
// accept json as input, and received from req.body.data
// properties for object within the json is the same as
// inputSingleBill method
let inputMultipleBills = (req, res) => {

  // parse JSON string into JSON
  let [ok, data] = (function(param) {
    try {
      return [true, JSON.parse(param)]
    } catch (err) {
      return [false, err]
    }
  })(req.body.data)

  // if bad JSON, abort process
  if (!ok) {
    res.send({
      data: {},
      status: 'failed',
      error: 'invalid json'
    })
  }

  // prepare values for multiple db input
  let [value, tax_amount, total_amount] = ['', 0, 0]
  let valuesStrArr = []
  data.forEach(d => {
    if (d.name === undefined || d.tax_code === undefined || d.amount === undefined) return
    tax_amount = tc.calculator(d.tax_code, d.amount)
    total_amount = +d.amount + +tax_amount
    value = `('${d.name}', ${d.tax_code}, '${types[d.tax_code]}', ${d.amount}, ${tax_amount}, ${total_amount})`
    valuesStrArr.push(value)
  })

  let query = `INSERT INTO bills("name", "tax_code", "type", "amount", "tax_amount", "total_amount") VALUES ${valuesStrArr.join(',')};`
  client.query(query)
  .then(rows => {
    res.send({
      data: {
        row_count: rows.rowCount
      },
      status: 'ok',
      error: null
    })

  })
  .catch(e => {
    res.send({
      data: 'e',
      status: 'failed',
      error: e.stack
    })
  })
}

exports.count = (req, res) => {
  let { amount, type } = req.query

  let tax = tc.calculator(parseInt(type), parseInt(amount))
  let total = +amount + +tax
  // console.log(`${amount} | ${tax} | ${total}`)

  res.send({
    // tax: tax,
    // total: total
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(parseFloat(total).toFixed(2))
  })
}
