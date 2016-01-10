
/**
 * Module definition and dependencies
 */
angular.module('App.Home.Component', [
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
    templateUrl: 'home/home.html'
  });
});
