/**
 * Cypress tests for MoodAverage chart
 *
 * @module cypress/integration/moodAverage_spec
 * @requires cypress
 */

/**
 * Describe tests for mood average page
 *
 * @name MoodAverage
 * @type {object}
 * @memberof module:cypress/integration/moodAverage_spec
 * @param {string} describe - MoodAverage chart
 * @param {object} tests - Test code
 */
describe('MoodAverage chart', function () {

  /**
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/moodAverage_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/moodAverage_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**
   * Test that mood average page exists
   *
   * @name MoodAverage_exists
   * @type {object}
   * @memberof module:cypress/integration/moodAverage_spec
   * @inner
   * @param {string} describe - exists
   * @param {object} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })
})