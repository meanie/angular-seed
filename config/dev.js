'use strict';

/**
 * Get base config
 */
const base = require('./base');

/**
 * Environment configuration (dev)
 */
module.exports = Object.assign({}, base, {

  //API
  API_PORT: 8080,
  API_BASE_PATH: '/api',
  API_NETWORK_TIMEOUT: 10,
});
