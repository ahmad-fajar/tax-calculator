'use strict'

const { Client } = require('pg')
const { dbCfg } = require('../config/db')

const tc = require('../utils/taxCalculator')

const { types } = require('../models/constants')

const client = new Client(dbCfg)
client.connect()

// get all bill information
exports.getAll = (req, res) => {
  client.query('SELECT * FROM bills')
  .then(rows => {
    // console.log(rows.rows)
    res.send(rows.rows)
  })
  .catch(e => {
    console.log(e)
  })
}


// input bill 
exports.inputBill = (req, res) => {
  let { name, tax_code ,type } = req.body
  let amount = +req.body.amount
  let tax_amount = tc.Calculator(tax_code, amount)
  let total_amount = amount + tax_amount

  let query = {
    name: 'input-bills',
    text: `INSERT INTO bills("name", "tax_code", "type", "amount", "tax_amount", "total_amount") VALUES($1, $2, $3, $4, $5, $6);`,
    values: [name, tax_code, types[tax_code], amount, tax_amount, total_amount]
  }
  client.query(query)
  .then(() =>res.send('OK'))
  .catch(e => {
    console.log(e)
  })
}
