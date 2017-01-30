
/**
 * Module definition and dependencies
 */
angular.module('App.Error.ErrorInterceptor.Service', [])

/**
 * Interceptor service
 */
.factory('ErrorInterceptor', function(
  Errors, NetworkError, TimeoutError, ServerError
) {

  /**
   * Interceptor
   */
  return {

    /**
     * Response error handling
     */
    responseError(response) {

      //Determine error class and create new error
      const ErrorClass = Errors.getClass(response.status);
      const error = new ErrorClass(response);

      //Network errors
      if (error instanceof NetworkError) {
        if (!response.config.ignoreNetworkError) {
          Errors.show(error);
        }
      }

      //Timeout errors
      else if (error instanceof TimeoutError) {
        if (!response.config.ignoreTimeoutError) {
          Errors.show(error);
        }
      }

      //Server errors
      else if (error instanceof ServerError) {
        Errors.show(error);
      }

      //Rethrow other errors
      throw error;
    },
  };
});
