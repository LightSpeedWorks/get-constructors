// get-constructors.js

(function () {
  'use strict';

  module.exports = exports = constructors;

  function constructors() {
    var classes = [];

    if (this instanceof Function) {
      for (var obj = this; obj; obj = Object.getPrototypeOf(obj))
        if (typeof obj === 'function')
          classes.push(obj);
    }
    else {
      for (var obj = this; obj; obj = Object.getPrototypeOf(obj))
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
