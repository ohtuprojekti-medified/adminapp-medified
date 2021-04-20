describe('MoodAverage chart', function () {
  beforeEach(function () {
    cy.login()
  })

  afterEach(function () {
    cy.logOut()
  })

  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })
})