'use strict'

const { types } = require('../models/constants')

// just return tax types
exports.getTypes = (req, res) => {
  // return types
  res.send(types)
}
