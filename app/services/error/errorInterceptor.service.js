
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error.ErrorInterceptor.Service', [
  'Shared.Error.Types.ResponseError.Service'
])

/**
 * Interceptor service
 */
.factory('ErrorInterceptor', function($q, $rootScope, ResponseError) {
  return {
    responseError: function(response) {

      //Create response error
      var error = new ResponseError(response);

      //Broadcast it
      if (response.status >= 400 && response.status <= 499) {
        $rootScope.$broadcast('error.clientError', error);
      }
      else if (response.status >= 500 && response.status <= 599) {
        $rootScope.$broadcast('error.serverError', error);
      }

      //Return as rejection
      return $q.reject(error);
    }
  };
});
