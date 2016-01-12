'use strict';

/**
 * Dependencies
 */
let path = require('path');
let karma = require('karma');
let config = require('../config');

/**
 * Configuration
 */
const ROOT_PATH = config.ROOT_PATH;
const LIB_JS_SRC = config.LIB_JS_SRC;
const LIB_TEST_SRC = config.LIB_TEST_SRC;
const APP_JS_SRC = config.APP_JS_SRC;
const APP_TEST_SRC = config.APP_TEST_SRC;

/**
 * Run tests
 */
module.exports = function test(done) {

  //Get files for testing
  let files = [].concat(
    LIB_JS_SRC,
    LIB_TEST_SRC,
    APP_JS_SRC,
    APP_TEST_SRC
  );

  //Run karma server
  new karma.Server({
    configFile: path.join(ROOT_PATH, 'karma.conf.js'),
    singleRun: true,
    failOnEmptyTestSuite: false,
    files: files
  }, done).start();
};
