// base-class-test.js

(function () {
  'use strict';

  try {
    var constructors = require('../get-constructors');
  } catch (err) {
    console.log(err);
    var constructors = require('get-constructors');
  }

  var extend = require('base-class-extend').extend;

  // *** Class1 ***
  var Class1 = extend('Class1', {
    constructor: function Class1() {
      this.x = 10;
      console.log('      Class1: this                = ' + constructors(this).map(nm).join(' < '))
      console.log('      Class1: this.__proto__      = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('      Class1: this.constructor    = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('      Class1: Class1.super_       = ' + constructors(Class1.super_).map(nm).join(' < '))
    },
    method: function method() {
      console.log('      Class1: method');
    }
  }, {
    staticMethod: function staticMethod() {
      console.log('      Class1: staticMethod');
    }
  });
  console.log('      Class1: ' + constructors(Class1).map(nm).join(' < '))

  // *** SubClass1 ***
  var SubClass1 = Class1.extend('SubClass1', {
    constructor: function SubClass1() {
      Class1.call(this);
      this.y = 20;
      console.log('   SubClass1: this                = ' + constructors(this).map(nm).join(' < '))
      console.log('   SubClass1: this.__proto__      = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('   SubClass1: this.constructor    = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('   SubClass1: SubClass1.super_    = ' + constructors(SubClass1.super_).map(nm).join(' < '))
    },
    method: function method() {
      Class1.prototype.method.call(this);
      console.log('   SubClass1: method');
    }
  }, {
    staticMethod: function staticMethod() {
      Class1.staticMethod.call(this);
      console.log('   SubClass1: staticMethod');
    }
  });
  console.log('   SubClass1: ' + constructors(SubClass1).map(nm).join(' < '))

  // *** SubSubClass1 ***
  var SubSubClass1 = SubClass1.extend('SubSubClass1', {
    constructor: function SubSubClass1() {
      SubClass1.call(this);
      this.z = 30;
      console.log('SubSubClass1: this                = ' + constructors(this).map(nm).join(' < '))
      console.log('SubSubClass1: this.__proto__      = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('SubSubClass1: this.constructor    = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('SubSubClass1: SubSubClass1.super_ = ' + constructors(SubSubClass1.super_).map(nm).join(' < '))
    },
    method: function method() {
      SubClass1.prototype.method.call(this);
      console.log('SubSubClass1: method');
    }
  }, {
    staticMethod: function staticMethod() {
      SubClass1.staticMethod.call(this);
      console.log('SubSubClass1: staticMethod');
    }
  });
  console.log('SubSubClass1: ' + constructors(SubSubClass1).map(nm).join(' < '))

  var o1;
  console.log();
  console.log('***', Class1.name, SubClass1.name, SubSubClass1.name);
  console.log();
  console.log(o1 = new Class1);
  o1.method();
  Class1.staticMethod();
  console.log();
  console.log(o1 = new SubClass1);
  o1.method();
  SubClass1.staticMethod();
  console.log();
  console.log(o1 = new SubSubClass1);
  o1.method();
  SubSubClass1.staticMethod();
  console.log();

  // nm(x)
  function nm(x) {
    var name = (x.hasOwnProperty && x.hasOwnProperty('name')) ?
        (x.name || 'undefined') : (x.name || 'undefined') + '(default)';
    return name;
  }

})();
