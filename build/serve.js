'use strict';

/**
 * Dependencies
 */
let path = require('path');
let log = require('connect-logger');
let sync = require('browser-sync').create();
let serveStatic = require('serve-static');
let config = require('./config');

/**
 * Constants
 */
const PORT = 8080;
const BASE_DIR = config.BUILD_DEST;
const REQUEST_LOG_FORMAT = config.REQUEST_LOG_FORMAT;

/**
 * Log middleware
 */
let logMiddleware = log({
  format: REQUEST_LOG_FORMAT
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
  },
  files: [
    `${BASE_DIR}/**/*`
  ],
  reloadDebounce: 2000,
  reloadDelay: 2000
});
