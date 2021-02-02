import { scryRenderedComponentsWithType } from "react-dom/test-utils"

describe('Login', () => {
    it('dissappears after logged in', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Adminapp for monitoring moods')
    })
})