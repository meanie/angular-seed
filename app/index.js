
/**
 * Module definition and dependencies
 */
angular.module('App', [

  //Angular & 3rd party
  'ngAnimate',
  'ngSanitize',
  'ngMessages',
  'ui.router',

  //Common modules
  'Api.Service',
  'Log.Service',
  'Storage.Service',
  'Analytics.Service',

  //Core modules
  'App.Config',
  'App.Templates',
  'App.Component',
  'App.Controller',
  'App.Error',

  //App components
  'App.Home'
])

/**
 * Application configuration
 */
.config(function(
  $locationProvider, $urlRouterProvider, $httpProvider, $apiProvider,
  $storageProvider, $logProvider, $analyticsProvider, Config
) {

  //Enable HTML 5 mode browsing and set default route
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  //Disable legacy $http promise methods
  $httpProvider.useLegacyPromiseExtensions = false;

  //Configure API (escape port number)
  $apiProvider.setBaseUrl(Config.API_BASE_URL);
  $apiProvider.setVerbose(Config.API_VERBOSE);
  $apiProvider.setEnforceDataFormat(Config.API_ENFORCE_DATA_FORMAT);
  $apiProvider.setDefaultModel('BaseModel');

  //Configure storage
  $storageProvider.setPrefix(Config.APP_NAME);

  //Configure analytics
  $analyticsProvider.setEnabled(
    Config.ANALYTICS_ENABLED && Config.ANALYTICS_TRACKING_ID
  );

  //Disable all console logging in production
  if (Config.ENV === 'prod') {
    $logProvider.disable('all');
  }
});
