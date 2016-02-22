
/**
 * Module definition and dependencies
 */
angular.module('Shared.Partial.Directive', [])

/**
 * Directive
 */
.directive('partial', function() {
  return {
    restrict: 'AE',
    scope: false,
    templateUrl(element, attrs) {
      return attrs.url;
    }
  };
});
