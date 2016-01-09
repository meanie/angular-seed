'use strict';

/**
 * Dependencies
 */
let del = require('del');
let config = require('../config');

/**
 * Configuration
 */
const BUILD_DEST = config.BUILD_DEST;

/**
 * Clean the build destination folder
 */
module.exports = function clean() {
  return del(BUILD_DEST, {
    dot: true
  });
};
