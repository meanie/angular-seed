
/**
 * Module definition and dependencies
 */
angular.module('App.Error.Errors.Service', [])

/**
 * Errors service
 */
.factory('Errors', function(
  ResponseError, NetworkError, ServerError, ClientError,
  NotAuthenticatedError, NotAuthorizedError, NotFoundError,
  ValidationError, TimeoutError, ExistsError, $injector, $q
) {

  //Services
  let $modal, $state, Auth, lastState, lastError;

  /**
   * Error store interface
   */
  return {

    /**
     * Remember last state
     */
    setLastState(state) {
      lastState = state;
    },

    /**
     * Get last state
     */
    getLastState() {
      return lastState;
    },

    /**
     * Remember last error
     */
    setLastError(error) {
      lastError = error;
    },

    /**
     * Get last error
     */
    getLastError() {
      return lastError;
    },

    /**
     * Show an error
     */
    show(error) {

      //Get services
      $state = $state || $injector.get('$state');
      $modal = $modal || $injector.get('$modal');
      Auth = Auth || $injector.get('Auth');

      //Remember last error and get error type
      this.setLastError(error);
      const type = this.getType(error);

      //Open modal if applicable
      if ($state.current.name && $state.current.data
        && $state.current.data.auth && Auth.isAuthenticated()) {

        //Only open if not already open
        if ($modal.isOpen('error')) {
          return $q.resolve();
        }

        //Open modal
        return $modal.open('error', {
          locals: {model: {type, error}},
        });
      }

      //Get error type and go to error state
      return $state.go('error', {type});
    },

    /**
     * Get error type for given error
     */
    getType(error) {
      if (error instanceof ServerError) {
        return 'server';
      }
      else if (error instanceof NetworkError) {
        return 'network';
      }
      else if (error instanceof TimeoutError) {
        return 'timeout';
      }
      else if (error instanceof NotFoundError) {
        return 'page-not-found';
      }
      else {
        return 'other';
      }
    },

    /**
     * Get error class for given response status
     */
    getClass(status) {

      //Network error
      if (status === -1) {
        return NetworkError;
      }

      //Unauthenticated errors
      else if (status === 401) {
        return NotAuthenticatedError;
      }

      //Unauthorized errors
      else if (status === 403) {
        return NotAuthorizedError;
      }

      //Not found errors
      else if (status === 404) {
        return NotFoundError;
      }

      //Exists errors
      else if (status === 409) {
        return ExistsError;
      }

      //Validation errors
      else if (status === 422) {
        return ValidationError;
      }

      //Request timeout
      else if (status === 408 || status === 504) {
        return TimeoutError;
      }

      //Generic client errors
      else if (status >= 400 && status <= 499) {
        return ClientError;
      }

      //Server errors
      else if (status >= 500 && status <= 599) {
        return ServerError;
      }

      //Generic errors
      return ResponseError;
    },
  };
});
