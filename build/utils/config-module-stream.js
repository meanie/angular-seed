'use strict';

/**
 * Dependencies
 */
let file = require('gulp-file');
let rename = require('gulp-rename');
let ngConstant = require('gulp-ng-constant');
let angularModuleName = require('./angular-module-name');
let loadConfig = require('./load-config');

/**
 * Config module stream
 */
module.exports = function configModuleStream() {
  return file('app.env.js', JSON.stringify({}), {
    src: true
  }).pipe(ngConstant({
      name: angularModuleName('Config'),
      stream: true,
      constants: {
        Config: loadConfig()
      }
    })).pipe(rename('app.env.js'));
};
