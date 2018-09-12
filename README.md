# tax-calculator
Simple, basic app to calculate tax based on amount and product tax type.

### Endpoints
| ***Endpoints*** | ***Method*** | ***Description*** |
|-----------------|:------------:|-------------------|
|`/calc`          | `GET`        | Get bill info (product and tax) stored in DB |
|`/calc`          | `POST`       | Save bill into DB |
|`/calc/count`    | `GET`        | Get tax and total amount |
|`/types`         | `GET`        | Get tax type and tax code |

For how to use each endpoint, please refer to docs located at `/docs`


### How to use

#### Prequisites
This app run on Node.js and use Postgres for database.
If you wish to run it on docker, please make sure you have Docker and Docker-compose installed.


#### Node
- Clone the repo.
- On project root, install dependencies by typing `npm install`
- Before running the app, adjust DB connection setting since its configured for docker. The configuration for this app is stored at `/config/db.js`
- If you running for first time and the needed table aren't exist yet, you can create it by executing `node db_setup.js`
- Run the apps bby type following:
  - Run main program `npm start`
  - Run test `npm test`
- App now run on `localhost:3000`


#### Docker
- Clone the repo
- `cd` to project root
- Build by typing `docker build -t tax-calculator .`
- Run by typing `docker-compose up` or `docker-compose start`
- App now run on `localhost:3000`
