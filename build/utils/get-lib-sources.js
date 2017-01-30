'use strict';

/**
 * Dependencies
 */
const path = require('path');
const gulp = require('gulp');
const build = require('../build');
const packageFilename = require('./package-filename');

/**
 * Get app sources
 */
module.exports = function getLibSources() {
  let files = [];
  if (build.BUNDLE_LIB) {
    files.push(build.DEST_LIB + '/' + packageFilename('lib', '.min.js'));
  }
  else {
    files = build.SRC_LIB.map(file => {
      return build.DEST_LIB + '/' + path.basename(file);
    });
  }
  return gulp.src(files);
};
