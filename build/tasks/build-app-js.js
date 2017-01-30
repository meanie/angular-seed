/* eslint no-console: off */
'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const wrapper = require('gulp-wrapper');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');
const angularWrapper = require('../utils/angular-wrapper');
const packageFilename = require('../utils/package-filename');
const templatesModuleStream = require('../utils/templates-module-stream');
const build = require('../build');

/**
 * Build configuration
 */
const SRC_JS = build.SRC_JS;
const DEST_JS = build.DEST_JS;
const BUNDLE_JS = build.BUNDLE_JS;

/**
 * Build application JS
 */
module.exports = function buildAppJs() {

  //Create stream
  let stream = merge(
    gulp.src(SRC_JS.concat([
      '!**/*.spec.js',
    ])),
    templatesModuleStream()
  );

  //Bundling?
  if (BUNDLE_JS) {
    stream = stream.pipe(sourcemaps.init());
  }

  //Babel, annotate and wrap with IIFE
  stream = stream
    .pipe(plumber())
    .pipe(babel({
      compact: false,
    }))
    .on('error', error => {
      console.error(error);
    })
    .pipe(ngAnnotate())
    .pipe(wrapper(angularWrapper()));

  //Minify
  if (BUNDLE_JS) {
    stream = stream
      .pipe(concat(packageFilename('.min.js')))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }

  //Write to destination folder and return
  return stream.pipe(gulp.dest(DEST_JS));
};
