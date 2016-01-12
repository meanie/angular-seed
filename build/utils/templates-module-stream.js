'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let angularTemplateCache = require('gulp-angular-templatecache');
let angularModuleName = require('./angular-module-name');
let config = require('../config');

/**
 * Configuration
 */
const APP_HTML_SRC = config.APP_HTML_SRC;

/**
 * Templates module stream
 */
module.exports = function templatesModuleStream() {
  return gulp.src(APP_HTML_SRC)
    .pipe(angularTemplateCache({
      module: angularModuleName('Templates'),
      standalone: true
    }));
};
