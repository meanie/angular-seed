
/**
 * Module definition and dependencies
 */
angular.module('App.Auth.AuthInterceptor.Service', [])

/**
 * Interceptor service
 */
.factory('AuthInterceptor', function($injector) {

  //Service placeholders
  let Auth, $http;

  /**
   * Determine if this is a HTML template request
   */
  function isTemplateRequest(request) {
    return (request && request.url.indexOf('.html') !== -1);
  }

  /**
   * Helper to retry a http request
   */
  function retryHttpRequest(request) {

    //Get http service
    $http = $http || $injector.get('$http');

    //Make sure this retry is not captured by duplicate requests filters
    request.ignoreDuplicateRequest = true;

    //Retry the request
    return $http(request);
  }

  /**
   * Append the access token to the headers of a http configuration object
   */
  function appendAccessToken(request) {

    //Get auth service
    Auth = Auth || $injector.get('Auth');

    //Initialize headers if needed
    request.headers = request.headers || {};

    //Get access token and append to header if present
    let accessToken = Auth.getAccessToken();
    if (accessToken) {
      request.headers.Authorization = 'Bearer ' + accessToken;
    }

    //Return request config
    return request;
  }

  /**
   * Interceptor object
   */
  return {

    /**
     * Append access token header to request
     */
    request(request) {

      //Don't append to template requests
      if (isTemplateRequest(request)) {
        return request;
      }

      //Append access token to headers
      request = appendAccessToken(request);

      //Append access token
      return request;
    },

    /**
     * Intercept 401 responses
     */
    responseError(error) {

      //Not a 401 or ignoring interception?
      if (error.status !== 401 || error.config.ignore401Intercept) {
        throw error;
      }

      //Get auth service
      Auth = Auth || $injector.get('Auth');

      //Try to obtain a new authentication token
      return Auth
        .refresh()
        .then(() => retryHttpRequest(error.config))
        .catch(error => {
          if (error.status === 401) {
            Auth.logout(true);
          }
          throw error;
        });
    },
  };
});
