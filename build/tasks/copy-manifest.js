'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let config = require('../config');

/**
 * Configuration
 */
const MANIFEST_SRC = config.MANIFEST_SRC;
const BUILD_DEST = config.BUILD_DEST;

/**
 * Copy assets
 */
module.exports = function copyAssets() {
  return gulp.src(MANIFEST_SRC).pipe(gulp.dest(BUILD_DEST));
};
