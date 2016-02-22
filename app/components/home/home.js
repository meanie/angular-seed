
/**
 * Module definition and dependencies
 */
angular.module('App.Home', [
  'App.Home.Controller'
])

/**
 * Config
 */
.config(function($stateProvider) {

  //State definition
  $stateProvider.state('home', {
    parent: 'app',
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    templateUrl: 'home/home.html'
  });
});
