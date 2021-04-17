/**
 * Tests for LoginForm component
 *
 * @module src/components/LoginForm_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires src/components/LoginForm
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

/**
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:src/components/LoginForm_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<LoginForm />', () => {
  let component, formWithMock
  let usernameInput, passwordInput, loginForm
  let username, password
  let mockSetUser, mockSetUsername, mockSetPassword

  // Test users username and password
  const testUsername = 'FormUser'
  const testPassword = 'PasswordInForm'

  /**
   * Render Loginform, select items from it and create mocks for its functions before each test
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<LoginForm />)

    usernameInput = component.container.querySelector('input[type=\'text\']')
    passwordInput = component.container.querySelector('input[type=\'password\']')
    loginForm = component.container.querySelector('form')

    // Mock-functions for Form
    mockSetUser = jest.fn()
    mockSetUsername = jest.fn()
    mockSetPassword = jest.fn()

    // Form with mock-functions
    formWithMock = render(
      <LoginForm username={username} setUsername={mockSetUsername} password={password}
        setPassword={mockSetPassword} setUser={mockSetUser} />
    )
  })

  /**
   * Test that LoginForm is rendered
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {string} description - Renders form
   * @param {object} TestCode - Code that runs the test
   */
  test('renders form', () => {
    expect(component.container).toHaveTextContent('Login')
    expect(component.container).toHaveTextContent('username:')
    expect(component.container).toHaveTextContent('password:')
    expect(component.container).toHaveTextContent('login')
  })

  /**
   * Test that submitting LoginForm calls setUser function
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {string} description - submitting form calls setUser
   * @param {object} TestCode - Code that runs the test
   */
  test('submitting form calls setUser', async () => {
    const mockUsernameInput = formWithMock.container.querySelector('input[type=\'text\']')
    const mockPasswordInput = formWithMock.container.querySelector('input[type=\'password\']')
    const mockLoginForm = formWithMock.container.querySelector('form')
    // Add username and password to input fields
    fireEvent.change(mockUsernameInput, {
      target: { value: testUsername }
    })
    fireEvent.change(mockPasswordInput, {
      target: { value: testPassword }
    })

    fireEvent.submit(mockLoginForm)
    await waitFor(() => expect(mockSetUser.mock.calls).toHaveLength(1))
  })

  /**
   * Test that logging in renders logout-button
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {string} description - logging in renders logout-button
   * @param {object} TestCode - Code that runs the test
   */
  test('logging in renders logout-button', async () => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)

    waitFor(() => expect(component.container.toHaveTextContent('logOut')))
  })

  /**
   * Test that logout-button is not shown in the beginning
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {string} description - logout-button is not shown in the beginning
   * @param {object} TestCode - Code that runs the test
   */
  test('logout-button is not shown in the beginning', async () => {
    waitFor(() => expect(component.container.not.toHaveTextContent('logOut')))
  })

  /**
   * Test that logging out renders login-form
   *
   * @type {object}
   * @function
   * @memberof module:src/components/LoginForm_test
   * @inner
   * @param {string} description - logging out renders login-form
   * @param {object} TestCode - Code that runs the test
   */
  test('logging out renders login-form', async () => {
    // Add username and password to form
    fireEvent.change(usernameInput, {
      target: { value: username }
    })
    fireEvent.change(passwordInput, {
      target: { value: password }
    })
    // Submit the form
    fireEvent.submit(loginForm)

    const logOutButton = component.container.querySelector('button[id=\'logOut\']')
    waitFor(() => fireEvent.click(logOutButton))

    waitFor(() => {
      expect(component.container).toHaveTextContent('Login:')
      expect(component.container).toHaveTextContent('username:')
      expect(component.container).toHaveTextContent('password:')
      expect(component.container).toHaveTextContent('login')
    })
  })
})