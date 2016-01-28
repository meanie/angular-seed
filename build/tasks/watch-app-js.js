'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let debounce = require('debounce');
let lint = require('./lint');
let test = require('./test');
let buildAppJs = require('./build-app-js');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const APP_JS_SRC = config.APP_JS_SRC;
const APP_TEST_SRC = config.APP_TEST_SRC;
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
  let files = [].concat(APP_JS_SRC, APP_HTML_SRC);
  gulp.watch(files, debounce(gulp.series(
    lint, buildAppJs, buildIndex
  ), WATCH_DEBOUNCE_DELAY));
}

/**
 * Watch client side tests
 */
function watchAppTests() {
  gulp.watch(APP_TEST_SRC, debounce(gulp.series(
    lint, test
  ), WATCH_DEBOUNCE_DELAY));
}
