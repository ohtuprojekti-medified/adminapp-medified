/**.
 * Cypress tests for weekly improvement chart
 *
 * @module cypress/integration/WeeklyImprovement_spec
 * @requires cypress
 */

/**.
 * Describe tests for weekly improvement chart
 *
 * @memberof module:cypress/integration/WeeklyImprovement_spec
 * @param {string} describe - Weekly improvement
 * @param {Function} tests - Test code
 */
describe('Weekly improvement', function () {
  /**.
   * Log in fast before each test
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {Function} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**.
   * Log out fast after each test
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {Function} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that WeeklyImprovement page exists
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists
   * @param {Function} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })
  /**.
   * Test that WeeklyImprovement page exists after checking only patients with caregiver
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after checking only patients with caregiver
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })

  /**.
   * Test that WeeklyImprovement page exists after selecting start date
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after selecting start date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })

  /**.
   * Test that WeeklyImprovement page exists after selecting end date
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after selecting end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('Filter').click()
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })

  /**.
   * Test that WeeklyImprovement page exists after selecting start date and end date
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after selecting start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date and end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })

  /**.
   * Test that WeeklyImprovement page exists after checking only patients with caregivers, start date and end date
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after selecting only patients with caregiver start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers, start date and end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })

  /**.
   * Test that WeeklyImprovement page exists after changing by using period to by date
   *
   * @memberof module:cypress/integration/WeeklyImprovement_spec
   * @inner
   * @param {string} describe - exists after changing by using period to by date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after clicking by using period', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
    cy.contains('by using period')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Weekly Improvement')
  })
})