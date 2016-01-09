'use strict';

/**
 * Dependencies
 */
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let YAML = require('yamljs');
let readPackage = require('./read-package');
let config = require('../config');

/**
 * Configuration
 */
const ENV = config.ENV;
const CONFIG_PATH = config.CONFIG_PATH;

/**
 * Export merged configuration
 */
module.exports = function loadConfig() {

  //Build merged config object
  let configEnv = loadEnvConfig(ENV);
  let configLocal = loadEnvConfig('local');
  let configMerged = Object.assign({}, configEnv, configLocal, {
    ENV: ENV
  });

  //Parse package properties
  let pkg = readPackage();
  for (var key in configMerged) {
    if (configMerged.hasOwnProperty(key)) {
      configMerged[key] = parsePackageValues(pkg, configMerged[key]);
    }
  }

  //Return merged config
  return configMerged;
};

/**
 * Helper to parse package values
 */
function parsePackageValues(pkg, value) {
  if (typeof value === 'string') {
    value = value.replace(/\$\{pkg\.([a-zA-Z]+)\}/, function(matches, key) {
      if (typeof pkg[key] === 'undefined') {
        console.warn(chalk.yellow('Unknown package property %s'), key);
        return null;
      }
      return pkg[key];
    });
  }
  return value;
}

/**
 * Helper to load a config file and return parsed YAML object
 */
function loadEnvConfig(env) {
  try {
    let configPath = path.join(CONFIG_PATH, env + '.yml');
    let configYaml = fs.readFileSync(configPath).toString();
    return YAML.parse(configYaml);
  }
  catch (e) {
    if (env !== 'local') {
      console.warn(
        chalk.yellow('Could not load environment configuration file'),
        chalk.magenta(env + '.yml')
      );
    }
    return {};
  }
}
