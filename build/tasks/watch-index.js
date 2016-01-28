'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let debounce = require('debounce');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const INDEX_SRC = config.INDEX_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export task
 */
module.exports = function watchIndex() {
  gulp.watch(INDEX_SRC, debounce(buildIndex, WATCH_DEBOUNCE_DELAY));
};
