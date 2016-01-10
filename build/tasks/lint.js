'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let jscs = require('gulp-jscs');
let jshint = require('gulp-jshint');
let cached = require('gulp-cached');
let stylish = require('gulp-jscs-stylish');
let config = require('../config');

/**
 * Configuration
 */
const APP_JS_SRC = config.APP_JS_SRC;
const APP_TEST_SRC = config.APP_TEST_SRC;

/**
 * Lint code
 */
module.exports = function lint() {

  //Files for testing
  let files = ['build/**/*.js'].concat(
    APP_JS_SRC,
    APP_TEST_SRC
  );

  return gulp.src(files)
    .pipe(cached('lint'))
    .pipe(jshint())
    .pipe(jscs())
    .on('error', function() {})
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
};
