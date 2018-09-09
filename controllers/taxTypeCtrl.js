'use strict'

const { types } = require('../models/constants')

exports.getTypes = (req, res) => {
  // return types
  res.send(types)
}
