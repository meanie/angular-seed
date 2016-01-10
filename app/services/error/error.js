
/**
 * Module definition and dependencies
 */
angular.module('Shared.Error', [
  'Shared.Error.ErrorInterceptor.Service',
  'Shared.Error.LogInterceptor.Service',
  'Shared.Error.ValidationErrorHandler.Service'
])

/**
 * Configuration
 */
.config(function($provide, $httpProvider) {

  //Http interceptors (error interceptor should be last)
  $httpProvider.interceptors.push('LogInterceptor');
  $httpProvider.interceptors.push('ErrorInterceptor');

  //Exception handling
  $provide.decorator('$exceptionHandler', ['$log', '$delegate', function($log, $delegate) {
    return function(exception, cause) {
      $delegate(exception, cause);
    };
  }]);
})

/**
 * Run logic
 */
.run(function($rootScope, $log) {

  //Log successful state changes
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    $log.log('STATE:', toState.name, Object.keys(toParams).length ? toParams : '');
  });

  //Log state change errors
  $rootScope.$on('$stateChangeError', function(
    event, toState, toParams, fromState, fromParams, error
  ) {
    $log.error('Could not transition to state', toState.name + ':', error);
  });
});
