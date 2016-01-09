'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildVendorJs = require('./build-vendor-js');
let config = require('../config');

/**
 * Configuration
 */
const VENDOR_SRC = config.APP_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchVendorJs() {
  gulp.watch(VENDOR_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(buildVendorJs));
};
