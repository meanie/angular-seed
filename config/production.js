'use strict';

/**
 * Get base config
 */
const base = require('./base');

/**
 * Environment configuration (production)
 */
module.exports = Object.assign({}, base, {

  //API
  API_BASE_URL: 'https://api.my-application.com',

  //Content security policy
  CSP: 'default-src https:; style-src https: \'unsafe-inline\'; ' +
    'img-src https: data: blob: filesystem:',

  //Sentry
  SENTRY_DSN: '',

  //Analytics
  ANALYTICS_ENABLED: true,
  ANALYTICS_TRACKING_ID: '',
});
