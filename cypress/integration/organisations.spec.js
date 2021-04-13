/**
 * Cypress tests for organisations filter
 *
 * @module cypress/integration/organisations_spec
 * @requires cypress
 */

/**
 * Describe tests for organisations filter
 *
 * @name Organisations
 * @type {object}
 * @memberof module:cypress/integration/organisations_spec
 * @inner
 * @param {string} describe - Organisations
 * @param {object} tests - Test code
 */
describe('Organisations', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.loginAdmin()
  })

  /**
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that organisations filter exists
   *
   * @name Organisations_filter_exists
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisations filter exists
   * @param {object} testFunction - Function that runs test
   */
  it('organisations filter exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Filter').click()
    cy.contains('OHTU')
  })

  /**
   * Test that data can be filtered by organisation
   *
   * @name Organisations_filter_select
   * @type {object}
   * @memberof module:cypress/integration/organisations_spec
   * @inner
   * @param {string} describe - organisations can be selected
   * @param {object} testFunction - Function that runs test
   */
  it('organisations can be selected', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Application users: 110')
    cy.contains('Application users: 110')
    cy.contains('Application users: 110')

  })

})