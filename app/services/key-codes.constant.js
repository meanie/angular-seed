
/**
 * Module definition and dependencies
 */
angular.module('Shared.KeyCodes.Constant', [])

/**
 * Constant definition
 */
.constant('KeyCodes', {
  //jscs: disable disallowMultipleSpaces

  //Basic
  BACKSPACE: 8,
  TAB:       9,
  CLEAR:     12,
  ENTER:     13,
  ESC:       27,
  SPACE:     32,

  //Navigation
  PAGEUP:    33,
  PAGEDOWN:  34,
  END:       35,
  HOME:      36,

  //Arrows
  LEFT:      37,
  UP:        38,
  RIGHT:     39,
  DOWN:      40,

  //
  INSERT:    45,
  DELETE:    46,

  //Modifiers
  SHIFT:     16,
  CTRL:      17,
  ALT:       18,
  BREAK:     19,
  CAPSLOCK:  20,
  CMDLEFT:   91,
  CMDRIGHT:  93,

  //Numeric keys (character codes)
  NUMERIC: [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57 //0-9
  ],

  //Alpha keys (character codes)
  ALPHA: [
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, //a-m
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90 //n-z
  ],

  //Control keys
  CONTROL: [
    8, 9, 12, 13, 27, //backspace, tab, clear, enter, escape
    35, 36, 45, 46,   //end, home, insert, delete
    37, 38, 39, 40    //left, up, right, down
  ],

  /**
   * Helper to check if a keyboard event was for a control key
   */
  isControl: function(event, allowed) {
    let codes = this.mergeCodes(this.CONTROL, allowed);
    return (codes.indexOf(event.keyCode) >= 0 && event.charCode === 0);
  },

  /**
   * Helper to check if a keyboard event was for numeric input
   */
  isNumeric: function(event, allowed) {
    let codes = this.mergeCodes(this.NUMERIC, allowed);
    return (codes.indexOf(event.which) >= 0);
  },

  /**
   * Helper to check if a keyboard event was for alpha input
   */
  isAlpha: function(event, allowed) {
    let codes = this.mergeCodes(this.ALPHA, allowed);
    return (codes.indexOf(event.which) >= 0);
  },

  /**
   * Helper to check if a keyboard event was for alphanumeric input
   */
  isAlphaNumeric: function(event, allowed) {
    let codes = this.mergeCodes(this.ALPHA, this.NUMERIC, allowed);
    return (codes.indexOf(event.which) >= 0);
  },

  /**
   * Internal helper to merge codes
   */
  mergeCodes: function() {
    let codes = [];
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i]) {
        let merge = arguments[i];
        if (!Array.isArray(merge)) {
          merge = [merge];
        }
        codes = codes.concat(merge);
      }
    }
    return codes;
  }
});
