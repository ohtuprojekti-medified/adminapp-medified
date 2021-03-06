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

/**
 * Add helpful functions for testing
 *
 * @module cypress/support/commands
 * @requires cypress
 * @requires aws-amplify
 */

import { Auth } from 'aws-amplify'

/**
 * Retrieve username from enviromment variables for logging in
 *
 * @name testUsername
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} username - Retrieve username from environment variables
 */
const testUsername = Cypress.env('USERNAME')

/**
 * Retrieve password from enviromment variables for logging in
 *
 * @name testPassword
 * @function
 * @constant
 * @memberof module:cypress/integration/login_spec
 * @inner
 * @param {string} username - Retrieve password from environment variables
 */
const testPassword = Cypress.env('PASSWORD')
const react_app_user_pool_id = 'eu-west-1_sAj8nsLY6'
const react_app_web_client_id = '57bgrf7014uhtdu95jm8ci2ok5'
//const react_app_authentication_type = 'USER_PASSWORD_AUTH'

/**
 * Set nessessary params into config for AWS authentication request
 *
 * @constant
 */
const AWSConfig = {
  aws_user_pools_id: react_app_user_pool_id,
  aws_user_pools_web_client_id: react_app_web_client_id
}

/**
 * Configure AWS-requests
 *
 * @function
 * @param {object} AWSConfig - Config with params for AWS
 */
Auth.configure(AWSConfig)

/**
 * Add function for fast login to AWS without using UI
 *
 * @function
 * @param {string} name - Name of the login function
 * @param {object} login - Function that logs in
 */
Cypress.Commands.add('login', () => {
  cy.then(() => Auth.signIn(testUsername, testPassword)).then((cognitoUser) => {
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(cognitoUser)
    )
    cy.visit('http://localhost:3000')
  })
})

/**
 * Add function for fast logout to AWS without using UI
 *
 * @function
 * @param {string} name - Name of the logout function
 * @param {object} login - Function that logs out
 */
Cypress.Commands.add('logOut', async () => {
  try {
    await Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
})