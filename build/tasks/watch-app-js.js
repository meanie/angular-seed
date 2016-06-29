'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
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

/**
 * Export combined task
 */
module.exports = gulp.parallel(watchAppCode, watchAppTests);

/**
 * Watch client side code
 */
function watchAppCode() {
  let files = [].concat(APP_JS_SRC, APP_HTML_SRC);
  gulp.watch(files, gulp.series(buildAppJs, buildIndex));
}

/**
 * Watch client side tests
 */
function watchAppTests() {
  gulp.watch(APP_TEST_SRC, gulp.series(test));
}
