'use strict';

/**
 * Dependencies
 */
const path = require('path');
const replaceInFile = require('replace-in-file');
const build = require('../build');
const config = require('../config');

/**
 * Copy assets
 */
module.exports = function updateRedirects(done) {
  replaceInFile({
    files: path.join(build.DEST_ASSETS, '_redirects'),
    replace: /%API_BASE_URL%/g,
    with: config.API_BASE_URL,
  }, done);
};
