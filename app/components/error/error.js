
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
.config(function($provide, $httpProvider) {

  //Error interceptor
  $httpProvider.interceptors.push('ErrorInterceptor');

  //Exception handling
  $provide.decorator('$exceptionHandler', ['$log', '$delegate',
    function($log, $delegate) {
      return (exception, cause) => {
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
    $log.log(
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
