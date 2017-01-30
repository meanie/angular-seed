'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const injectInHtml = require('gulp-inject');
const preprocess = require('gulp-preprocess');
const removeEmptyLines = require('gulp-remove-empty-lines');
const removeHtmlComments = require('gulp-remove-html-comments');
const getAppSources = require('../utils/get-app-sources');
const getLibSources = require('../utils/get-lib-sources');
const config = require('../config');
const build = require('../build');

/**
 * Build index.html file
 */
module.exports = function buildIndex() {
  return gulp.src(build.SRC_INDEX_HTML)
    .pipe(injectInHtml(getAppSources(), {
      addRootSlash: false,
      ignorePath: build.DEST_BUILD,
      name: 'app',
    }))
    .pipe(injectInHtml(getLibSources(), {
      addRootSlash: false,
      ignorePath: build.DEST_BUILD,
      name: 'lib',
    }))
    .pipe(preprocess({
      context: {
        ENV: build.ENV,
        CFG: config,
      },
    }))
    .pipe(removeHtmlComments())
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(build.DEST_BUILD));
};
