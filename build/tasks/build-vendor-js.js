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
const VENDOR_SRC = config.VENDOR_SRC;
const VENDOR_DEST = config.VENDOR_DEST;
const BUNDLE_JS = config.BUNDLE_JS;

/**
 * Build vendor javascript files
 */
module.exports = function buildVendorJs() {

  //Create stream
  let stream = gulp.src(VENDOR_SRC);

  //Bundling?
  if (BUNDLE_JS) {
    stream = stream
      .pipe(sourcemaps.init())
        .pipe(concat(packageFilename('vendor', '.min.js')))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to public folder and return
  return stream.pipe(gulp.dest(VENDOR_DEST));
};
