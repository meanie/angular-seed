
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error.Types.ResponseError.Service', [
  'Shared.Error.Types.BaseError.Service'
])

/**
 * Service definition
 */
.factory('ResponseError', function(BaseError) {

  /**
   * Get error type for given response status
   */
  function getErrorName(status) {

    //Unauthenticated errors
    if (status === 401) {
      return 'UnauthenticatedError';
    }

    //Unauthorized errors
    else if (status === 403) {
      return 'UnauthorizedError';
    }

    //Not found errors
    else if (status === 404) {
      return 'NotFoundError';
    }

    //Request timeout
    else if (status === 408 || status === 504) {
      return 'TimeoutError';
    }

    //Generic client errors
    else if (status >= 400 && status <= 499) {
      return 'ClientError';
    }

    //Server errors
    else if (status >= 500 && status <= 599) {
      return 'ServerError';
    }

    //Generic errors
    return 'ResponseError';
  }

  /**
   * Constructor
   */
  function ResponseError(response) {

    //Validate response
    if (!response || typeof response !== 'object') {
      response = {};
    }

    //Set properties
    this.status = response.status || 500;
    this.config = response.config || {};
    this.name = getErrorName(this.status);

    //Get error data and call parent constructor
    var error = response.data || {};
    BaseError.call(this, error.code, error.message, error.data);
  }

  /**
   * Extend error prototype
   */
  ResponseError.prototype = Object.create(BaseError.prototype);
  ResponseError.prototype.constructor = ResponseError;
  ResponseError.prototype.name = 'ResponseError';

  //Return class
  return ResponseError;
});
