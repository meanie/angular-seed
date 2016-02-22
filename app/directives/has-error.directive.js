
/**
 * Module definition and dependencies
 */
angular.module('Shared.HasError.Directive', [])

/**
 * Marks a form group with has-error class given standard validation conditions
 */
.directive('hasError', function() {
  return {
    restrict: 'A',
    scope: {
      field: '=hasError',
      showError: '='
    },
    link(scope, element) {
      scope.$watchGroup([
        'field.$$parentForm.$submitted',
        'field.$invalid',
        'showError'
      ], ([isSubmitted, isInvalid, showError]) => {
        if ((isSubmitted || showError) && isInvalid) {
          element.addClass('has-error');
        }
        else {
          element.removeClass('has-error');
        }
      });
    }
  };
});
