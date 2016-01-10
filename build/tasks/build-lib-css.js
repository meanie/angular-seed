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
const LIB_CSS_SRC = config.LIB_CSS_SRC;
const LIB_CSS_DEST = config.LIB_CSS_DEST;
const BUNDLE_CSS = config.BUNDLE_CSS;

/**
 * Process lib CSS files
 */
module.exports = function buildLibCss(done) {

  //No CSS?
  if (emptySrc(LIB_CSS_SRC)) {
    return done();
  }

  //Get stream
  let stream = gulp.src(LIB_CSS_SRC);

  //Bundling?
  if (BUNDLE_CSS) {
    stream = stream
      .pipe(concat(packageFilename('lib', '.min.css')))
      .pipe(csso());
  }

  //Write to destination
  return stream.pipe(gulp.dest(LIB_CSS_DEST));
};
