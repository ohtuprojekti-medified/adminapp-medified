/**.
 * Tests for TotalMoodImprovement component
 *
 * @module frontend/src/components/TotalMoodImprovement_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/TotalMoodImprovement
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import TotalMoodImprovement from './TotalMoodImprovement'

/**.
  * Describe tests
  *
  * @memberof module:frontend/src/components/TotalMoodImprovement_test
  * @param {string} description - Description of tests
  * @param {Function} testCode - Code for tests
  */
describe('<TotalMoodImprovement />', () => {
  let component

  /**.
    * Render TotalMoodImprovement
    *
    * @memberof module:frontend/src/components/TotalMoodImprovement_test
    * @inner
    * @param {Function} beforeEachCode - Code to be run before each test
    */
  beforeEach(() => {
    component = render(<TotalMoodImprovement />)
  })

  /**.
    * Test that TotalMoodImprovement is rendered
    *
    * @memberof module:frontend/src/components/TotalMoodImprovement_test
    * @inner
    * @param {string} description - renders TotalMoodImprovement
    * @param {Function} testCode - Code that runs the test
    */
  test('renders TotalMoodImprovement', () => {
    waitFor(() => {
      expect(component.container.toHaveTextContent('Adminapp for monitoring moods'))
      expect(component.container.toHaveTextContent('Total Improvement'))
    })
  })
})