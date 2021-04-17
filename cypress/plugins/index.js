/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * Run this code when project is opened
 *
 * @module cypress/plugins/index
 * @requires cypress
 * @requires cypress-dotenv
 * @exports config - Configurate dotenv plugin for cypress
 */

/**
 * Give cypress access to environment variables in .env
 *
 * @type {Cypress.PluginConfig}
 * @constant
 */
const dotenvPlugin = require('cypress-dotenv')
module.exports = (on, config) => {
  config = dotenvPlugin(config)
  return config
}
