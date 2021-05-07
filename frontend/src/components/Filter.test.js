/**.
 * Tests fro Filter component
 *
 * @module frontend/src/components/Filter_test
 * @requires React
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/Filter
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, fireEvent } from '@testing-library/react'
import Filter from './Filter'

/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/Filter_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<Filter />', () => {
  let component, mockHandler

  /**.
   * Render Filter
   *
   * @memberof module:frontend/src/components/Filter_test
   * @inner
   * @param {Function} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    mockHandler = jest.fn()

    component = render(<Filter description={'test filtering'} checked={false} handleFilterChange={mockHandler} />)
  })

  /**.
   * Test that Filter is rendered
   *
   * @memberof module:frontend/src/components/Filter_test
   * @inner
   * @param {string} description - renders filter component
   * @param {Function} testCode - code that runs the test
   */
  test('renders Filter', () => {
    waitFor(() => {
      expect(component.container).toHaveTextContent('test filtering')
    })
  })

  /**.
   * Test that checking checkbox calls event handler once
   *
   * @memberof module:frontend/src/components/Filter_test
   * @inner
   * @param {string} description - eventhandler is called once
   * @param {Function} testCode - code that runs the test
   */
  test('checking filtering checkbox calls event handler once', async () => {
    const checkbox = component.getByTestId('filter-checkbox')
    fireEvent.click(checkbox)

    waitFor(() => {
      expect(mockHandler.mock.calls).toHaveLength(1)
    })
  })
})