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
const INDEX_CSS_SRC = config.INDEX_CSS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchAppCss() {
  let files = APP_CSS_SRC;
  files.push(INDEX_CSS_SRC);
  gulp.watch(files, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(buildAppCss));
};
