
/**
 * Module definition and dependencies
 */
angular.module('Shared.Log.Filter', [])

/**
 * Filter definition
 */
.filter('log', function($log) {
  return function(item) {
    $log.log(item);
    return '';
  };
});
