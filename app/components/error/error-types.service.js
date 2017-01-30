
/**
 * Module definition and dependencies
 */
angular.module('App.Error.ErrorTypes.Service', [])

/**
 * Base error
 */
.factory('BaseError', function() {

  /**
   * Constructor
   */
  function BaseError(code, message, data) {

    //Paremeter juggling
    if (typeof message === 'object') {
      data = message;
      message = '';
    }

    //Set properties
    this.code = code;
    this.message = message || '';
    this.data = data || {};
    this.stack = Error().stack;
  }

  /**
   * Extend error prototype
   */
  BaseError.prototype = Object.create(Error.prototype);
  BaseError.prototype.constructor = BaseError;

  //Return class
  return BaseError;
})

/**
 * Generic response error
 */
.factory('ResponseError', function(BaseError) {

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

    //Get error data and call parent constructor
    let error = response.data || {};
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
})

/**
 * Generic client error
 */
.factory('ClientError', function(ResponseError) {
  function ClientError(response) {
    ResponseError.call(this, response);
  }
  ClientError.prototype = Object.create(ResponseError.prototype);
  ClientError.prototype.constructor = ClientError;
  ClientError.prototype.name = 'ClientError';
  return ClientError;
})

/**
 * Generic server error
 */
.factory('ServerError', function(ResponseError) {
  function ServerError(response) {
    ResponseError.call(this, response);
  }
  ServerError.prototype = Object.create(ResponseError.prototype);
  ServerError.prototype.constructor = ServerError;
  ServerError.prototype.name = 'ServerError';
  return ServerError;
})

/**
 * Network error
 */
.factory('NetworkError', function(ResponseError) {
  function NetworkError(response) {
    ResponseError.call(this, response);
  }
  NetworkError.prototype = Object.create(ResponseError.prototype);
  NetworkError.prototype.constructor = NetworkError;
  NetworkError.prototype.name = 'NetworkError';
  return NetworkError;
})

/**
 * Not authenticated error
 */
.factory('NotAuthenticatedError', function(ClientError) {
  function NotAuthenticatedError(response) {
    ClientError.call(this, response);
  }
  NotAuthenticatedError.prototype = Object.create(ClientError.prototype);
  NotAuthenticatedError.prototype.constructor = NotAuthenticatedError;
  NotAuthenticatedError.prototype.name = 'NotAuthenticatedError';
  return NotAuthenticatedError;
})

/**
 * Not authorized error
 */
.factory('NotAuthorizedError', function(ClientError) {
  function NotAuthorizedError(response) {
    ClientError.call(this, response);
  }
  NotAuthorizedError.prototype = Object.create(ClientError.prototype);
  NotAuthorizedError.prototype.constructor = NotAuthorizedError;
  NotAuthorizedError.prototype.name = 'NotAuthorizedError';
  return NotAuthorizedError;
})

/**
 * Not authorized error
 */
.factory('NotAuthorizedError', function(ClientError) {
  function NotAuthorizedError(response) {
    ClientError.call(this, response);
  }
  NotAuthorizedError.prototype = Object.create(ClientError.prototype);
  NotAuthorizedError.prototype.constructor = NotAuthorizedError;
  NotAuthorizedError.prototype.name = 'NotAuthorizedError';
  return NotAuthorizedError;
})

/**
 * Not found error
 */
.factory('NotFoundError', function(ClientError) {
  function NotFoundError(response) {
    ClientError.call(this, response);
  }
  NotFoundError.prototype = Object.create(ClientError.prototype);
  NotFoundError.prototype.constructor = NotFoundError;
  NotFoundError.prototype.name = 'NotFoundError';
  return NotFoundError;
})

/**
 * Exists error
 */
.factory('ExistsError', function(ClientError) {
  function ExistsError(response) {
    ClientError.call(this, response);
  }
  ExistsError.prototype = Object.create(ClientError.prototype);
  ExistsError.prototype.constructor = ExistsError;
  ExistsError.prototype.name = 'ExistsError';
  return ExistsError;
})

/**
 * Validation error
 */
.factory('ValidationError', function(ClientError) {
  function ValidationError(response) {
    ClientError.call(this, response);
  }
  ValidationError.prototype = Object.create(ClientError.prototype);
  ValidationError.prototype.constructor = ValidationError;
  ValidationError.prototype.name = 'ValidationError';
  ValidationError.prototype.setFieldsValidity = function(form) {
    if (this.data.fields) {
      for (let field in this.data.fields) {
        if (this.data.fields.hasOwnProperty(field) && form[field]) {
          let type = this.data.fields[field].type;
          form[field].$setValidity(type, false);
        }
      }
    }
  };
  return ValidationError;
})

/**
 * Timeout error
 */
.factory('TimeoutError', function(ResponseError) {
  function TimeoutError(response) {
    ResponseError.call(this, response);
  }
  TimeoutError.prototype = Object.create(ResponseError.prototype);
  TimeoutError.prototype.constructor = TimeoutError;
  TimeoutError.prototype.name = 'TimeoutError';
  return TimeoutError;
});
