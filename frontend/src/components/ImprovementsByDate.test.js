/**.
 * Tests for ImprovementsByDate component
 *
 * @module frontend/src/components/ImprovementsByDate_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/ImprovementsByDate
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import ImprovementsByDate from './ImprovementsByDate'

/**.
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:frontend/src/components/ImprovementsByDate_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<ImprovementsByDate />', () => {
  let component

  /**.
   * Render ImprovementsContainer
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/components/ImprovementsByDate_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<ImprovementsByDate />)
  })

  /**.
   * Test that ImprovementsByDate is rendered
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/components/ImprovementsByDate_test
   * @inner
   * @param {string} description - renders ImprovementsByDate correctly
   * @param {obejct} TestCode - Code that runs the test
   */
  test('renders ImprovementsByDatecorrectly', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
      expect(component.container.toHaveTextContent('Weekly Improvement'))
      expect(component.container.toHaveTextContent('Total Improvement'))
    })
  })
})