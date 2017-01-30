'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const angularTemplateCache = require('gulp-angular-templatecache');
const htmlclean = require('gulp-htmlclean');
const angularModuleName = require('./angular-module-name');
const build = require('../build');

/**
 * Templates module stream
 */
module.exports = function templatesModuleStream() {
  return gulp.src(build.SRC_HTML)
    .pipe(htmlclean())
    .pipe(angularTemplateCache({
      module: angularModuleName('Templates'),
      standalone: true,
    }));
};
