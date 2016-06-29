'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let test = require('./test');
let buildAppJs = require('./build-app-js');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const CONFIG_SRC = config.CONFIG_SRC;

/**
 * Export combined task
 */
module.exports = function watchConfig() {
  gulp.watch(CONFIG_SRC, gulp.series(test, buildAppJs, buildIndex));
};
