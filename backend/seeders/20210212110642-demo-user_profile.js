'use strict'

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_survey_answers', [{
      user_id: 'df4f21aeab9f738b6d860cdb881b855af808babde68723f1616609876ab6a991a4b213fd92194d156edf2d1c9abd661f27ec84ca7e154e6fdfa61c18c476ec32',
      height: '',
      weight: '',
      sex: '',
      birth_date: '',
      first_name: 'Matti',
      last_name: 'Mallikas',
      added_organisation: 'OHTU',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_survey_answers', null, {})
  }
}
