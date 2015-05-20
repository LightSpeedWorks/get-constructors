// get-constructors.js

this.constructors = function () {
  'use strict';

  // getProto
  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
    function getProto(obj) { return obj.__proto__; };

  // constructors
  function constructors(obj) {
    // supports: getter and normal function
    if (arguments.length === 0) obj = this;

    // convert to object from primitives
    if (obj != null && typeof obj !== 'object' && typeof obj !== 'function')
      obj = Object(obj);

    var classes = [];

    if (obj instanceof Function)
      // for Class/constructor
      for (; obj; obj = getProto(obj))
        typeof obj === 'function' &&
          classes.push(obj);

    else
      // for instance/object
      for (; obj; obj = getProto(obj))
        obj.hasOwnProperty('constructor') &&
          classes.push(obj.constructor);

    return classes;
  }

  // extendPrototype
  constructors.extendPrototype = function extendPrototype(ctor) {
    ctor = ctor || Object;

    if (!ctor.prototype.hasOwnProperty('constructors'))
      if (ctor.prototype.hasOwnProperty('__defineGetter__'))
        ctor.prototype.__defineGetter__('constructors', constructors);
      else if (Object.defineProperty)
        try {
          Object.defineProperty(ctor.prototype, 'constructors',
            {get: constructors, configurable: true});
        } catch (e) {
          ctor.prototype.constructors = [ctor.prototype.constructor];
        }

    return this;
  };


  // fnameRegExp: function name regular expression
  var fnameRegExp = /^\s*function\s*\**\s*([^\(\s]*)[\S\s]+$/im;

  // defProp(obj, prop, propDesc)
  var defProp = function (obj) {
    if (!Object.defineProperty) return null;
    try {
      Object.defineProperty(obj, 'prop', {value: 'str'});
      return obj.prop === 'str' ? Object.defineProperty : null;
    } catch (err) { return null; }
  } ({});

  // defGetter(obj, prop, getter)
  var defGetter = 
    Object.prototype.__defineGetter__ ?
    function defGetter(obj, prop, getter) {
      return obj.__defineGetter__(prop, getter); } :
    defProp ?
    function defGetter(obj, prop, getter) {
      return defProp(obj, prop, {get: getter}); } :
    function defGetter(obj, prop, getter) {};

  // Function.prototype.name for ie
  if (!Function.prototype.hasOwnProperty('name'))
    defGetter(Function.prototype, 'name',
      function nameOfFunction() {
        return ('' + this).replace(fnameRegExp, '$1'); });

  // exports
  if (typeof module === 'object' && module.exports)
    module.exports = constructors;

  return constructors;

}();
