'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildLibJs = require('./build-lib-js');
const build = require('../build');

/**
 * Export task
 */
module.exports = function watchLibJs() {
  gulp.watch(build.SRC_LIB, gulp.series(buildLibJs));
};
