
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error.Types.BaseError.Service', [])

/**
 * Service definition
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
  BaseError.prototype.name = 'Error';

  //Return class
  return BaseError;
});
