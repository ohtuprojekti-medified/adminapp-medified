/**.
 * Tests for RetentionRate component
 *
 * @module frontend/src/components/RetentionRate_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/RetentionRate
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import RetentionRate from './RetentionRate'

/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/RetentionRate_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<RetentionRate />', () => {
  let component
  let retentionRates, average

  /**.
   * Render RetentionRate with mock values
   *
   * @memberof module:frontend/src/components/RetentionRate_test
   * @inner
   * @param {Function} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    retentionRates = [1, 3, 7, 6, 5, 8].map(num => { return { daysUsed: num } })
    average = 5

    component = render(<RetentionRate retentionRates={retentionRates} average={average} />)
  })

  /**.
   * Test that RetentionRate is rendered
   *
   * @memberof module:frontend/src/components/RetentionRate_test
   * @inner
   * @param {string} description - Renders chart
   * @param {Function} testCode - Code that runs the test
   */
  test('renders RetentionRate', () => {
    expect(component.container).toHaveTextContent('Retention rates')
    expect(component.container).toHaveTextContent('Average using period is')
    expect(component.container).toHaveTextContent('Single periods:')
  })
})