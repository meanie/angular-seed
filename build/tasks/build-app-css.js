'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let sass = require('gulp-sass');
let csso = require('gulp-csso');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer');
let packageFilename = require('../utils/package-filename');
let config = require('../config');

/**
 * Configuration
 */
const INDEX_CSS_SRC = config.INDEX_CSS_SRC;
const APP_CSS_DEST = config.APP_CSS_DEST;
const BUNDLE_CSS = config.BUNDLE_CSS;
const AUTOPREFIXER_BROWSERS = config.AUTOPREFIXER_BROWSERS;

/**
 * Build application SCSS files
 */
module.exports = function buildAppScss() {

  //Create stream
  let stream = gulp.src(INDEX_CSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
       browsers: AUTOPREFIXER_BROWSERS
     }));

  //Bundling?
  if (BUNDLE_CSS) {
    stream = stream
      .pipe(csso())
      .pipe(rename(packageFilename('.min.css')));
  }

  //Write to destination folder
  return stream.pipe(gulp.dest(APP_CSS_DEST));
};
