/**.
 * Cypress tests for AverageMoodWeekly chart
 *
 * @module cypress/integration/AverageMoodWeekly_spec
 * @requires cypress
 */

/**.
 * Describe tests for mood average page
 *
 * @memberof module:cypress/integration/AverageMoodWeekly_spec
 * @param {string} describe - AverageMoodWeekly chart
 * @param {Function} tests - Test code
 */
describe('MoodAverage chart', function () {

  /**.
   * Log in fast before each test
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {Function} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**.
   * Log out fast after each test
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {Function} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that mood average page exists
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists
   * @param {Function} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after checking only patients with caregiver
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after checking only patients with caregiver
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after selecting start date
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after selecting start date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after selecting end date
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after selecting end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('Filter').click()
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after selecting start date and end date
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after selecting start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date and end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after checking only patients with caregivers, start date and end date
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after selecting only patients with caregiver start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers, start date and end date in filters', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })

  /**.
   * Test that Average mood weekly page exists after changing by using period to by date
   *
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {string} describe - exists after changing by using period to by date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after clicking by using period', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
    cy.contains('by using period').click()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Average mood weekly')
  })
})