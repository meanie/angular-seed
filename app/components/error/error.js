
/**
 * Module definition and dependencies
 */
angular.module('App.Error', [
  'App.Error.ErrorTypes.Service',
  'App.Error.ErrorInterceptor.Service'
])

/**
 * Configuration
 */
.config(function(
  $provide, $apiProvider, $httpProvider, Config
) {

  //Error reporting route
  $apiProvider.registerEndpoint('error', {
    actions: {
      report: {
        method: 'POST'
      }
    }
  });

  //Error interceptor
  $httpProvider.interceptors.push('ErrorInterceptor');

  //Exception handling
  $provide.decorator('$exceptionHandler', [
    '$log', '$delegate', '$injector',
    function($log, $delegate, $injector) {
      return (exception, cause) => {

        //Clean up stack trace
        let urlRegex = new RegExp(Config.APP_BASE_URL + '/', 'gi');
        exception.stack = exception.stack.replace(urlRegex, '');

        //Report error
        if (Config.ERROR_REPORTING_ENABLED) {

          //Get services
          let $api = $injector.get('$api');
          let $location = $injector.get('$location');

          //Report error
          $api.error.report({
            message: exception.message,
            stack: exception.stack,
            context: {
              clientUrl: $location.absUrl()
            }
          });
        }

        //Delegate to standard handler
        $delegate(exception, cause);
      };
    }]);
})

/**
 * Run logic
 */
.run(function($rootScope, $log) {

  //Log state changes
  $rootScope.$on('$stateChangeSuccess', (
    event, toState, toParams
  ) => {
    $log.info(
      'STATE:', toState.name, Object.keys(toParams).length ? toParams : ''
    );
  });

  //Handle state change errors
  $rootScope.$on('$stateChangeError', (
    event, toState, toParams, fromState, fromParams, error
  ) => {
    $log.error('Could not transition to state', toState.name + ':', error);
  });
});
