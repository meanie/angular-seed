
/**
 * Module definition and dependencies
 */
angular.module('Shared.Log.Filter', [])

/**
 * Filter definition
 */
.filter('log', $log => {
  return function(item) {
    $log.log(item);
    return '';
  };
});
