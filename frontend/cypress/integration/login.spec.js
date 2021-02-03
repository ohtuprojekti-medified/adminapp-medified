describe('Login', function () {
  it('dissappears after logged in', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Adminapp for monitoring moods')
  })
})