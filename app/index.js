
/**
 * Module definition and dependencies
 */
angular.module('App', [

  //Angular & 3rd party
  'ui.router',

  //Meanie modules
  'Api.Service',
  'Log.Service',

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
  $locationProvider, $urlRouterProvider, $httpProvider,
  $apiProvider, $logProvider, Config
) {

  //Determine app base url
  if (!Config.APP_BASE_URL) {
    let port = Config.APP_PORT || window.location.port;
    Config.APP_BASE_URL =
      window.location.protocol + '//' + window.location.hostname +
      ((port !== 80) ? (':' + port) : '') + (Config.APP_BASE_PATH || '');
  }

  //Determine API base url
  if (!Config.API_BASE_URL) {
    let port = Config.API_PORT || window.location.port;
    Config.API_BASE_URL =
      window.location.protocol + '//' + window.location.hostname +
      ((port !== 80) ? (':' + port) : '') + (Config.API_BASE_PATH || '');
  }

  //Enable HTML 5 mode browsing and set default route
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  //Disable legacy $http promise methods and set default headers
  $httpProvider.useLegacyPromiseExtensions = false;
  $httpProvider.defaults.headers.common['X-Version'] = Config.APP_VERSION;

  //Configure API (escape port number)
  $apiProvider.setBaseUrl(Config.API_BASE_URL);
  $apiProvider.setVerbose(Config.ENV === 'dev');
  $apiProvider.setDefaultModel('BaseModel');

  //Disable all console logging in production
  if (Config.ENV === 'prod') {
    $logProvider.disable('all');
  }
});
