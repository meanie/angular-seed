
/**
 * Module definition and dependencies
 */
angular.module('Shared.Moment.Service', [])

/**
 * Service
 */
.factory('moment', function($window) {

  //Get moment object from window
  let moment = $window.moment || null;
  if (!moment) {
    throw new Error('Missing moment library. Did you load it in your page?');
  }

  //Get prototype
  let proto = Object.getPrototypeOf(moment());

  /**
   * Get minutes since midnight
   */
  proto.getTime = function() {
    return this.diff(this.clone().startOf('day'), 'minutes');
  };

  /**
   * Set time as minutes since midnight
   */
  proto.setTime = function(time) {
    return this.startOf('day').add(time, 'minutes');
  };

  //Return moment
  return moment;
});
