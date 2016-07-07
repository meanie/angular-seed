'use strict';

/**
 * Dependencies
 */
let path = require('path');
let argv = require('yargs').argv;
let pkg = require('../package.json');

//Environment
const ENV = argv.env || process.env.NODE_ENV || 'dev';
const VERSION = pkg.version;

//Paths
const ROOT_PATH = path.normalize(path.join(__dirname, '..'));
const CONFIG_PATH = path.join(ROOT_PATH, 'config');

//Source globs
let ASSETS_SRC = ['app/assets/**/*'];
let CONFIG_SRC = ['config/**/*.yml'];
let INDEX_HTML_SRC = 'app/index.html';
let INDEX_CSS_SRC = 'app/index.scss';

//App
let APP_JS_SRC = ['app/**/*.js', 'app/components/**/*.js'];
let APP_TEST_SRC = ['app/**/*.spec.js'];
let APP_CSS_SRC = ['app/**/*.scss'];
let APP_HTML_SRC = ['app/components/**/*.html'];

//Libraries
let LIB_JS_SRC = [
  'node_modules/angular/angular.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/meanie-angular-api/release/meanie-angular-api.js',
  'node_modules/meanie-angular-log/release/meanie-angular-log.js',
  'node_modules/meanie-angular-url/release/meanie-angular-url.js',
  'node_modules/babel-polyfill/dist/polyfill.js',
];
let LIB_TEST_SRC = [
  'node_modules/angular-mocks/angular-mocks.js',
];
let LIB_CSS_SRC = [];

//Destination folders
let BUILD_DEST = `dist/${ENV}`;
let ASSETS_DEST = BUILD_DEST;
let APP_JS_DEST = `${BUILD_DEST}/app`;
let LIB_JS_DEST = `${BUILD_DEST}/lib`;
let APP_CSS_DEST = `${BUILD_DEST}/css`;
let LIB_CSS_DEST = `${BUILD_DEST}/css`;

//Build settings
let BUNDLE_JS = false;
let BUNDLE_CSS = false;
let AUTOPREFIXER_BROWSERS = ['last 2 versions'];

/**
 * Prod environment overrides
 */
if (ENV === 'production' || ENV === 'staging') {

  //Build settings
  BUNDLE_JS = true;
  BUNDLE_CSS = true;

  //Destination folders
  BUILD_DEST = 'dist/bundled';
  ASSETS_DEST = BUILD_DEST;
  APP_JS_DEST = `${BUILD_DEST}/bundles`;
  LIB_JS_DEST = `${BUILD_DEST}/bundles`;
  APP_CSS_DEST = `${BUILD_DEST}/bundles`;
  LIB_CSS_DEST = `${BUILD_DEST}/bundles`;
}

/**
 * Export config object
 */
module.exports = {

  //Environment
  ENV,
  VERSION,

  //Core paths
  ROOT_PATH,
  CONFIG_PATH,

  //Destination paths
  BUILD_DEST,
  ASSETS_DEST,
  APP_JS_DEST,
  LIB_JS_DEST,
  APP_CSS_DEST,
  LIB_CSS_DEST,

  //Sources (JS)
  APP_JS_SRC,
  LIB_JS_SRC,
  ASSETS_SRC,
  CONFIG_SRC,
  APP_TEST_SRC,
  LIB_TEST_SRC,

  //Sources (CSS & HTML)
  INDEX_HTML_SRC,
  APP_HTML_SRC,
  INDEX_CSS_SRC,
  APP_CSS_SRC,
  LIB_CSS_SRC,

  //Other build settings
  BUNDLE_JS,
  BUNDLE_CSS,
  AUTOPREFIXER_BROWSERS,
};
