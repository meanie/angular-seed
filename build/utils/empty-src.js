'use strict';

/**
 * Check if a given source is empty
 */
module.exports = function emptySrc(source) {
  return (!source || (Array.isArray(source) && source.length === 0));
};
