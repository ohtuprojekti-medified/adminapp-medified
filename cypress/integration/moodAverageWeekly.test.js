/**.
 * Cypress tests for AverageMoodWeekly chart
 *
 * @module cypress/integration/AverageMoodWeekly_spec
 * @requires cypress
 */

/**.
 * Describe tests for mood average page
 *
 * @name AverageMoodWeekly
 * @type {object}
 * @memberof module:cypress/integration/AverageMoodWeekly_spec
 * @param {string} describe - AverageMoodWeekly chart
 * @param {Function} tests - Test code
 */
describe('MoodAverage chart', function () {

  /**.
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {object} functionBeforeEach - Function to be run before each test
   */
  beforeEach(function () {
    cy.login()
  })

  /**.
   * Log out fast after each test
   *
   * @name afterEach
   * @type {object}
   * @memberof module:cypress/integration/AverageMoodWeekly_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that mood average page exists
   *
   * @name AverageMoodWeekly_exists
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_checking_only_patients_with_caregiver
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_selecting_start_date
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_selecting_end_date
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_selecting_start_date_and_end_date
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_checking_only_patients_with_caregivers_start_date_and_end_date
   * @type {object}
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
   * @name AverageMoodWeekly_exists_after_clicking_by_using_period
   * @type {object}
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