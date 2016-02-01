'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let debounce = require('debounce');
let buildLibCss = require('./build-lib-css');
let config = require('../config');

/**
 * Configuration
 */
const LIB_CSS_SRC = config.LIB_CSS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchLibCss() {
  gulp.watch(LIB_CSS_SRC, debounce(
    gulp.series(buildLibCss), WATCH_DEBOUNCE_DELAY
  ));
};
