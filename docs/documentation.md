# tax-calculator documentation

Provides how-to-use for each endpoints
| ***Endpoints*** | ***Method*** | ***Description*** |
|-----------------|:------------:|-------------------|
|`/`              | `GET`        | GUI for test/try other enpoints |
|`/calc`          | `GET`        | Get bill info (product and tax) stored in DB |
|`/calc`          | `POST`       | Save bill into DB |
|`/calc/count`    | `GET`        | Get tax and total amount |
|`/types`         | `GET`        | Get tax type and tax code |

### `GET '/'`
Not an API endpoint. Serves as GUI for testing all APIs endpoint's except insert multiple bills.


### `GET '/calc'`
- This endpoint accept neither data nor params.
- Response example:
```JSON
{
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Lucky Stretch",
        "tax_code": 2,
        "type": "Tobacco",
        "amount": 1000,
        "tax_amount": 100,
        "total_amount": 1100
      },
      {
        "id": 2,
        "name": "Big Mac",
        "tax_code": 1,
        "type": "Food",
        "amount": 1000,
        "tax_amount": 20,
        "total_amount": 1020
      },
      {
        "id": 3,
        "name": "Movie",
        "tax_code": 3,
        "type": "Entertainment",
        "amount": 150,
        "tax_amount": 0.5,
        "total_amount": 150.5
      }
    ],
    "total_amount": 2150,
    "total_tax_amount": 120.5,
    "grand_total": 2270.5,
    "row_count": 3
  },
  "status": "ok",
  "error": null
}
```

### `POST '/calc'`
| Param | Value | Desc |
|-------|-------|------|
|`multi`| `boolean` | `false` if only insert single bill. `true` if more than one |

- This endpoint is for insert bill data into database
- Support insert both single and multiple bills insert. Just differentiate in its param `multi`
  - Single insert. Include all value inside following table as part of request data/body.
  - Multiple insert. The needed data is similar with single insert. Just wrap the (multiple) data inside an array, and send under value/property `data`
- Note: all field must be filled

| Body       | Value    | Desc |
|------------|----------|------|
| `name `    | `string` | Product name |
| `tax_type` | `int`    | Tax type code |
| `amount`   | `int`    | Amount / product price |

- Response example
  - Single
  ```JSON
  {
    "data": {
      "name": "Coffee",
      "tax_code": "1",
      "amount": "99"
    },
    "status": "ok",
    "error": null
  }
  ```

  - Multiple
  ```JSON
  {
    "data": {
      "row_count": 3
    },
    "status": "ok",
    "error": null
  }
  ```


### `GET '/calc/count'`
| Param | Value | Desc |
|-------|-------|------|
| `amount` | `int` | Product amount/price |
| `type`   | `int` | Tax type code |

- To get tax aomunt
- All param must be defined
- Response example:
```JSON
{
  "tax": 100,
  "total": 1100
}
```

### `GET '/type'`
- To get list of available tax types and codes
- Accept neither params nor data
- Response example:
```JSON
{
  "1": "Food",
  "2": "Tobacco",
  "3": "Entertainment"
}
```
