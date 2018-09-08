'use strict'

const express = require('express')

const app = express()
const port = 3000

const taxCalc = require('./routes/taxCalcRoutes')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/calc', taxCalc)

app.listen(port, (e) => {
  if (!e) console.log(`>>> App running at port ${port}...`)
  else console.log('>>> Error running app...')
})
