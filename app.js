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

const taxCalc = require('./src/routes/taxCalcRoutes') 
const taxTypes = require('./src/routes/taxTypesRoutes')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// view route
app.use('/view', express.static(__dirname + '/src/view'))

// api routes
app.use('/calc', taxCalc)
app.use('/type', taxTypes)

app.listen(port, (e) => {
  if (!e) console.log(`>>> App running at port ${port}...`)
  else console.log('>>> Error running app...')
})

// need to be imported for unit-test purpose
module.exports = app
