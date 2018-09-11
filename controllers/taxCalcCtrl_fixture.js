/**
 * this file contains dummy response
 * for API endpoint testing
 */

exports.resObj = { statusCode: 200 }

exports.getAllBodyResp = {  
  "data":{  
      "data":[  
        {  
            "id":1,
            "name":"Lucky Stretch",
            "tax_code":2,
            "type":"Tobacco",
            "amount":1000,
            "tax_amount":100,
            "total_amount":1100
        },
        {  
            "id":2,
            "name":"Big Mac",
            "tax_code":1,
            "type":"Food",
            "amount":1000,
            "tax_amount":20,
            "total_amount":1020
        },
        {  
            "id":3,
            "name":"Movie",
            "tax_code":3,
            "type":"Entertainment",
            "amount":150,
            "tax_amount":0.5,
            "total_amount":150.5
        }
      ],
      "total_amount":2150,
      "total_tax_amount":120.5,
      "grand_total":2270.5,
      "row_count":3
  },
  "status":"ok",
  "error":null
}

exports.inputBills = [
  {
    "name":"Lucky Stretch",
    "tax_code":2,
    "amount":1000
  },
  {  
    "name":"Big Mac",
    "tax_code":1,
    "amount":1000
  },
  {  
    "name":"Movie",
    "tax_code":3,
    "amount":150
  }
]