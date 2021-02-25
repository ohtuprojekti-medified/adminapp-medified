require('dotenv').config()

const PORT = process.env.PORT || '5000'

// DB URI:s
/*const DB_URI = undefined
const TEST_DB_URI = undefined*/

const REACT_APP_USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;

module.exports = {
  PORT,
  REACT_APP_USER_POOL_ID
  //  DB_URI,
  //  TEST_DB_URI
}