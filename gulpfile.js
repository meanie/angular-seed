'use strict';

/**
 * Dependencies
 */
let gulp = require('gulp');

/**
 * Tasks
 */
let test = require('./build/tasks/test');
let clean = require('./build/tasks/clean');
let copyAssets = require('./build/tasks/copy-assets');
let copyManifest = require('./build/tasks/copy-manifest');
let buildAppJs = require('./build/tasks/build-app-js');
let buildLibJs = require('./build/tasks/build-lib-js');
let buildAppCss = require('./build/tasks/build-app-css');
let buildLibCss = require('./build/tasks/build-lib-css');
let buildIndex = require('./build/tasks/build-index');
let watchAppJs = require('./build/tasks/watch-app-js');
let watchLibJs = require('./build/tasks/watch-lib-js');
let watchAppCss = require('./build/tasks/watch-app-css');
let watchLibCss = require('./build/tasks/watch-lib-css');
let watchIndex = require('./build/tasks/watch-index');
let watchAssets = require('./build/tasks/watch-assets');
let watchConfig = require('./build/tasks/watch-config');

/**
 * Build the application
 */
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    copyAssets, copyManifest,
    buildAppJs, buildAppCss,
    buildLibJs, buildLibCss
  ),
  buildIndex
));

/**
 * Watch files for changes
 */
gulp.task('watch', gulp.parallel(
  watchAppJs, watchLibJs,
  watchAppCss, watchLibCss,
  watchIndex, watchAssets, watchConfig
));

/**
 * Test task
 */
gulp.task('test', test);

/**
 * Default task
 */
gulp.task('default', gulp.series(
  'build', 'watch'
));

/**
 * Helper tasks accessible via CLI
 */
gulp.task('clean', clean);
gulp.task('assets', copyAssets);
