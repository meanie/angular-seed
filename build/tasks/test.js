'use strict';

/**
 * Dependencies
 */
const path = require('path');
const karma = require('karma');
const build = require('../build');

/**
 * Run tests
 */
module.exports = function test(done) {

  //Get files for testing
  const files = [].concat(
    build.SRC_LIB,
    build.SRC_LIB_TESTS,
    build.SRC_JS,
    build.SRC_TESTS
  );

  //Run karma server
  new karma.Server({
    configFile: path.join(build.ROOT_PATH, 'karma.conf.js'),
    singleRun: true,
    failOnEmptyTestSuite: false,
    files: files,
  }, done).start();
};
