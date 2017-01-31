
/**
 * Module definition and dependencies
 */
angular.module('App.Error', [
  'App.Error.Controller',
  'App.Error.Errors.Service',
  'App.Error.ErrorTypes.Service',
  'App.Error.ErrorInterceptor.Service',
])

/**
 * Configuration
 */
.config(($provide, $httpProvider, $stateProvider, Config) => {

  //Error interceptor
  $httpProvider.interceptors.push('ErrorInterceptor');

  //Initialize sentry
  if (Config.SENTRY_DSN && typeof Raven !== 'undefined') {
    Raven.config(Config.SENTRY_DSN, {
      release: Config.APP_VERSION,
      environment: Config.ENV,
      tags: {origin: Config.SENTRY_ORIGIN, revision: Config.APP_REVISION},
      ignoreErrors: [],
    }).install();
  }

  //Exception handling
  $provide.decorator('$exceptionHandler', [
    '$log', '$injector',
    function($log, $injector) {
      return exception => {

        //Process with Sentry
        if (Config.SENTRY_DSN && typeof Raven !== 'undefined') {
          let $location = $injector.get('$location');
          Raven.captureException(exception, {
            extra: {
              clientUrl: $location.absUrl(),
            },
          });
        }

        //Log error
        $log.error(exception);
      };
    }]);

  //State definition
  $stateProvider.state('error', {
    parent: 'app',
    url: '/error/:type',
    data: {
      auth: false,
    },
    component: 'errorRoute',
  });
})

/**
 * Component definition
 */
.component('errorRoute', {
  templateUrl: 'error/error.html',
  controller: 'ErrorCtrl',
  bindings: {
    transition: '<',
  },
})

/**
 * Run logic
 */
.run(($transitions, $state, Errors, BaseError) => {

  //Default error handler
  $state.defaultErrorHandler(error => {
    if (error instanceof BaseError) {
      Errors.show(error);
    }
  });

  //Remember last state
  $transitions.onSuccess({
    to(state) {
      return (state.name !== 'error');
    },
  }, transition => {
    Errors.setLastState(transition.targetState());
  });
});
