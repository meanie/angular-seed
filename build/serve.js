'use strict';

/**
 * Dependencies
 */
const path = require('path');
const url = require('url');
const browserSync = require('browser-sync').create();
const serveStatic = require('serve-static');
const proxy = require('http-proxy-middleware');
const build = require('./build');

/**
 * Build config
 */
const PORT = build.PORT;
const BASE_DIR = build.DEST_BUILD;
const API_PROXY = build.API_PROXY;
const WATCH_EXT = build.WATCH_EXT;

/**
 * Middleware
 */
const staticMiddleware = serveStatic(path.resolve(BASE_DIR));
const apiMiddleware = proxy('/api', {
  target: API_PROXY,
  changeOrigin: true,
  onProxyReq(proxyReq, req) {
    const ref = url.parse(req.headers.referer);
    const origin = 'http://' + ref.host;
    proxyReq.setHeader('origin', origin);
  },
});
const spaMiddleware = function(req, res, next) { //eslint-disable-line no-unused-vars
  req.url = '/index.html';
  next();
};

/**
 * Initialize browser sync
 */
browserSync.init({
  files: WATCH_EXT.map(ext => `${BASE_DIR}/**/*.${ext}`),
  reloadDebounce: 1500,
  ghostMode: false,
  port: PORT,
  server: {
    baseDir: BASE_DIR,
    middleware: [
      staticMiddleware,
      apiMiddleware,
      spaMiddleware,
    ],
  },
});
