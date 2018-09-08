'use strict'

const { Client } = require('pg')
const { dbCfg } = require('./config/db')

const client = new Client(dbCfg)
client.connect()

const query = 'CREATE TABLE bills(id SERIAL PRIMARY KEY, name VARCHAR(25) NOT NULL, tax_code INT, type VARCHAR(25), amount FLOAT NOT NULL, tax_amount FLOAT, total_amount FLOAT)'

client.query(query)
.then(res => {
  if (res) console.log('DB created')
})
.catch(e => {
  console.log(e)
})
.then(() => {
  client.end()
})
