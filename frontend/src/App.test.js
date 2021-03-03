/**
 * Tests for App component
 *
 * @module src/App_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/App
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import App from './App'

/**
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/App_test
 * @inner
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<App />', () => {
  let component
  let usernameInput, passwordInput, loginForm

  /**
   * @type {object}
   * @function
   * @constant
   * @memberof module:src/App_test
   * @inner
   * @param {string} username - Username for tests
   * @param {string} password - Password for tests
   */
  const login = (username, password) => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)
  }

  // Test users username and password
  const testUsername = 'TestUser'
  const testPassword = 'TestPassword'

  /**
   * Render App and select items from it before each test
   *
   * @type {object}
   * @function
   * @memberof module:src/App_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<App />)

    usernameInput = component.container.querySelector('input[type=\'text\']')
    passwordInput = component.container.querySelector('input[type=\'password\']')
    loginForm = component.container.querySelector('form')
  })

  /**
   * Test that header is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Renders header
   * @param {object} TestCode - Code that runs the test
   */
  test('renders header', () => {
    expect(component.container).toHaveTextContent('Adminapp for monitoring moods')
  })

  /**
   * Test that login form is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Renders login form
   * @param {object} TestCode - Code that runs the test
   */
  test('renders login form', () => {
    expect(component.container).toHaveTextContent('Login:')
    expect(component.container).toHaveTextContent('username:')
    expect(component.container).toHaveTextContent('password:')
  })

  /**
   * Test that App does not render login form after logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Does not render login form after logged in
   * @param {object} TestCode - Code that runs the test
   */
  test('does not render login form after logged in', async () => {
    login(testUsername, testPassword)

    waitFor(() => {
      expect(component.container).not.toHaveTextContent('Login:')
      expect(component.container).not.toHaveTextContent('username:')
      expect(component.container).not.toHaveTextContent('password:')
    })
  })

  /**
   * Test that App renders patients page after logged in
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Renders patients page after successful login
   * @param {object} TestCode - Code that runs the test
   */
  test('renders patients page after successful login', async () => {
    login(testUsername, testPassword)

    waitFor(() => expect(component.container).toHaveTextContent('Patients moods listed'))
  })

  /**
   * Test that App renders login form after log out
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Renders login form after log out
   * @param {object} TestCode - Code that runs the test
   */
  test('renders login form after log out', async () => {
    login(testUsername, testPassword)

    // Log out
    const logOutButton = component.container.querySelector('button[id=\'logOut\']')
    waitFor(() => fireEvent.click(logOutButton))

    waitFor(() => {
      expect(component.container).toHaveTextContent('Login:')
      expect(component.container).toHaveTextContent('username:')
      expect(component.container).toHaveTextContent('password:')
    })
  })

  /**
   * Test that logout-button is not shown in the beginning
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Logout-button is not shown in the beginning
   * @param {object} TestCode - Code that runs the test
   */
  test('logout-button is not shown in the beginning', async () => {
    waitFor(() => expect(component.container.not.toHaveTextContent('log out')))
  })

  /**
   * Test that App renders logout-button after successful login
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Renders logout-button after successful login
   * @param {object} TestCode - Code that runs the test
   */
  test('renders logout-button after successful login', async () => {
    login(testUsername, testPassword)

    waitFor(() => expect(component.container.toHaveTextContent('log out')))
  })

  /**
   * Test that logging out removes logout-button
   *
   * @type {object}
   * @function
   * @memberof module:src/components/App_test
   * @inner
   * @param {string} description - Logging out removes logout-button
   * @param {object} TestCode - Code that runs the test
   */
  test('logging out removes logout-button', async () => {
    login(testUsername, testPassword)

    // Log out
    const logOutButton = component.container.querySelector('button[id=\'logOut\']')
    waitFor(() => fireEvent.click(logOutButton))

    waitFor(() => expect(component.container.not.toHaveTextContent('log out')))
  })
})