'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let config = require('../config');

/**
 * Configuration
 */
const ASSETS_SRC = config.ASSETS_SRC;
const ASSETS_DEST = config.ASSETS_DEST;

/**
 * Copy assets
 */
module.exports = function copyAssets() {
  return gulp.src(ASSETS_SRC).pipe(gulp.dest(ASSETS_DEST));
};
