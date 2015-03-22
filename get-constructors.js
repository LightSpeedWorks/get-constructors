// get-constructors.js

(function () {
  'use strict';

  module.exports = exports = constructors;

  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
    function getProto(obj) { return obj.__proto__ };

  function constructors(obj) {
    if (arguments.length === 0) obj = this;
    if (obj != null && typeof obj !== 'object' && typeof obj !== 'function')
      obj = Object(obj);
    var classes = [];

    if (obj instanceof Function) {
      for (; obj; obj = getProto(obj))
        if (typeof obj === 'function')
          classes.push(obj);
    }
    else {
      for (; obj; obj = getProto(obj))
        if (obj.hasOwnProperty('constructor'))
          classes.push(obj.constructor);
    }

    return classes;
  }

  constructors.extendObject = function extendObject() {
    if (!Object.prototype.hasOwnProperty('constructors')) {
      Object.defineProperty(Object.prototype, 'constructors',
        {get: constructors, configurable: true});
    }
  };

  constructors.extendFunction = function extendFunction() {
    if (!Function.prototype.hasOwnProperty('constructors')) {
      Object.defineProperty(Function.prototype, 'constructors',
        {get: constructors, configurable: true});
    }
  };

})();
