'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const packageFilename = require('../utils/package-filename');
const build = require('../build');

/**
 * Build lib javascript files
 */
module.exports = function buildLibJs() {

  //Create stream
  let stream = gulp.src(build.SRC_LIB);

  //Bundling?
  if (build.BUNDLE_LIB) {
    stream = stream
      .pipe(sourcemaps.init())
        .pipe(concat(packageFilename('lib', '.min.js')))
        .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to public folder and return
  return stream.pipe(gulp.dest(build.DEST_LIB));
};
