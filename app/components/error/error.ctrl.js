
/**
 * Module definition and dependencies
 */
angular.module('App.Error.Controller', [])

/**
 * Controller
 */
.controller('ErrorCtrl', function($state, Errors, Auth) {

  /**
   * Initialize
   */
  this.$onInit = function() {

    //Get params
    const params = this.transition.params();
    const error = Errors.getLastError();

    //Set error and type in scope
    this.error = error;
    this.type = params.type;
    this.lastState = Errors.getLastState();

    //Flags
    this.hasLastState = !!this.lastState;
    this.isAuthenticated = Auth.isAuthenticated();
  };

  /**
   * Go to login state
   */
  this.goToLoginState = function() {
    Auth.goToLoginState();
  };

  /**
   * Go to last state
   */
  this.goToLastState = function() {

    //Get data
    const name = this.lastState.name();
    const params = this.lastState.params();

    //Go to state
    $state.target(name, params);
  };
});
