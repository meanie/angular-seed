'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let lint = require('./lint');
let test = require('./test');
let buildAppJs = require('./build-app-js');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const APP_SRC = config.APP_SRC;
const TEST_SRC = config.TEST_SRC;
const APP_HTML_SRC = config.APP_HTML_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export combined task
 */
module.exports = gulp.parallel(watchAppCode, watchAppTests);

/**
 * Watch client side code
 */
function watchAppCode() {
  let files = [].concat(APP_SRC, APP_HTML_SRC);
  gulp.watch(files, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(lint, buildAppJs, buildIndex));
}

/**
 * Watch client side tests
 */
function watchAppTests() {
  gulp.watch(TEST_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(lint, test));
}
