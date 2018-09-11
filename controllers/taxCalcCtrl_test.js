'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const should = require('chai').should()
const sinon = require('sinon')

const app = require('../app')

chai.use(chaiHttp)

const request = chai.request(app).keepOpen()

const { getAll, inputBill, inputMultipleBill } = require('./taxCalcCtrl')
const {
  resObj
  , getAllBodyResp
  , inputBills } = require('./taxCalcCtrl_fixture')


// endpoint: '/calc'
// type: GET
// function: getAll()
describe('controller: taxCalcCtrl.getAll', () => {

  describe('GET "/calc" not stubbed', () => {
    it('should return all bills data', done => {
      request
      .get('/calc')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.data.should.include.keys('data', 'grand_total', 'row_count', 'total_amount', 'total_tax_amount')
        res.body.data.data[0].should.include.keys('name', 'tax_code', 'type', 'amount', 'tax_amount', 'total_amount')
        done()
      })
    })
  })

  describe('GET "/calc" stubbed', () => {
    beforeEach(() => {
      this.get = sinon.stub(request, 'get')
    })
    afterEach(() => {
      request.get.restore()
    })
    it('should return all bills data', done => {
      this.get.yields(null, resObj, JSON.stringify(getAllBodyResp))

      request
      .get('/calc', (err, res, body) => {
        res.should.have.status(200)
        body = getAllBodyResp
        body.data.should.include.keys('data', 'grand_total', 'row_count', 'total_amount', 'total_tax_amount')
        body.data.data[0].should.include.keys('name', 'tax_code', 'type', 'amount', 'tax_amount', 'total_amount')
        done()
      })
    })
  })

})


// endpoint: '/calc/count'
// type: GET
// function: count
// param: { amount: int, type: int }
describe('controller: taxCalcCtrl.calc', () => {
  const cases = [
    // [amount, type, tax, total]
    [100, 1, {tax: 10, total: 110}]
    , [1000, 2, {tax: 30, total: 1030}]
    , [100, 3, {tax: 0, total: 100}]
    , [101, 3, {tax: 0.01, total: 101.01}]
    , [1000, 3, {tax: 9, total: 1009}]
  ]

  describe('GET "calc/count"', () => {
    it('should return with correct tax and total amount', done => {
      cases.forEach(c => {
        request
        .get('/calc/count')
        .query({ amount: c[0], type: c[1]})
        .end((err, res) => {
          expect(res.body).to.eql(c[2])
        })
      })
      done()
    })
  })

})


// endpoint: '/calc'
// type: POST
// function: inputBill()
// param: { multi: false }
describe('controller: taxCalcCtrl.inputBill', () => {
  let data = inputBills[0]

  describe('POST "/calc/?multi=false" not stubbed', () => {
    it('should return status: ok', done => {
      request
      .post('/calc')
      .query({ multi: 'false' })
      .send(data)
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body.status).to.equal('ok')
        expect(res.body.error).to.be.null
        expect(res.body.data).to.be.eql(data)
        done()
      })
    })
  })

  describe('POST "/calc/?multi=false" stubbed', () => {
    let inputBillResponse = {
      data,
      status: 'ok',
      error: null
    }
    beforeEach(() => {
      this.post = sinon.stub(request, 'post')
    })
    afterEach(() => {
      request.post.restore()
    })
    it('should return status: ok', done => {
      this.post.yields(null, resObj, JSON.stringify(inputBillResponse))

      request
      .post('/calc', { multi: 'false' }, (err, res, body) => {
        body = inputBillResponse
        res.should.have.status(200)
        expect(body.status).to.equal('ok')
        expect(body.error).to.be.null
        expect(body.data).to.be.eql(data)
        done()
      })
    })
  })

})


// endpoint: '/calc'
// type: POST
// function: inputMultipleBill()
// param: { multi: true }
describe('controller: taxCalcCtrl.inputMultipleBill', () => {
  let query = { multi: 'true' }
  let data = { data: JSON.stringify(inputBills) }

  describe('POST "/calc/?multi=true" not stubbed', () => {
    it('should return status: ok', done => {
      request
      .post('/calc')
      .query(query)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body.status).to.equal('ok')
        expect(res.body.error).to.be.null
        expect(res.body.data.row_count).to.equal(inputBills.length)
        done()
      })
    })
  })

  describe('POST "/calc/?multi=true" stubbed', () => {
    let inputMultiBillResponse = {
      data: {
        row_count: inputBills.length
      },
      status: 'ok',
      error: null
    }
    beforeEach(() => {
      this.post = sinon.stub(request, 'post')
    })
    afterEach(() => {
      request.post.restore()
    })
    it('should return status: ok', done => {
      this.post.yields(null, resObj, JSON.stringify(inputMultiBillResponse))

      request
      .post('/calc', { params: query, data: data }, (err, res, body) => {
        body = inputMultiBillResponse
        res.should.have.status(200)
        expect(body.status).to.equal('ok')
        expect(body.error).to.be.null
        expect(body.data.row_count).to.equal(inputBills.length)
        done()
      })
    })
  })

})
