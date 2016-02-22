
/**
 * Module definition and dependencies
 */
angular.module('Shared.Moment.Filter', [])

/**
 * Filter definitions
 */
.filter('moment', function() {
  return function(date, format) {
    if (!date || typeof date !== 'object' || typeof date.format !== 'function') {
      return '';
    }
    return date.format(format || 'DD-MM-YYYY');
  };
});
