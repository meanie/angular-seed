/* eslint no-console: off */
'use strict';

/**
 * Dependencies
 */
const path = require('path');
const chalk = require('chalk');
const argv = require('yargs').argv;

/**
 * Determine environment and paths
 */
const ENV = argv.env || process.env.APP_ENV || 'dev';
const BASE_PATH = path.resolve(path.join(__dirname, '..'));
const CONFIG_PATH = path.join(BASE_PATH, 'config');

/**
 * Load and merge environment configuration files
 */
const envCfg = loadConfig(ENV);
const localCfg = loadConfig('local');
const mergedCfg = Object.assign(envCfg, localCfg, {ENV});

/**
 * Export merged config
 */
module.exports = mergedCfg;

/**
 * Helper to load a config file
 */
function loadConfig(env) {
  const configPath = path.join(CONFIG_PATH, env);
  try {
    return require(configPath);
  }
  catch (e) {
    if (env === 'development') {
      return loadConfig('dev');
    }
    if (env === 'production') {
      return loadConfig('prod');
    }
    if (env !== 'local') {
      console.log(
        chalk.red('Could not load environment configuration file'),
        chalk.magenta(env + '.js')
      );
      process.exit(0);
    }
    return {};
  }
}
