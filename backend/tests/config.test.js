/**.
 * Tests for config
 *
 * @constant
 * @module tests/config_test
 * @requires utils/config
 */
const config = require('../utils/config')

/**.
 * Run tests for config
 *
 * @name description
 * @type {object}
 * @function
 * @memberof module:tests/config_test
 * @param {string} description - config
 * @param {object} tests - Function that runs tests
 */
describe('config', () => {
  /**.
   * Tests that the port of backend is correct
   *
   * @name test_backend_port
   * @function
   * @memberof module:tests/config_test
   * @inner
   * @param {string} name - Name of the test
   * @param {object} test - Test code
   */
  test('Backend PORT of 5000', () => {
    const result = config.PORT

    expect(result).toBe('5000')
  })
})