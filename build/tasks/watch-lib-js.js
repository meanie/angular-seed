'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildLibJs = require('./build-lib-js');
let config = require('../config');

/**
 * Configuration
 */
const LIB_JS_SRC = config.APP_JS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchLibJs() {
  gulp.watch(LIB_JS_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(buildLibJs));
};
