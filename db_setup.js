'use strict'

const { Client } = require('pg')
const { dbCfg } = require('./config/db')

const client = new Client(dbCfg)
client.connect()
.then(() => console.log('>>> connected...'))
.catch(e => console.log('>>> connection error\n', e.stack))

const createDB = 'CREATE TABLE bills(id SERIAL PRIMARY KEY, name VARCHAR(25) NOT NULL, tax_code INT NOT NULL, type VARCHAR(25) NOT NULL, amount FLOAT NOT NULL, tax_amount FLOAT NOT NULL, total_amount FLOAT NOT NULL)'

const seed = `INSERT INTO bills("name", "tax_code", "type", "amount", "tax_amount", "total_amount") VALUES('Lucky Stretch', 2, 'Tobacco', 1000, 100, 1100), ('Big Mac', 1, 'Food', 1000, 20, 1020), ('Movie', 3, 'Entertainment', 150, 0.5, 150.5);`

client.query(createDB)
.then(res => {
  if (res) {
    console.log('table created')
    console.log('seeding...')
    client.query(seed)
    .then(r => {
      if (r) console.log('seed inserted')
      console.log('done')
      client.end()
    })
    .catch(() => console.log('seed failed'))
  }
})
.catch(e => {
  console.log(e.stack)
  client.end()
})
