'use strict'

const tc = require('../controllers/taxCalcCtrl')
const router = require('express').Router()

router.get('/', tc.getAll)
router.post('/', tc.inputBill)

router.get('/count', tc.count)

module.exports = router
