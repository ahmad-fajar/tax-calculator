'use strict'

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json({ type: 'application/x-www-form-urlencoded' }))

const taxCalc = require('./routes/taxCalcRoutes')
const taxTypes = require('./routes/taxTypesRoutes')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/calc', taxCalc)
app.use('/type', taxTypes)

app.listen(port, (e) => {
  if (!e) console.log(`>>> App running at port ${port}...`)
  else console.log('>>> Error running app...')
})
