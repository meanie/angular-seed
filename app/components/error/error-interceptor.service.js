
/**
 * Module definition and dependencies
 */
angular.module('App.Error.ErrorInterceptor.Service', [])

/**
 * Interceptor service
 */
.factory('ErrorInterceptor', function($q, $rootScope, ErrorTypes) {

  /**
   * Get error class for given response status
   */
  function getErrorClass(status) {

    //Unauthenticated errors
    if (status === 401) {
      return ErrorTypes.NotAuthenticatedError;
    }

    //Unauthorized errors
    else if (status === 403) {
      return ErrorTypes.NotAuthorizedError;
    }

    //Not found errors
    else if (status === 404) {
      return ErrorTypes.NotFoundError;
    }

    //Validation errors
    else if (status === 422) {
      return ErrorTypes.ValidationError;
    }

    //System fault errors
    else if (status === 503) {
      return ErrorTypes.SystemFaultError;
    }

    //Request timeout
    else if (status === 408 || status === 504) {
      return ErrorTypes.TimeoutError;
    }

    //Generic client errors
    else if (status >= 400 && status <= 499) {
      return ErrorTypes.ClientError;
    }

    //Server errors
    else if (status >= 500 && status <= 599) {
      return ErrorTypes.ServerError;
    }

    //Generic errors
    return ErrorTypes.ResponseError;
  }

  /**
   * Interceptor
   */
  return {

    /**
     * Response error handling
     */
    responseError(response) {

      //Determine error class and create new error
      let ErrorClass = getErrorClass(response.status);
      let error = new ErrorClass(response);

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
