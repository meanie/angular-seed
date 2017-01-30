
/**
 * Module definition and dependencies
 */
angular.module('App.Auth.Service', [])

/**
 * Service definition
 */
.factory('Auth', function(
  $q, $state, $store, $analytics, $window, $timeout, Token
) {

  //Helper vars
  let refreshPromise = null;

  /**
   * Service class
   */
  const Auth = {

    //Token model instance
    token: null,
    redirectState: null,
    lastState: null,

    /**
     * Check if we're currently authenticated
     */
    isAuthenticated() {
      return (this.token && this.token.isValid());
    },

    /**
     * Check if expired
     */
    isExpired() {
      return (this.token && this.token.isExpired());
    },

    /**
     * Check if about to expire
     */
    isExpiring(offset = 60) {
      return (this.token && this.token.isExpiring(offset));
    },

    /**
     * Has role check
     */
    hasRole(role) {
      return (this.isAuthenticated() && this.token.hasRole(role));
    },

    /**
     * Has secure status check
     */
    hasSecureStatus() {
      return (this.isAuthenticated() && this.token.hasSecureStatus());
    },

    /**************************************************************************
     * Access token management
     ***/

    /**
     * Get raw access token string
     */
    getAccessToken() {
      if (this.token) {
        return this.token.accessToken;
      }
      return '';
    },

    /**
     * Validate access token
     */
    validateAccessToken(accessToken) {

      //Create token model
      const token = new Token(accessToken);

      //Check if valid
      if (!token.isValid()) {
        throw new Error('Invalid access token');
      }

      //Check if expired
      if (token.isExpired()) {
        throw new Error('Expired access token');
      }

      //Return model
      return token;
    },

    /**************************************************************************
     * State management
     ***/

    /**
     * Go to login state
     */
    goToLoginState(redirectState, loginParams) {

      //Remember redirect state
      this.redirectState = redirectState || null;

      //Already authenticated? Go straight to redirect state
      if (this.isAuthenticated()) {
        return this.goToPostLoginState();
      }

      //Redirect to login state
      return $state.go('login', loginParams || null);
    },

    /**
     * Go to post login state
     */
    goToPostLoginState() {

      //No state? Go gome
      if (!this.redirectState) {
        return $state.go('home');
      }

      //Get data
      const name = this.redirectState.name();
      const params = this.redirectState.params();

      //Redirect
      return $state
        .go(name, params)
        .then(() => this.redirectState = null);
    },

    /**
     * Set last successful target state
     */
    setLastState(state) {
      this.lastState = state;
    },

    /**************************************************************************
     * Login and logout
     ***/

    /**
     * Login with credentials
     */
    loginWithCredentials(credentials, remember) {
      return Token
        .obtain('password', credentials, remember)
        .then(token => this.validateAccessToken(token))
        .then(token => this.onAuthenticated(token))
        .then(() => this.goToPostLoginState());
    },

    /**
     * Login with token
     */
    loginWithToken(token) {
      return $q
        .resolve()
        .then(() => this.validateAccessToken(token))
        .then(token => this.onAuthenticated(token))
        .then(() => this.goToPostLoginState());
    },

    /**
     * Logout
     */
    logout(isAutomatic) {

      //Logout on server
      return Token
        .forget()
        .catch(() => true) //NOTE: not ideal, but best to at least logout
        .then(() => this.onUnauthenticated(isAutomatic));
    },

    /**
     * Refresh
     */
    refresh() {

      //Already refreshing?
      if (refreshPromise) {
        return refreshPromise;
      }

      //Obtain token from server
      return refreshPromise = Token
        .obtain('refresh_token')
        .then(token => this.validateAccessToken(token))
        .then(token => this.onAuthenticated(token, false))
        .finally(() => refreshPromise = null);
    },

    /**
     * Re-authenticate
     */
    reAuthenticate(credentials, secure) {

      //Append secure status if needed
      if (secure) {
        credentials.secureStatus = true;
      }

      //Obtain new token with secure status
      return Token
        .obtain('password', credentials)
        .then(token => this.validateAccessToken(token))
        .then(token => this.onAuthenticated(token, false));
    },

    /**************************************************************************
     * Auth status change handlers
     ***/

    /**
     * On authenticated
     */
    onAuthenticated(token, refresh = true) {

      //Set token model
      this.token = token;

      //Refresh user/club data if needed
      if (refresh) {
        $store.club.get(true);
        $store.user.get(true).then(user => $analytics.set.userId(user.id));
      }

      //Otherwise just return the token
      return this.token;
    },

    /**
     * On unauthenticated
     */
    onUnauthenticated(isAutomatic) {

      //Clear token model
      this.token = null;

      //Clear stores
      for (const key in $store) {
        if (key !== 'club' && $store.hasOwnProperty(key) && $store[key].clear) {
          $store[key].clear();
        }
      }

      //Go to login state
      this.goToLoginState(this.lastState, {
        status: isAutomatic ? 'session-expired' : null,
      });
    },

    /**************************************************************************
     * Init
     ***/

    /**
     * Initialize
     */
    init() {

      //Find existing access token and validate it. If invalid, clear.
      Token
        .existing()
        .then(token => this.validateAccessToken(token))
        .then(token => this.onAuthenticated(token))
        .catch(() => Token.clear());
    },
  };

  //Init
  Auth.init();

  //Handle storage events
  angular.element($window).on('storage', () => {
    $timeout(() => {

      //Compare access tokens
      const oldAccessToken = Auth.getAccessToken();
      const newAccessToken = Token.read();

      //If the same, ignore
      if (oldAccessToken === newAccessToken) {
        return;
      }

      //If cleared, logout
      if (!newAccessToken) {
        return Auth.logout(true);
      }

      //Otherwise, initialize with new access token and redirect to home
      Auth.init();
      Auth.goToPostLoginState();
    });
  });

  //Return
  return Auth;
});
