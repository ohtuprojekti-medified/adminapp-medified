/**
 * Config for retrieving environment variables for app
 *
 * @module utils/config
 * @requires dotenv
 */

require('dotenv').config()

/**
 * Port where backend is running
 *
 * @type {string}
 * @constant
 * @namespace PORT
 */
const PORT = process.env.PORT || '5000'

// DB URI:s
/*const DB_URI = undefined
const TEST_DB_URI = undefined*/

const db_host = process.env.DB_HOST
const db_name = 'adminapp'


/**
 * Username for database
 *
 * @type {string}
 * @constant
 * @namespace DB_USERNAME
 */
const db_user = process.env.DB_USERNAME

/**
 * Password for database
 *
 * @type {string}
 * @constant
 * @namespace DB_PASSWORD
 */
const db_password = process.env.DB_PASSWORD
const dialect = 'postgres'
const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}

/**
 * User directory in Amazon cognito services
 *
 * @type {string}
 * @constant
 * @namespace REACT_APP_USER_POOL_ID
 */
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