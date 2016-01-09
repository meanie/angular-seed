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
let config = require('../config');

/**
 * Configuration
 */
const ENV = config.ENV;
const BUNDLE_JS = config.BUNDLE_JS;
const BUNDLE_CSS = config.BUNDLE_CSS;
const INDEX_HTML_SRC = config.INDEX_HTML_SRC;
const BUILD_DEST = config.BUILD_DEST;
const APP_DEST = config.APP_DEST;
const VENDOR_DEST = config.VENDOR_DEST;
const APP_CSS_DEST = config.APP_CSS_DEST;
const VENDOR_CSS_DEST = config.VENDOR_CSS_DEST;
const VENDOR_SRC = config.VENDOR_SRC;

/**
 * Build index.html file
 */
module.exports = function buildIndex() {

  //Get sources
  let appSources = getAppSources();
  let vendorSources = getVendorSources();

  //Get app config
  let appConfig = loadConfig();

  //Run task
  return gulp.src(INDEX_HTML_SRC)
    .pipe(injectInHtml(appSources, {
      addRootSlash: false,
      ignorePath: BUILD_DEST,
      name: 'app'
    }))
    .pipe(injectInHtml(vendorSources, {
      addRootSlash: false,
      ignorePath: BUILD_DEST,
      name: 'vendor'
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
    APP_DEST + '/' + appJs,
    APP_CSS_DEST + '/' + appCss
  ], {read: false});
}

/**
 * Get vendor sources
 */
function getVendorSources() {

  //Initialize files
  let files = [];

  //Determine vendor JS
  if (BUNDLE_JS) {
    files.push(VENDOR_DEST + packageFilename('vendor', '.min.js'));
  }
  else {
    files = VENDOR_SRC.map(function(file) {
      return VENDOR_DEST + '/' + path.basename(file);
    });
  }

  //Determine vendor CSS
  let vendorCss = BUNDLE_CSS ? packageFilename('vendor', '.min.css') : '**/*.css';
  files.push(VENDOR_CSS_DEST + '/' + vendorCss);

  //Return sources
  return gulp.src(files, {read: false});
}
