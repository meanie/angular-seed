'use strict';

/**
 * Dependencies
 */
let readPackage = require('./read-package');

/**
 * Generate banner wrapper for compiled files
 */
module.exports = function bannerWrapper() {

  //Get package
  let pkg = readPackage();

  //Get date and author
  let today = new Date();
  let author = pkg.author.name + ' <' + pkg.author.email + '>';
  let date = today.getDate() + '-' +
             today.getMonth() + '-' +
             today.getFullYear();

  //Format banner
  let banner =
    '/**\n' +
    ' * ' + pkg.name + ' - v' + pkg.version + ' - ' + date + '\n' +
    ' * ' + pkg.homepage + '\n' +
    ' *\n' +
    ' * Copyright (c) ' + today.getFullYear() + ' ' + author + '\n' +
    ' */\n';

  //Return wrapper
  return {
    header: banner,
    footer: ''
  };
};
