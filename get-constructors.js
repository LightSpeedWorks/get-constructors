// get-constructors.js

this.constructors = function () {
  'use strict';

  // getProto
  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
    Object.prototype.__proto__ ?
    function getProto(obj) { return obj.__proto__; } :
    function getProto(obj) {
      if (obj.constructor && obj.constructor.super_)
        return obj.constructor.super_.prototype;
      return obj.__proto__;
    };

  // constructors
  function constructors(obj) {
    // supports: getter and normal function
    if (arguments.length === 0) obj = this;

    // convert to object from primitives
    if (obj != null && typeof obj !== 'object' && typeof obj !== 'function')
      obj = Object(obj);

    if (obj === Array) return [Array, Function.prototype];
    if (obj === Error) return [Error, Function.prototype];
    if (obj === RegExp) return [RegExp, Function.prototype];
    if (obj === Object) return [Object, Function.prototype];
    if (obj === Function) return [Function, Function.prototype];
    if (obj.constructor === Array) return [Array, Object];
    if (obj.constructor === Error) return [Error, Object];
    if (obj.constructor === RegExp) return [RegExp, Object];
    if (obj.constructor === Object) return [Object];

    var classes = [];

    if (obj instanceof Function) {
      // for Class/constructor
      for (; obj; obj = ((obj.constructor && obj.constructor.super_) || getProto(obj)))
        typeof obj === 'function' &&
          classes.push(obj);

      if (classes[classes.length - 1] !== Function.prototype)
        classes.push(Function.prototype);
    }
    else {
      var saveObj = obj;

      // for instance/object
      for (; obj; obj = getProto(obj)) {
        if (obj.hasOwnProperty && obj.hasOwnProperty('constructor'))
          classes.push(obj.constructor);
        else if (obj.constructor)
          classes.push(obj.constructor);
      }

      if (classes.length === 0 && typeof saveObj.constructor === 'function')
        classes = [saveObj.constructor];

      if (classes[classes.length - 1] !== Object)
        classes.push(Object);
    }

    return classes;
  }

  // extendPrototype
  constructors.extendPrototype = function extendPrototype(ctor) {
    ctor = ctor || Object;

    if (ctor.prototype.constructors !== constructors)
      ctor.prototype.constructors = constructors;

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
