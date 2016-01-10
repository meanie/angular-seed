'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let packageFilename = require('../utils/package-filename');
let config = require('../config');

/**
 * Configuration
 */
const LIB_JS_SRC = config.LIB_JS_SRC;
const LIB_JS_DEST = config.LIB_JS_DEST;
const BUNDLE_JS = config.BUNDLE_JS;

/**
 * Build lib javascript files
 */
module.exports = function buildLibJs() {

  //Create stream
  let stream = gulp.src(LIB_JS_SRC);

  //Bundling?
  if (BUNDLE_JS) {
    stream = stream
      .pipe(sourcemaps.init())
        .pipe(concat(packageFilename('lib', '.min.js')))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to public folder and return
  return stream.pipe(gulp.dest(LIB_JS_DEST));
};
