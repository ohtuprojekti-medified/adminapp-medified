// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**.
 * Add helpful functions for testing
 *
 * @module cypress/support/commands
 * @requires cypress
 * @requires aws-amplify
 */

import { Auth } from 'aws-amplify'

/**.
 * Retrieve username from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**.
 * Retrieve password from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')

/**.
 * Retrieve admin username from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/support/commands
 * @param {string} username - Retrieve username from environment variables
 */
const testAdminUsername = Cypress.env('ADMIN_USERNAME')

/**.
 * Retrieve admin password from enviromment variables for logging in
 *
 * @type {string}
 * @constant
 * @memberof module:cypress/support/commands
 * @param {string} username - Retrieve password from environment variables
 */
const testAdminPassword = Cypress.env('ADMIN_PASSWORD')

const react_app_user_pool_id = 'eu-west-1_sAj8nsLY6'
const react_app_web_client_id = '57bgrf7014uhtdu95jm8ci2ok5'
//const react_app_authentication_type = 'USER_PASSWORD_AUTH'

/**.
 * Set nessessary params into config for AWS authentication request
 *
 * @type {object}
 * @constant
 */
const AWSConfig = {
  aws_user_pools_id: react_app_user_pool_id,
  aws_user_pools_web_client_id: react_app_web_client_id
}

/**.
 * Configure AWS-requests
 *
 *
 * @param {object} AWSConfig - Config with params for AWS
 */
Auth.configure(AWSConfig)

/**.
 * Add function for fast login to AWS without using UI
 *
 * @param {string} name - Name of the login function
 * @param {Function} login - Function that logs in
 */
Cypress.Commands.add('login', () => {
  cy.then(() => Auth.signIn(testUsername, testPassword)).then((cognitoUser) => {
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(cognitoUser)
    )
    cy.visit('http://localhost:3000')
  })
})

/**.
 * Add function for fast admin login to AWS without using UI
 *
 * @param {string} name - Name of the login function
 * @param {Function} login - Function that logs in
 */
Cypress.Commands.add('loginAdmin', () => {
  cy.then(() => Auth.signIn(testAdminUsername, testAdminPassword)).then((cognitoUser) => {
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(cognitoUser)
    )
    cy.visit('http://localhost:3000')
  })
})

/**.
 * Add function for fast logout to AWS without using UI
 *
 * @param {string} name - Name of the logout function
 * @param {Function} login - Function that logs out
 */
Cypress.Commands.add('logOut', async () => {
  try {
    await Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
})