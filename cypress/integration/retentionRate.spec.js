/**.
 * Cypress tests for retention rate
 *
 * @module cypress/integration/retentionRate_spec
 * @requires cypress
 */

/**.
 * Describe tests for retention rate page
 *
 * @name RetentionRate
 * @type {object}
 * @memberof module:cypress/integration/retentionRate_spec
 * @param {string} describe - Retention rate
 * @param {Function} tests - Test code
 */
describe('Retention rate', function () {

  /**.
   * Log in fast before each test
   *
   * @name beforeEach
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
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
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {object} functionAfterEach - Function to be run before each test
   */
  afterEach(function () {
    cy.logOut()
  })

  /**.
   * Test that retention rate page exists
   *
   * @name RetentionRate_exists
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists
   * @param {Function} testFunction - Function that runs test
   */
  it('exists', function () {
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Retention rates')
    cy.contains('Average using period is 20.73 days')
    cy.contains('Single periods:')
  })

  /**.
   * Test that retention rate page exists after checking only patients with caregiver
   *
   * @name RetentionRate_exists_after_checking_only_patients_with_caregiver
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after checking only patients with caregiver
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.contains('Adminapp for monitoring moods')
    cy.contains('Retention rates')
    cy.contains('Average using period is 31.25 days')
    cy.contains('Single periods:')
  })

  /**.
   * Test that retention rate page exists after selecting start date
   *
   * @name RetentionRate_exists_after_selecting_start_date
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after selecting start date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date in filters', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-10-01')
    cy.contains('Retention rates')
    cy.contains('Average using period is 22.30 days')
    cy.contains('Single periods:')
  })

  /**.
   * Test that retention rate page exists after selecting end date
   *
   * @name RetentionRate_exists_after_selecting_end_date
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after selecting end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting end date in filters', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-11-01')
    cy.contains('Retention rates')
    cy.contains('Average using period is 11.80 days')
    cy.contains('Single periods:')
  })

  /**.
   * Test that retention rate page exists after selecting start date and end date
   *
   * @name RetentionRate_exists_after_selecting_start_date_and_end_date
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after selecting start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after selecting start date and end date in filters', function () {
    cy.contains('Filter').click()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2020-12-01')
    cy.contains('Retention rates')
    cy.contains('Average using period is 14.86 days')
    cy.contains('Single periods:')
  })

  /**.
   * Test that RetentionRate page exists after selecting only patients with caregivers start date and end date
   *
   * @name RetentionRate_exists_after_selecting_only_patients_with_caregivers_start_date_and_end_date
   * @type {object}
   * @memberof module:cypress/integration/retentionRate_spec
   * @inner
   * @param {string} describe - exists after selecting only patients with caregivers start date and end date
   * @param {Function} testFunction - Function that runs test
   */
  it('exists after checking only patients with caregivers, start date and end date in filters', function () {
    cy.contains('Retention rates')
    cy.contains('Average using period is 20.73 days')
    cy.contains('Single periods:')
    cy.contains('Filter').click()
    cy.get('[data-testid="filter-checkbox"]').check()
    cy.get('[data-testid="startDate-checkbox"]').click()
    cy.get('[data-testid="startDate-date"]').type('2020-06-01')
    cy.get('[data-testid="endDate-checkbox"]').click()
    cy.get('[data-testid="endDate-date"]').type('2021-12-31')
    cy.contains('Average using period is 31.25 days')
    cy.contains('Single periods:')
  })
})