'use strict'

const c = require('../controllers/taxCalcCtrl')
const router = require('express').Router()

router.get('/', c.taxCalc)

module.exports = router
