'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildAppCss = require('./build-app-css');
let config = require('../config');

/**
 * Configuration
 */
const APP_CSS_SRC = config.APP_CSS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchAppCss() {
  gulp.watch(APP_CSS_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(buildAppCss));
};
