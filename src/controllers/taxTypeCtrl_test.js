'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect

const app = require('../../app')

chai.use(chaiHttp)

const request = chai.request(app).keepOpen()

const { types } = require('../models/constants')

// endpoint: '/type'
// type: GET
// function: getTypes()
describe('controller: taxTypeCtrl.getTypes', () => {
  describe("GET '/type'", () => {
    it('get tax types', done => {
      request
      .get('/type')
      .end((err, res) => {
        expect(res.body).to.eql(types)
        done()
      })
    })
  })
})
