require('dotenv').config()

const PORT = process.env.PORT || '5000'

// DB URI:s
/*const DB_URI = undefined
const TEST_DB_URI = undefined*/

const db_host = process.env.DB_HOST
const db_name = 'adminapp'



const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const dialect = 'postgres'
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

const REACT_APP_USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID

module.exports = {
  PORT,
  REACT_APP_USER_POOL_ID,
  //  DB_URI,
  //  TEST_DB_URI,
  db_host,
  db_user,
  db_password,
  db_name,
  dialect,
  pool
}