'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let debounce = require('debounce');
let copyAssets = require('./copy-assets');
let config = require('../config');

/**
 * Configuration
 */
const ASSETS_SRC = config.ASSETS_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchAssets() {
  gulp.watch(ASSETS_SRC, debounce(
    gulp.series(copyAssets), WATCH_DEBOUNCE_DELAY
  ));
};
