'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let lint = require('./lint');
let test = require('./test');
let buildAppJs = require('./build-app-js');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const CONFIG_SRC = config.CONFIG_SRC;
const WATCH_DEBOUNCE_DELAY = config.WATCH_DEBOUNCE_DELAY;

/**
 * Export combined task
 */
module.exports = function watchConfig() {
  gulp.watch(CONFIG_SRC, {
    debounceDelay: WATCH_DEBOUNCE_DELAY
  }, gulp.series(lint, test, buildAppJs, buildIndex));
};