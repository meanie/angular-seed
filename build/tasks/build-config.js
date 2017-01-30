/* eslint no-console: off */
'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const wrapper = require('gulp-wrapper');
const ngAnnotate = require('gulp-ng-annotate');
const file = require('gulp-file');
const rename = require('gulp-rename');
const ngConstant = require('gulp-ng-constant');
const angularWrapper = require('../utils/angular-wrapper');
const packageFilename = require('../utils/package-filename');
const angularModuleName = require('../utils/angular-module-name');
const config = require('../config');
const build = require('../build');

/**
 * Config module stream
 */
module.exports = function buildConfig() {

  //Create file stream for configuration file
  let stream = file('app.config.js', JSON.stringify({}), {src: true})
    .pipe(ngConstant({
      name: angularModuleName('Config'),
      stream: true,
      constants: {
        Config: config,
      },
    }))
    .pipe(rename('app.config.js'))
    .pipe(plumber())
    .pipe(babel({
      compact: false,
    }))
    .on('error', console.error)
    .pipe(ngAnnotate())
    .pipe(wrapper(angularWrapper()));

  //Minify
  if (build.BUNDLE_JS) {
    stream = stream
      .pipe(concat(packageFilename('.config.min.js')))
      .pipe(uglify());
  }

  //Write to destination folder and return
  return stream.pipe(gulp.dest(build.DEST_JS));
};
