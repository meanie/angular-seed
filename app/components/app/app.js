
/**
 * Module definition and dependencies
 */
angular.module('App.Component', [
  'App.Controller',
  'App.Header.Component',
  'App.Footer.Component',
])

/**
 * Application configuration
 */
.config((
  $locationProvider, $urlServiceProvider, $httpProvider, $analyticsProvider,
  $apiProvider, $logProvider, $qProvider, $stateProvider, Config
) => {

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

  //Disable unhandled rejection warnings
  $qProvider.errorOnUnhandledRejections(false);

  //Enable HTML 5 mode browsing and set default route
  $locationProvider.html5Mode(true);
  $urlServiceProvider.rules.otherwise('/error/page-not-found');

  //Disable legacy $http promise methods and set default headers
  $httpProvider.useLegacyPromiseExtensions = false;
  $httpProvider.defaults.headers.common['X-Version'] = Config.APP_VERSION;

  //Configure API (escape port number)
  $apiProvider.setBaseUrl(Config.API_BASE_URL);
  $apiProvider.setDefaultModel('$baseModel');
  $apiProvider.setEnforceDataFormat(Config.API_ENFORCE_DATA_FORMAT);
  $apiProvider.setConfig('timeout', Config.API_NETWORK_TIMEOUT * 1000);
  $apiProvider.setVerbose(Config.ENV === 'dev');

  //Configure analytics
  $analyticsProvider.setEnabled(
    Config.ANALYTICS_ENABLED && Config.ANALYTICS_TRACKING_ID
  );

  //Disable all console logging in production
  if (Config.ENV === 'production') {
    $logProvider.disable('all');
  }

  //App base state
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    data: {
      auth: false,
    },
    component: 'appRoute',
  });
})

/**
 * Route component
 */
.component('appRoute', {
  templateUrl: 'app/app.html',
  controller: 'AppCtrl',
  bindings: {},
})

/**
 * Run logic
 */
.run(($log, $analytics, $rootScope, $trace, $transitions, Config) => {

  //Log info to console
  $log.info(Config.ENV, 'v' + Config.APP_VERSION, Config.APP_REVISION);

  //Create site wide tracker
  if ($analytics.isEnabled()) {
    $analytics.create(Config.ANALYTICS_TRACKING_ID);
    $analytics.set.appName(Config.APP_NAME);
    $analytics.set.appVersion(Config.APP_VERSION);
  }

  //Set config in prototype of scope
  const protoScope = Object.getPrototypeOf($rootScope);
  for (const key in Config) {
    if (Config.hasOwnProperty(key)) {
      protoScope[key] = Config[key];
    }
  }

  //Enable transition trace
  if (Config.ENV === 'dev') {
    $trace.enable('TRANSITION');
  }

  /**
   * Before hook for transitions
   */
  $transitions.onBefore({}, transition => {

    //Add resolvable alias for $transition$
    transition.addResolvable({
      token: 'transition',
      resolveFn: () => transition,
    });

    //Get to and from states
    const to = transition.to();
    const from = transition.from();

    //Prevent navigation to certain states from initial requests
    if (to.data.notInitial && !from.name) {
      $log.warn('State', to.name, 'cannot be accessed directly.');
      return transition.router.stateService.target('home');
    }
  });

  /**
   * Success hook for transitions
   */
  $transitions.onSuccess({}, () => {

    //Track page views
    if ($analytics.isEnabled()) {
      $analytics.set.page();
      $analytics.track.pageview();
    }
  }, {priority: 100});
});
