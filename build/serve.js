'use strict';

/**
 * Dependencies
 */
let path = require('path');
let log = require('connect-logger');
let Rx = require('rx');
let chokidar = require('chokidar');
let sync = require('browser-sync').create();
let serveStatic = require('serve-static');
let config = require('./config');

/**
 * Constants
 */
const PORT = 8080;
const BASE_DIR = config.BUILD_DEST;

/**
 * Log middleware
 */
let logMiddleware = log({
  date: 'HH:mm:ss',
  format: '[%date] %status %method %url (%time)'
});

/**
 * Static middleware
 */
let staticMiddleware = serveStatic(path.resolve(BASE_DIR));

/**
 * SPA middleware
 */
let spaMiddleware = function(req, res, next) {
  req.url = '/index.html';
  next();
};

/**
 * Initialize browser sync
 */
sync.init({
  port: PORT,
  server: {
    baseDir: BASE_DIR,
    middleware: [
      logMiddleware,
      staticMiddleware,
      spaMiddleware
    ]
  }
});

/**
 * Create a stream of file-change events
 */
Rx.Observable.create(observer => {
  let watcher = chokidar
    .watch([`${BASE_DIR}/**/*`], {ignoreInitial: true})
    .on('all', (event, file) => {
      observer.onNext({event, file});
    });
  return function() {
    watcher.close();
  };
})
  .debounce(1000)
  .filter(x => (x.event === 'add' || x.event === 'change'))
  .subscribe(x => {
    if (x.file.match(/\.css$/)) {
      sync.reload(x.file);
    }
    else {
      sync.reload();
    }
  });
