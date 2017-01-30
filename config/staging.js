'use strict';

/**
 * Get production config
 */
const production = require('./production');

/**
 * Environment configuration (staging)
 */
module.exports = Object.assign({}, production, {

  //App
  APP_BASE_URL: 'https://staging.my-application.com',

  //API
  API_BASE_URL: 'https://staging.api.my-application.com',

  //Analytics
  ANALYTICS_ENABLED: true,
  ANALYTICS_TRACKING_ID: '',
});
