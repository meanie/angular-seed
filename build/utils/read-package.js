'use strict';

/**
 * Dependencies
 */
let fs = require('fs');
let path = require('path');

/**
 * Location of package.json
 */
const PACKAGE = path.resolve(path.join(__dirname, '..', '..', 'package.json'));

/**
 * Get package details (read on demand)
 */
module.exports = function readPackage() {
  return JSON.parse(fs.readFileSync(PACKAGE).toString());
};
