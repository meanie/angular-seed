'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const buildAppCss = require('./build-app-css');
const build = require('../build');

/**
 * Export task
 */
module.exports = function watchAppCss() {
  gulp.watch(build.SRC_SCSS, gulp.series(buildAppCss));
};
