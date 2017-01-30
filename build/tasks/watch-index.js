'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildIndex = require('./build-index');
const build = require('../build');

/**
 * Export task
 */
module.exports = function watchIndex() {
  gulp.watch(build.SRC_INDEX_HTML, gulp.series(buildIndex));
};
