'use strict'

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('appusers', [{
      name: 'Matti'
    }])
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('appusers', [{
      name: 'Matti'
    }])
  }
}
