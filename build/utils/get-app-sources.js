'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const build = require('../build');
const packageFilename = require('./package-filename');

/**
 * Get app sources
 */
module.exports = function getAppSources() {

  //Initialize files
  const files = [];

  //Add JS
  if (build.BUNDLE_JS) {
    files.push(build.DEST_JS + '/' + packageFilename('.min.js'));
    files.push(build.DEST_JS + '/' + packageFilename('.config.min.js'));
  }
  else {
    files.push(build.DEST_JS + '/' + '**/*.js');
  }

  //Add CSS
  if (build.BUNDLE_CSS) {
    files.push(build.DEST_CSS + '/' + packageFilename('.min.css'));
  }
  else {
    files.push(build.DEST_CSS + '/' + '**/*.css');
  }

  //Return sources
  return gulp.src(files, {read: false});
};
