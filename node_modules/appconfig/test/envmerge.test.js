var assert = require('assert')
var envmerge = require('../lib/envmerge')

describe('lib/envmerge', function () {
  var json = {
    a: 1,
    key: 'default',
    development: { key: 'dev' },
    staging: { key: 'stage' }
  }

  describe('development', function () {
    before(function () {
      process.env.NODE_ENV = 'development'
    })

    it('should have new key', function () {
      assert.equal('dev', envmerge(json).key)
    })

    it('should have normal a', function () {
      assert.equal(1, envmerge(json).a)
    })
  })

  describe('production', function () {
    before(function () {
      process.env.NODE_ENV = 'production'      
    })

    it('should have default key', function () {
      assert.equal('default', envmerge(json).key)
    })

    it('should have normal a', function () {
      assert.equal(1, envmerge(json).a)
    })
  })
})
