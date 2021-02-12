require('dotenv').config()

const PORT = process.env.PORT || '5000'

// DB URI:s
/*const DB_URI = undefined
const TEST_DB_URI = undefined*/

let db_host, db_name

if(process.env.NODE_ENV === 'development') {
  db_host = process.env.DB_HOST
  db_name = 'adminapp'
} else if (process.env.NODE_ENV === 'test') {
  db_host = process.env.DB_TEST_HOST
  db_name = 'adminapptest'
}


const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const dialect = 'postgres'
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}


module.exports = {
  PORT,
  //  DB_URI,
  //  TEST_DB_URI,
  db_host,
  db_user,
  db_password,
  db_name,
  dialect,
  pool
}
