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
const CONFIG_SRC = config.CONFIG_SRC;
const APP_SRC = config.APP_SRC;
const TEST_SRC = config.TEST_SRC;

/**
 * Lint code
 */
module.exports = function lint() {

  //Files for testing
  let files = ['build/**/*.js'].concat(
    CONFIG_SRC,
    APP_SRC,
    TEST_SRC
  );

  return gulp.src(files)
    .pipe(cached('lint'))
    .pipe(jshint())
    .pipe(jscs())
    .on('error', function() {})
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
};
