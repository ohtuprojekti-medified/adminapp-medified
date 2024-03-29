/**.
 * Tests for Organisations component
 *
 * @module frontend/src/components/Organisations_test
 * @requires react
 * @requires @testing-library/jest-dom/extend-expect
 * @requires @testing-library/react
 * @requires frontend/src/components/Organisations
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import Organisations from './Organisations'

/**.
 * Describe tests
 *
 * @memberof module:frontend/src/components/Organisations_test
 * @param {string} description - Description of tests
 * @param {Function} testCode - Code for tests
 */
describe('<Organisations />', () => {
  let component
  let organisations
  let handleOrganisationChange = jest.fn()

  /**.
   * Render Organisations with 2 organisations
   *
   * @memberof module:frontend/src/components/Organisation_test
   * @inner
   * @param {Function} beforeEachCode - Code to be run before each test
   */
  beforeEach(() => {
    organisations = [
      { id: 'CaregiverOrganisation' },
      { id: 'AdminOrganisation' }
    ]
    component = render(<Organisations organisations={organisations} handleOrganisationChange={handleOrganisationChange} organisationSelect={'ALL'} />)
  })

  /**.
   * Test that Organisations is rendered
   *
   * @memberof module:frontend/src/components/Organisations_test
   * @inner
   * @param {string} description - Renders organisation filter
   * @param {Function} testCode - Code that runs the test
   */
  test('renders organisation filter', () => {
    waitFor(() => {
      expect(component.container).toHaveTextContent('Select Organisation')
      expect(component.container).toHaveTextContent('ALL')
      expect(component.container).toHaveTextContent('CaregiverOrganisation')
      expect(component.container).toHaveTextContent('AdminOrganisation')
    })
  })
})