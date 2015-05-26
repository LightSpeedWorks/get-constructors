// es3-class-test.js

(function () {
  'use strict';

  try {
    var constructors = require('../get-constructors');
  } catch (err) {
    console.log(err);
    var constructors = require('get-constructors');
  }

  // *** Class3 ***
  function Class3() {
    this.x = 10;
    console.log('      Class3: this              = ' + constructors(this).map(nm).join(' < '))
    console.log('      Class3: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
    console.log('      Class3: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
  }
  try { Class3.name = 'Class3'; } catch(err) {}
  Class3.prototype.method = function method() {
    console.log('      Class3: method');
  };
  Class3.staticMethod = function staticMethod() {
    console.log('      Class3: staticMethod');
  };
  console.log('      Class3: ' + constructors(Class3).map(nm).join(' < '))

  // *** SubClass3 ***
  function SubClass3() {
    Class3.call(this);
    this.y = 20;
    console.log('   SubClass3: this              = ' + constructors(this).map(nm).join(' < '))
    console.log('   SubClass3: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
    console.log('   SubClass3: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
  }
  try { SubClass3.name = 'SubClass3'; } catch(err) {}
  function __(ctor) { this.constructor = ctor; }
  __.prototype = Class3.prototype;
  SubClass3.prototype = new __(SubClass3);
  SubClass3.prototype.method = function method() {
    Class3.prototype.method.call(this);
    console.log('   SubClass3: method');
  };
  SubClass3.staticMethod = function staticMethod() {
    Class3.staticMethod();
    console.log('   SubClass3: staticMethod');
  };
  SubClass3.super_ = Class3;
  console.log('   SubClass3: ' + constructors(SubClass3).map(nm).join(' < '))

  // *** SubSubClass3 ***
  function SubSubClass3() {
    SubClass3.call(this);
    this.z = 30;
    console.log('SubSubClass3: this              = ' + constructors(this).map(nm).join(' < '))
    console.log('SubSubClass3: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
    console.log('SubSubClass3: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
  }
  try { SubSubClass3.name = 'SubSubClass3'; } catch(err) {}
  __.prototype = SubClass3.prototype;
  SubSubClass3.prototype = new __(SubSubClass3);
  SubSubClass3.prototype.method = function method() {
    SubClass3.prototype.method.call(this);
    console.log('SubSubClass3: method');
  };
  SubSubClass3.staticMethod = function staticMethod() {
    SubClass3.staticMethod();
    console.log('SubSubClass3: staticMethod');
  };
  SubSubClass3.super_ = SubClass3;
  console.log('SubSubClass3: ' + constructors(SubSubClass3).map(nm).join(' < '))

  var o3;
  console.log();
  console.log('***', Class3.name, SubClass3.name, SubSubClass3.name);
  console.log();
  console.log(o3 = new Class3);
  o3.method();
  Class3.staticMethod();
  console.log();
  console.log(o3 = new SubClass3);
  o3.method();
  SubClass3.staticMethod();
  console.log();
  console.log(o3 = new SubSubClass3);
  o3.method();
  SubSubClass3.staticMethod();
  console.log();

  // nm(x)
  function nm(x) {
    var name = (x.hasOwnProperty && x.hasOwnProperty('name')) ?
        (x.name || 'undefined') : (x.name || 'undefined') + '(default)';
    return name;
  }

})();
