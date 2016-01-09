'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildVendorCss = require('./build-vendor-css');
let config = require('../config');

/**
 * Configuration
 */
const VENDOR_CSS_SRC = config.VENDOR_CSS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchVendorCss() {
  gulp.watch(VENDOR_CSS_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(buildVendorCss));
};
