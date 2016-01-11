'use strict';

/**
 * Dependencies
 */
let path = require('path');
let gulp = require('gulp');
let injectInHtml = require('gulp-inject');
let preprocess = require('gulp-preprocess');
let removeEmptyLines = require('gulp-remove-empty-lines');
let removeHtmlComments = require('gulp-remove-html-comments');
let packageFilename = require('../utils/package-filename');
let loadConfig = require('../utils/load-config');
let emptySrc = require('../utils/empty-src');
let config = require('../config');

/**
 * Configuration
 */
const ENV = config.ENV;
const BUNDLE_JS = config.BUNDLE_JS;
const BUNDLE_CSS = config.BUNDLE_CSS;
const BUILD_DEST = config.BUILD_DEST;
const APP_JS_DEST = config.APP_JS_DEST;
const LIB_JS_DEST = config.LIB_JS_DEST;
const APP_CSS_DEST = config.APP_CSS_DEST;
const LIB_CSS_DEST = config.LIB_CSS_DEST;
const LIB_JS_SRC = config.LIB_JS_SRC;
const LIB_CSS_SRC = config.LIB_CSS_SRC;
const INDEX_HTML_SRC = config.INDEX_HTML_SRC;

/**
 * Build index.html file
 */
module.exports = function buildIndex() {

  //Get sources
  let appSources = getAppSources();
  let libSources = getLibSources();

  //Get app config
  let appConfig = loadConfig();

  //Run task
  return gulp.src(INDEX_HTML_SRC)
    .pipe(injectInHtml(appSources, {
      addRootSlash: false,
      ignorePath: BUILD_DEST,
      name: 'app'
    }))
    .pipe(injectInHtml(libSources, {
      addRootSlash: false,
      ignorePath: BUILD_DEST,
      name: 'lib'
    }))
    .pipe(preprocess({
      context: {
        ENV: ENV,
        CFG: appConfig
      }
    }))
    .pipe(removeHtmlComments())
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(BUILD_DEST));
};

/**
 * Get app sources
 */
function getAppSources() {
  let appJs = BUNDLE_JS ? packageFilename('.min.js') : '**/*.js';
  let appCss = BUNDLE_CSS ? packageFilename('.min.css') : '**/*.css';
  return gulp.src([
    APP_JS_DEST + '/' + appJs,
    APP_CSS_DEST + '/' + appCss
  ], {read: false});
}

/**
 * Get lib sources
 */
function getLibSources() {

  //Initialize files
  let files = [];

  //Determine lib JS
  if (BUNDLE_JS) {
    files.push(LIB_JS_DEST + '/' + packageFilename('lib', '.min.js'));
  }
  else {
    files = LIB_JS_SRC.map(function(file) {
      return LIB_JS_DEST + '/' + path.basename(file);
    });
  }

  //Determine lib CSS
  if (!emptySrc(LIB_CSS_SRC)) {
    let libCss = BUNDLE_CSS ? packageFilename('lib', '.min.css') : '**/*.css';
    files.push(LIB_CSS_DEST + '/' + libCss);
  }

  //Return sources
  return gulp.src(files, {read: false});
}
