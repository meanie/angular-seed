
/**
 * Module definition and dependencies
 */
angular.module('App.Home.Controller', [])

/**
 * Controller
 */
.controller('HomeCtrl', function(moment) {

  /**
   * On init
   */
  this.$onInit = function() {

    //Set date
    this.now = moment();
  };
});
