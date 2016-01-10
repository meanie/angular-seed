
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error.ValidationErrorHandler.Service', [])

/**
 * Service definition
 */
.factory('ValidationErrorHandler', function() {
  return {

    /**
     * Set fields validity based on validation errors
     */
    setFieldsValidity: function(form, error) {
      if (error.data.fields) {
        for (var field in error.data.fields) {
          if (error.data.fields.hasOwnProperty(field) && form[field]) {
            var type = error.data.fields[field].type;
            form[field].$setValidity(type, false);
          }
        }
      }
    }
  };
});
