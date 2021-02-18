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

Cypress.Commands.add('login', async credentials => {
  let user
  try {
    user = await Auth.signIn(credentials.username, credentials.password)
  } catch (error) {
    console.log('error signing in', error)
  }
  localStorage.setItem(
    'loggedUser', JSON.stringify(user.user)
  )
})

Cypress.Commands.add('logOut', async () => {
  try {
    await Auth.signOut()
    window.localStorage.clear()
  } catch (error) {
    console.log('error signing out', error)
  }
})