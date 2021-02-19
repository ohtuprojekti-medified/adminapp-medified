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

import { Auth } from 'aws-amplify'

const testUsername = Cypress.env('USERNAME')
const testPassword = Cypress.env('PASSWORD')
const react_app_user_pool_id = Cypress.env('REACT_APP_USER_POOL_ID')
const react_app_web_client_id = Cypress.env('REACT_APP_WEB_CLIENT_ID')
//const react_app_authentication_type = Cypress.env('REACT_APP_AUTHENTICATION_TYPE')

const AWSConfig = {
  aws_user_pools_id: react_app_user_pool_id,
  aws_user_pools_web_client_id: react_app_web_client_id
}
Auth.configure(AWSConfig)

Cypress.Commands.add('login', () => {
  cy.then(() => Auth.signIn(testUsername, testPassword)).then((cognitoUser) => {
    const idToken = cognitoUser.signInUserSession.idToken.jwtToken
    const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken

    const makeKey = (name) => `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`
    window.localStorage.setItem(makeKey('accessToken'), accessToken)
    window.localStorage.setItem(makeKey('idToken'), idToken)
    window.localStorage.setItem(
      `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
      cognitoUser.username
    )
  })
})


Cypress.Commands.add('logOut', async () => {
  try {
    await Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
})