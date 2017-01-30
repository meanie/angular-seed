'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const test = require('./test');
const build = require('../build');

/**
 * Watch client side tests
 */
module.exports = function watchAppTests() {
  const files = [].concat(build.SRC_JS, build.SRC_TESTS);
  gulp.watch(files, gulp.series(test));
};
