'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let copyAssets = require('./copy-assets');
let config = require('../config');

/**
 * Configuration
 */
const ASSETS_SRC = config.ASSETS_SRC;

/**
 * Export task
 */
module.exports = function watchAssets() {
  gulp.watch(ASSETS_SRC, gulp.series(copyAssets));
};
