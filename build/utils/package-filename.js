'use strict';

/**
 * Dependencies
 */
const readPackage = require('./read-package');

/**
 * Get package file name
 */
module.exports = function packageFileName(filename, ext) {
  let pkg = readPackage();
  if (!ext) {
    ext = filename;
    filename = pkg.name.toLowerCase();
  }
  return filename + '-' + pkg.version + (ext || '');
};
