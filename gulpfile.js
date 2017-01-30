/* eslint no-console: off */
'use strict';

/**
 * Dependencies
 */
const gulp = require('gulp');
const chalk = require('chalk');
const config = require('./build/config');

/**
 * Tasks
 */
const test = require('./build/tasks/test');
const clean = require('./build/tasks/clean');
const copyAssets = require('./build/tasks/copy-assets');
const buildAppJs = require('./build/tasks/build-app-js');
const buildLibJs = require('./build/tasks/build-lib-js');
const buildAppCss = require('./build/tasks/build-app-css');
const buildConfig = require('./build/tasks/build-config');
const buildIndex = require('./build/tasks/build-index');
const watchAppJs = require('./build/tasks/watch-app-js');
const watchLibJs = require('./build/tasks/watch-lib-js');
const watchAppCss = require('./build/tasks/watch-app-css');
const watchIndex = require('./build/tasks/watch-index');
const watchAssets = require('./build/tasks/watch-assets');
const watchConfig = require('./build/tasks/watch-config');
const updateRedirects = require('./build/tasks/update-redirects');

//Log
console.log('Running in', chalk.magenta(config.ENV), 'environment');

/**
 * Build the application
 */
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(copyAssets, updateRedirects),
    buildConfig,
    buildAppJs,
    buildAppCss,
    buildLibJs
  ),
  buildIndex
));

/**
 * Watch files for changes
 */
gulp.task('watch', gulp.parallel(
  watchAppJs, watchLibJs,
  watchAppCss,
  watchIndex, watchAssets, watchConfig
));

/**
 * Testing
 */
gulp.task('test', test);

/**
 * Default task
 */
gulp.task('default', gulp.series(
  'test', 'build', 'watch'
));

/**
 * Helper tasks accessible via CLI
 */
gulp.task('clean', clean);
gulp.task('assets', copyAssets);
