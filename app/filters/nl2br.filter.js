
/**
 * Module definition and dependencies
 */
angular.module('Shared.Text.Nl2br.Filter', [])

/**
 * Filter definitions
 */
.filter('nl2br', () => {
  return function(text) {
    if (typeof text === 'number') {
      return String(text);
    }
    else if (typeof text !== 'string') {
      return '';
    }
    if ((text = String(text)) === '') {
      return '';
    }
    return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>');
  };
});
