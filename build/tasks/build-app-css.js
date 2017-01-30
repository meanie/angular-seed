'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const packageFilename = require('../utils/package-filename');
const build = require('../build');

/**
 * Build configuration
 */
const SRC_INDEX_SCSS = build.SRC_INDEX_SCSS;
const DEST_CSS = build.DEST_CSS;
const BUNDLE_CSS = build.BUNDLE_CSS;
const AUTOPREFIXER = build.AUTOPREFIXER;

/**
 * Build application SCSS files
 */
module.exports = function buildAppScss() {

  //Create stream
  let stream = gulp.src(SRC_INDEX_SCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER));

  //Bundling?
  if (BUNDLE_CSS) {
    stream = stream
      .pipe(csso())
      .pipe(rename(packageFilename('.min.css')));
  }

  //Write to destination folder
  return stream.pipe(gulp.dest(DEST_CSS));
};
