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
const VENDOR_SRC = config.VENDOR_SRC;
const TEST_LIB_SRC = config.TEST_LIB_SRC;
const APP_SRC = config.APP_SRC;
const TEST_SRC = config.TEST_SRC;

/**
 * Run tests
 */
module.exports = function test(done) {

  //Get files for testing
  let files = [].concat(
    VENDOR_SRC,
    TEST_LIB_SRC,
    APP_SRC,
    TEST_SRC
  );

  //Run karma server
  new karma.Server({
    configFile: path.join(ROOT_PATH, 'karma.conf.js'),
    singleRun: true,
    files: files
  }, done).start();
};
