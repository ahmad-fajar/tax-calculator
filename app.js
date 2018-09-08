'use strict'

const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))

const taxCalc = require('./routes/taxCalcRoutes')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/calc', taxCalc)

app.listen(port, (e) => {
  if (!e) console.log(`>>> App running at port ${port}...`)
  else console.log('>>> Error running app...')
})
