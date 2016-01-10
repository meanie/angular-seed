
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
.run(function($rootScope, $analytics, Config) {

  //Expose configuration in root scope
  $rootScope.Config = Config;

  //Use analytics
  if ($analytics.isEnabled()) {

    //Create site wide tracker
    $analytics.create(Config.ANALYTICS_TRACKING_ID);

    //On state changes, track page views
    $rootScope.$on('$stateChangeSuccess', function() {
      $analytics.track.pageview();
    });
  }
});
