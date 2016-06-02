'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildLibCss = require('./build-lib-css');
let config = require('../config');

/**
 * Configuration
 */
const LIB_CSS_SRC = config.LIB_CSS_SRC;

/**
 * Export task
 */
module.exports = function watchLibCss() {
  gulp.watch(LIB_CSS_SRC, gulp.series(buildLibCss));
};
