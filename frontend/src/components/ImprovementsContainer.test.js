/**.
 * Tests for ImprovementsContainer component
 *
 * @module frontend/src/components/ImprovementsContainer_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/ImprovementsContainer
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import ImprovementsContainer from './ImprovementsContainer'

/**.
 * Describe tests
 *
 * @type {object}
 * @function
 * @memberof module:frontend/src/components/ImprovementsContainer_test
 * @param {string} description - Description of tests
 * @param {object} testCode - Code for tests
 */
describe('<ImprovementsContainer />', () => {
  let component

  /**.
   * Render ImprovementsContainer
   *
   * @type {object}
   * @function
   * @memberof module:frontend/src/components/ImprovementsContainer_test
   * @inner
   * @param {object} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    component = render(<ImprovementsContainer />)
  })

  /**.
   * Test that ImprovementsContainer is rendered
   *
   * @type {object}
   * @function
   * @memberof module:frontedn/src/components/ImprovementsController_test
   * @inner
   * @param {string} description - renders ImprovementsContainer correctly
   * @param {obejct} TestCode - Code that runs the test
   */
  test('renders ImprovementsContainer correctly', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Average mood weekly'))
      expect(component.container.toHaveTextContent('Weekly Improvement'))
      expect(component.container.toHaveTextContent('Total Improvement'))
      expect(component.container.toHaveTextContent('by using period'))
    })
  })
})