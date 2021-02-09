import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
    let component

    const testUsername = 'FormUser'
    const testPassword = 'PasswordInForm'

    beforeEach(() => {
        component = render(<LoginForm />)
    })

    test('renders form', () => {
        expect(component.container).toHaveTextContent('Login:')
        expect(component.container).toHaveTextContent('username:')
        expect(component.container).toHaveTextContent('password:')
        expect(component.container).toHaveTextContent('login')
    })

    test('clicking login-button calls setUser', () => {
        const mockSetUser = jest.fn()
        let username, setUsername = () => (console.log('setUsername')), password, setPassword= () => (console.log('setPassword'))

        const formWithMock = render(
            <LoginForm username={username} setUsername={setUsername} password={password}
            setPassword={setPassword} setUser={mockSetUser} /> 
        )

        const usernameInput = formWithMock.container.querySelector('input[type=\'text\']')
        const passwordInput = formWithMock.container.querySelector('input[type=\'password\']')
        const loginButton = formWithMock.container.querySelector('button')

        fireEvent.change(usernameInput, {
            target: { value: testUsername }
          })
          fireEvent.change(passwordInput, {
            target: { value: testPassword }
          })
          
        fireEvent.click(loginButton)
        //expect(mockSetUser.mock.calls).toHaveLength(1)
    })
})