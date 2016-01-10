
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error.LogInterceptor.Service', [])

/**
 * Interceptor service
 */
.factory('LogInterceptor', function($rootScope, $log, $q) {

  /**
   * Determine if this is a HTML template request
   */
  function isTemplateRequest(request) {
    return (request && request.url.indexOf('.html') !== -1);
  }

  /**
   * Interceptor object
   */
  return {

    /**
     * Log requests
     */
    request: function(request) {

      //Log non-template requests
      if (!isTemplateRequest(request)) {
        $log.info(request.method, request.url);
      }

      //Return for further handling
      return request;
    },

    /**
     * Log successful responses
     */
    response: function(response) {

      //Get request
      var request = response.config;

      //Log non template request responses
      if (request && !isTemplateRequest(request)) {
        $log.log(request.method, request.url, response.status, response.statusText || '');
        if (response.data && Object.keys(response.data).length > 0) {
          $log.debug(response.data);
        }
      }

      //Return response
      return response;
    },

    /**
     * Log error responses
     */
    responseError: function(rejection) {

      //Get request
      var request = rejection.config;

      //Log non template request responses
      if (request && !isTemplateRequest(request)) {
        $log.error(request.method, request.url, rejection.status, rejection.statusText || '');
        if (rejection.data && Object.keys(rejection.data).length > 0) {
          $log.debug(rejection.data);
        }
      }

      //Return rejection
      return $q.reject(rejection);
    }
  };
});
