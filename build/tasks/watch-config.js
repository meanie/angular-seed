'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildAppJs = require('./build-app-js');
const buildIndex = require('./build-index');
const build = require('../build');

/**
 * Export combined task
 */
module.exports = function watchConfig() {
  gulp.watch(build.SRC_CONFIG, gulp.series(buildAppJs, buildIndex));
};
