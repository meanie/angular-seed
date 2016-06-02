'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildLibJs = require('./build-lib-js');
let config = require('../config');

/**
 * Configuration
 */
const LIB_JS_SRC = config.LIB_JS_SRC;

/**
 * Export task
 */
module.exports = function watchLibJs() {
  gulp.watch(LIB_JS_SRC, gulp.series(buildLibJs));
};
