
/**
 * Module definition and dependencies
 */
angular.module('Shared.Moment.Filter', [])

/**
 * Filter definitions
 */
.filter('moment', function(moment, Config) {
  return function(date, format, relative) {
    if (!moment.isMoment(date)) {
      if (!date) {
        return '';
      }
      date = moment(date);
      if (!date.isValid()) {
        return '';
      }
    }
    if (relative) {
      let now = moment();
      if (now.isSame(date, 'day')) {
        return 'Today';
      }
      if (now.add(1, 'day').isSame(date, 'day')) {
        return 'Tomorrow';
      }
    }
    return date.format(format || Config.DATE_STANDARD);
  };
})

/**
 * Filter definitions
 */
.filter('fromNow', function(moment) {
  return function(date) {
    if (!moment.isMoment(date)) {
      return '';
    }
    return date.fromNow();
  };
});
