var assert = require('assert')

describe('index', function () {
  it('should throw error on no config folder', function () {
    assert.throws(function () { require('..') })
  })  
})
