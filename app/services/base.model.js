
/**
 * Module definition and dependencies
 */
angular.module('Shared.Base.Model', [])

/**
 * Model definition
 */
.factory('BaseModel', function(moment) {

  /**
   * Constructor
   */
  function BaseModel(data) {
    this.fromObject(data);
  }

  /**
   * From plain object converter
   */
  BaseModel.prototype.fromObject = function(data) {

    //Copy data
    if (angular.isObject(data)) {
      angular.forEach(data, function(value, key) {
        this[key] = angular.copy(value);
      }, this);
    }

    //Return self
    return this;
  };

  /**
   * To plain object converter
   */
  BaseModel.prototype.toObject = function() {
    var data = angular.extend({}, this);
    for (var i in data) {
      if (data.hasOwnProperty(i) && data[i]) {
        if (moment.isMoment(data[i])) {
          data[i] = data[i].toJSON();
        }
        else if (angular.isFunction(data[i].toObject)) {
          data[i] = data[i].toObject();
        }
      }
    }
    return data;
  };

  /**
   * Clear own properties
   */
  BaseModel.prototype.clear = function() {
    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  };

  /**
   * Clone
   */
  BaseModel.prototype.clone = function() {
    var ModelClass = this.constructor;
    return new ModelClass(this.toObject());
  };

  //Return
  return BaseModel;
});
