
/**
 * Module definition and dependencies
 */
angular.module('App.Auth.Token.Model', [
  'BaseModel.Service',
])

/**
 * Config
 */
.config($apiProvider => {
  $apiProvider.registerEndpoint('auth', {
    url: 'auth',
    actions: {
      token: {
        url: 'token',
        method: 'POST',
        model: false,
        ignore401Intercept: true,
        withCredentials: true, //NOTE: for cross domain refresh token cookie
      },
      forget: {
        url: 'forget',
        method: 'GET',
        model: false,
        ignore401Intercept: true,
        withCredentials: true, //NOTE: for cross domain refresh token cookie
      },
    },
  });
})

/**
 * Provider definition
 */
.provider('Token', function TokenProvider() {

  //Client ID
  this.clientId = '';

  /**
   * Set client ID
   */
  this.setClientId = function(clientId) {
    this.clientId = clientId;
    return this;
  };

  /**
   * Service getter
   */
  this.$get = function($q, $api, $convert, $baseModel, $storage, moment) {

    //Config
    const clientId = this.clientId;

    //Token promise
    let tokenPromise = null;

    /**
     * Constructor
     */
    function Token(accessToken) {

      //Get payload
      const payload = Token.decode(accessToken);
      if (!payload) {
        return;
      }

      //Remember raw access token string
      this.accessToken = accessToken;

      //Call parent constructor
      $baseModel.call(this, payload);
    }

    //Extend base model
    angular.extend(Token.prototype, $baseModel.prototype);

    /**
     * From JSON
     */
    Token.prototype.fromJSON = function(json) {

      //Call parent method
      $baseModel.prototype.fromJSON.call(this, json);

      //Parse expiry and issued at values
      this.exp = moment.unix(this.exp);
      this.iat = moment.unix(this.iat);

      //Parse roles
      if (!angular.isArray(this.roles)) {
        this.roles = (this.roles || '').split(' ');
      }

      //Return self
      return this;
    };

    /**
     * Check if we have a certain role
     */
    Token.prototype.hasRole = function(role) {
      return (this.roles.indexOf(role) > -1);
    };

    /**
     * Check if we have secure status
     */
    Token.prototype.hasSecureStatus = function() {
      const now = moment();
      return (this.secureStatus && this.secureStatus.isAfter(now));
    };

    /**
     * Check if valid
     */
    Token.prototype.isValid = function() {
      return !!this.accessToken;
    };

    /**
     * Check if the token is expired
     */
    Token.prototype.isExpired = function() {
      const now = moment();
      return (this.exp && this.exp.isBefore(now));
    };

    /**
     * Check if the token is expiring
     */
    Token.prototype.isExpiring = function(offset) {
      const reference = moment().add(offset, 'seconds');
      return (this.exp && this.exp.isBefore(reference));
    };

    /**************************************************************************
     * Static methods
     ***/

    /**
     * Read access token from local storage
     */
    Token.read = function() {
      return $storage.local.get('auth.accessToken', '');
    };

    /**
     * Store access token
     */
    Token.store = function(accessToken) {
      const existing = Token.read();
      if (existing !== accessToken) {
        $storage.local.set('auth.accessToken', accessToken);
      }
      return accessToken;
    };

    /**
     * Clear access token
     */
    Token.clear = function() {
      $storage.local.remove('auth.accessToken');
    };

    /**
     * Decode token and get payload
     */
    Token.decode = function(accessToken) {

      //Nothing?
      if (!accessToken) {
        return null;
      }

      //Split in parts
      const parts = accessToken.split('.');
      if (parts.length !== 3) {
        return null;
      }

      //Get decoded payload
      try {
        const decoded = $convert.string.fromBase64(parts[1]);
        return angular.fromJson(decoded);
      }
      catch (e) {
        return null;
      }
    };

    /**
     * Get existing token from local storage, wrapped in a promise
     */
    Token.existing = function() {
      const accessToken = Token.read();
      return $q.resolve(accessToken);
    };

    /**
     * Obtain token from server
     */
    Token.obtain = function(grantType, data, remember) {

      //Already obtaining a token?
      if (tokenPromise) {
        return tokenPromise;
      }

      //Extend data
      data = data || {};
      angular.extend(data, {clientId, grantType, remember});

      //Get token from server
      return tokenPromise = $api.auth
        .token(data)
        .then(auth => Token.store(auth.accessToken))
        .finally(() => tokenPromise = null);
    };

    /**
     * Forget access token on server
     */
    Token.forget = function() {

      //Clear locally first
      Token.clear();

      //Forget on server
      return $api.auth.forget();
    };

    //Return
    return Token;
  };
});
