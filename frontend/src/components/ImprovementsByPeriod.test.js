/**.
 * Tests for ImprovementsByPeriod component
 *
 * @module frontend/src/components/ImprovementsByPeriod_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/ImprovementsByPeriod
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import ImprovementsByPeriod from './ImprovementsByPeriod'

/**.
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:frontend/src/components/ImprovementsByPeriod_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<ImprovementsByPeriod />', () => {
  let component

  /**.
   * Render ImprovementsContainer
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/components/ImprovementsByPeriod_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<ImprovementsByPeriod />)
  })

  /**.
   * Test that ImprovementsByPeriod is rendered
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/components/ImprovementsByPeriod_test
   * @inner
   * @param {string} description - renders ImprovementsByPeriod correctly
   * @param {obejct} TestCode - Code that runs the test
   */
  test('renders ImprovementsByPeriod correctly', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
      expect(component.container.toHaveTextContent('Weekly Improvement'))
      expect(component.container.toHaveTextContent('Total Improvement'))
    })
  })
})