'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildAppCss = require('./build-app-css');
let config = require('../config');

/**
 * Configuration
 */
const APP_CSS_SRC = config.APP_CSS_SRC;

/**
 * Export task
 */
module.exports = function watchAppCss() {
  gulp.watch(APP_CSS_SRC, gulp.series(buildAppCss));
};
