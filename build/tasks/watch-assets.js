'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let copyAssets = require('./copy-assets');
let config = require('../config');

/**
 * Configuration
 */
const ASSETS_SRC = config.APP_JS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchAssets() {
  gulp.watch(ASSETS_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(copyAssets));
};
