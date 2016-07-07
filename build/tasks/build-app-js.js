'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');
let babel = require('gulp-babel');
let merge = require('merge-stream');
let filter = require('gulp-filter');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let wrapper = require('gulp-wrapper');
let sourcemaps = require('gulp-sourcemaps');
let ngAnnotate = require('gulp-ng-annotate');
let bannerWrapper = require('../utils/banner-wrapper');
let angularWrapper = require('../utils/angular-wrapper');
let packageFilename = require('../utils/package-filename');
let configModuleStream = require('../utils/config-module-stream');
let templatesModuleStream = require('../utils/templates-module-stream');
let config = require('../config');

/**
 * Configuration
 */
const APP_JS_SRC = config.APP_JS_SRC;
const APP_JS_DEST = config.APP_JS_DEST;
const BUNDLE_JS = config.BUNDLE_JS;

/**
 * Build application JS
 */
module.exports = function buildAppJs() {

  //Create stream
  let stream = merge(
    gulp.src(APP_JS_SRC.concat([
      '!**/*.spec.js'
    ])),
    configModuleStream(),
    templatesModuleStream()
  );

  //Bundling?
  if (BUNDLE_JS) {
    stream = stream.pipe(sourcemaps.init());
  }

  //Babel, annotate and wrap with IIFE
  stream = stream
    .pipe(babel({
      compact: false
    }))
    .on('error', error => {
      console.error(error);
      this.emit('end');
    })
    .pipe(ngAnnotate())
    .pipe(wrapper(angularWrapper()));

  //Minify
  if (BUNDLE_JS) {
    let mapFilter = filter(['!*.map'], {restore: true});
    stream = stream
      .pipe(concat(packageFilename('.min.js')))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(mapFilter)
      .pipe(wrapper(bannerWrapper()))
      .pipe(mapFilter.restore);
  }

  //Write to destination folder and return
  return stream.pipe(gulp.dest(APP_JS_DEST));
};
