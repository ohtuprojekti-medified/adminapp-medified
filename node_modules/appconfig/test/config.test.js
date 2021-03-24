var path = require('path')
var assert = require('assert')
var config = require('../lib/config')

describe('lib/config', function () {
  var folder = path.resolve(__dirname, 'config')

  describe('test', function () {
    before(function () {
      process.env.NODE_ENV = 'test'
    })

    it('should have url', function () {
      var mongo = config(folder).mongo
      assert.equal('mongodb://localhost/test', mongo)
    })
  })

  describe('development', function () {
    before(function () {
      process.env.NODE_ENV = 'development'
    })

    it('should have authenticated admin', function () {
      var admin = config(folder).admin
      assert.equal(true, admin.authenticated)
    })

    it('should have default secret token', function () {
      var secret = config(folder).secret
      assert.equal('verysecret', secret.token)
    })
  })

  describe('staging', function () {
    before(function () {
      process.env.NODE_ENV = 'staging'
    })

    it('should have more secure secret token', function () {
      var secret = config(folder).secret
      assert.equal('6373c4457edb790ddcd', secret.token)
    })
  })

  describe('production', function () {
    before(function () {
      process.env.NODE_ENV = 'production'
    })

    it('should have admin settings', function () {
      var admin = config(folder).admin
      assert.equal('admin', admin.user)
      assert.equal('3cbd9cf2ac846c7230686e51edc93e2c', admin.pass)
    })

    it('should have more secure secret token', function () {
      var secret = config(folder).secret
      assert.equal('1c1e15ff35131c6b768002f73c5f5c4a', secret.token)
    })
  })
})
