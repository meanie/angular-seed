
/**
 * Module definition and dependencies
 */
angular.module('App.Auth', [
  'App.Auth.Service',
  'App.Auth.Token.Model',
  'App.Auth.AuthInterceptor.Service',
])

/**
 * Config
 */
.config(($httpProvider, TokenProvider, Config) => {

  //Add auth interceptor (must be before the error interceptor)
  $httpProvider.interceptors.unshift('AuthInterceptor');

  //Configure token provider
  TokenProvider.setClientId(Config.AUTH_CLIENT_IDENTIFIER);
})

/**
 * Run logic
 */
.run(($interval, $state, $log, $transitions, Auth) => {

  /**
   * Check token expiration
   */
  $interval(() => {
    if (Auth.isAuthenticated() && Auth.isExpired()) {
      Auth.refresh().catch(() => Auth.logout(true));
    }
  }, 10000);

  /**
   * Authentication guard
   */
  $transitions.onBefore({
    to(state) {
      return (state.data && state.data.auth === true);
    },
  }, transition => {

    //Get roles
    const to = transition.to();
    const roles = to.data.roles;
    const target = transition.targetState();

    //Not authenticated?
    if (!Auth.isAuthenticated()) {
      $log.info('State', to.name, 'requires authentication.');
      return Auth
        .refresh()
        .then(() => $state.target(target))
        .catch(() => Auth.goToLoginState(target));
    }

    //Specific roles only?
    if (roles && !roles.some(role => Auth.hasRole(role))) {
      $log.info('State', to.name, 'is role restricted.');
      return transition.router.stateService.target('home');
    }
  });

  /**
   * Remember last successful transition
   */
  $transitions.onSuccess({}, transition => {
    Auth.setLastState(transition.targetState());
  });
});
