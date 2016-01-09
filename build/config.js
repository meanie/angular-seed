'use strict';

/**
 * Dependencies
 */
let path = require('path');
let argv = require('yargs').argv;
let pkg = require('../package.json');

//Environment
let ENV = argv.env || process.env.NODE_ENV || 'dev';
let VERSION = pkg.version;

//Paths
let ROOT_PATH = path.normalize(path.join(__dirname, '..'));
let CONFIG_PATH = path.join(ROOT_PATH, 'config');

//Destination directories
let BUILD_DEST = `dist/${ENV}`;
let ASSETS_DEST = BUILD_DEST;
let APP_DEST = `${BUILD_DEST}/bundles`;
let VENDOR_DEST = `${BUILD_DEST}/bundles`;
let APP_CSS_DEST = `${BUILD_DEST}/css`;
let VENDOR_CSS_DEST = `${BUILD_DEST}/css`;

//Source globs (JS)
let APP_SRC = ['app/components/**/*.js'];
let ASSETS_SRC = ['app/assets/**/*'];
let CONFIG_SRC = ['config/**/*.js'];
let TEST_SRC = ['app/components/**/*.spec.js'];
let TEST_LIB_SRC = ['node_modules/angular-mocks/angular-mocks.js'];
let VENDOR_SRC = [
  'node_modules/moment/moment.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-cookies/angular-cookies.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/angular-mocks/angular-mocks.js',
  'node_modules/angular-resource/angular-resource.js',
  'node_modules/angular-sanitize/angular-sanitize.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/meanie-angular-api/release/meanie-angular-api.js',
  'node_modules/meanie-angular-convert/release/meanie-angular-convert.js',
  'node_modules/meanie-angular-focus/release/meanie-angular-focus.js',
  'node_modules/meanie-angular-http-buffer/release/meanie-angular-http-buffer.js',
  'node_modules/meanie-angular-log/release/meanie-angular-log.js',
  'node_modules/meanie-angular-modal/release/meanie-angular-modal.js',
  'node_modules/meanie-angular-storage/release/meanie-angular-storage.js',
  'node_modules/meanie-angular-url/release/meanie-angular-url.js',
  'node_modules/babel-polyfill/dist/polyfill.js'
];

//Source globs (CSS & HTML)
let INDEX_HTML_SRC = 'app/index.html';
let INDEX_CSS_SRC = 'app/index.scss';
let APP_HTML_SRC = ['app/layout/**/*.html', 'app/components/**/*.html'];
let APP_CSS_SRC = ['app/**/*.scss'];
let VENDOR_CSS_SRC = [];

//Other build settings
let BUNDLE_JS = true;
let BUNDLE_CSS = true;
let AUTOPREFIXER_BROWSERS = ['last 2 versions'];
let WATCH_DEBOUNCE_DELAY = 250;

/**
 * Dev environment overrides
 */
if (ENV === 'dev') {

  //Destination paths
  APP_DEST = BUILD_DEST + '/app';
  VENDOR_DEST = BUILD_DEST + '/vendor';

  //Build settings
  BUNDLE_JS = false;
  BUNDLE_CSS = false;
}

/**
 * Export config object
 */
module.exports = {

  //Environment
  ENV: ENV,
  VERSION: VERSION,

  //Core paths
  ROOT_PATH: ROOT_PATH,
  CONFIG_PATH: CONFIG_PATH,

  //Destination paths
  BUILD_DEST: BUILD_DEST,
  APP_DEST: APP_DEST,
  VENDOR_DEST: VENDOR_DEST,
  ASSETS_DEST: ASSETS_DEST,
  APP_CSS_DEST: APP_CSS_DEST,
  VENDOR_CSS_DEST: VENDOR_CSS_DEST,

  //Sources (JS)
  APP_SRC: APP_SRC,
  VENDOR_SRC: VENDOR_SRC,
  ASSETS_SRC: ASSETS_SRC,
  CONFIG_SRC: CONFIG_SRC,
  TEST_SRC: TEST_SRC,
  TEST_LIB_SRC: TEST_LIB_SRC,

  //Sources (CSS & HTML)
  INDEX_HTML_SRC: INDEX_HTML_SRC,
  APP_HTML_SRC: APP_HTML_SRC,
  INDEX_CSS_SRC: INDEX_CSS_SRC,
  APP_CSS_SRC: APP_CSS_SRC,
  VENDOR_CSS_SRC: VENDOR_CSS_SRC,

  //Other build settings
  BUNDLE_JS: BUNDLE_JS,
  BUNDLE_CSS: BUNDLE_CSS,
  AUTOPREFIXER_BROWSERS: AUTOPREFIXER_BROWSERS,
  WATCH_DEBOUNCE_DELAY: WATCH_DEBOUNCE_DELAY
};
