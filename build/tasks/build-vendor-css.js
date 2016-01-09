'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let csso = require('gulp-csso');
let concat = require('gulp-concat');
let emptySrc = require('../utils/empty-src');
let packageFilename = require('../utils/package-filename');
let config = require('../config');

/**
 * Configuration
 */
const VENDOR_CSS_SRC = config.VENDOR_CSS_SRC;
const VENDOR_CSS_DEST = config.VENDOR_CSS_DEST;
const BUNDLE_CSS = config.BUNDLE_CSS;

/**
 * Process vendor CSS files
 */
module.exports = function buildVendorCss(done) {

  //No CSS?
  if (emptySrc(VENDOR_CSS_SRC)) {
    return done();
  }

  //Get stream
  let stream = gulp.src(VENDOR_CSS_SRC);

  //Bundling?
  if (BUNDLE_CSS) {
    stream = stream
      .pipe(concat(packageFilename('vendor', '.min.css')))
      .pipe(csso());
  }

  //Write to destination
  return stream.pipe(gulp.dest(VENDOR_CSS_DEST));
};
