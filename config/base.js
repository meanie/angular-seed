'use strict';

/**
 * Get package info
 */
const pkg = require('../package.json');
const git = require('git-rev-sync');

/**
 * Environment configuration (base)
 */
module.exports = {

  //Application
  APP_NAME: pkg.name,
  APP_VERSION: pkg.version,
  APP_REVISION: git.short(),
  APP_TITLE: 'My Application',
  APP_BASE_URL: '',

  //API
  API_BASE_URL: '',
  API_BASE_PATH: '',
  API_ENFORCE_DATA_FORMAT: true,
  API_NETWORK_TIMEOUT: 20,

  //Authentication
  AUTH_CLIENT_IDENTIFIER: pkg.name,

  //Content security policy
  CSP: '',

  //Sentry
  SENTRY_ORIGIN: 'client',
  SENTRY_DSN: '',
};
