'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildAppJs = require('./build-app-js');
const buildIndex = require('./build-index');
const build = require('../build');

/**
 * Watch client side code
 */
module.exports = function watchAppCode() {
  const files = [].concat(build.SRC_JS, build.SRC_HTML);
  gulp.watch(files, gulp.series(buildAppJs, buildIndex));
};
