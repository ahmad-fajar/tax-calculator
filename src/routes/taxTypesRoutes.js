'use strict'

const ctrl = require('../controllers/taxTypeCtrl')
const router = require('express').Router()

router.get('/', ctrl.getTypes)

module.exports = router
