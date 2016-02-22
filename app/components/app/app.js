
/**
 * Module definition and dependencies
 */
angular.module('App.Component', [
  'App.Controller'
])

/**
 * Application configuration
 */
.config(function($stateProvider) {

  //App base state
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    templateUrl: 'app/app.html',
    controller: 'AppCtrl'
  });
})

/**
 * Run logic
 */
.run(function($rootScope, Config) {

  //Expose configuration in root scope
  $rootScope.Config = Config;
});
