'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let buildIndex = require('./build-index');
let config = require('../config');

/**
 * Configuration
 */
const INDEX_HTML_SRC = config.INDEX_HTML_SRC;

/**
 * Export task
 */
module.exports = function watchIndex() {
  gulp.watch(INDEX_HTML_SRC, gulp.series(buildIndex));
};
