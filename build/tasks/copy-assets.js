'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const build = require('../build');

/**
 * Copy assets
 */
module.exports = function copyAssets() {
  return gulp
    .src(build.SRC_ASSETS)
    .pipe(gulp.dest(build.DEST_ASSETS));
};
