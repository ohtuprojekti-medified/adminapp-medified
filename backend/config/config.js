require('dotenv').config()

const PORT = process.env.PORT || '5000'

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const db_name = 'adminapp'
const dialect = 'postgres'
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}


module.exports = {
  PORT,
  db_host,
  db_user,
  db_password,
  username,
  password,
  db_name,
  dialect,
  pool,

}
