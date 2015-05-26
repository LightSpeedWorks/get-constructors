// es6-class-test.js

(function () {
  'use strict';

  try {
    var constructors = require('../get-constructors');
  } catch (err) {
    console.log(err);
    var constructors = require('get-constructors');
  }

  // *** Class6 ***
  class Class6 {
    constructor() {
      this.x = 10;
      console.log('      Class6: this              = ' + constructors(this).map(nm).join(' < '))
      console.log('      Class6: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('      Class6: super.__proto__   = ' + constructors(super.__proto__).map(nm).join(' < '))
      console.log('      Class6: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('      Class6: super.constructor = ' + constructors(super.constructor).map(nm).join(' < '))
    }
    method() {
      console.log('      Class6: method');
    }
    static staticMethod() {
      console.log('      Class6: staticMethod');
    }
  }
  console.log('      Class6: ' + constructors(Class6).map(nm).join(' < '))

  // *** SubClass6 ***
  class SubClass6 extends Class6 {
    constructor() {
      super();
      this.y = 20;
      console.log('   SubClass6: this              = ' + constructors(this).map(nm).join(' < '))
      console.log('   SubClass6: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('   SubClass6: super.__proto__   = ' + constructors(super.__proto__).map(nm).join(' < '))
      console.log('   SubClass6: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('   SubClass6: super.constructor = ' + constructors(super.constructor).map(nm).join(' < '))
    }
    method() {
      super.method();
      console.log('   SubClass6: method');
    }
    static staticMethod() {
      super.staticMethod();
      console.log('   SubClass6: staticMethod');
    }
  }
  console.log('   SubClass6: ' + constructors(SubClass6).map(nm).join(' < '))

  // *** SubSubClass6 ***
  class SubSubClass6 extends SubClass6 {
    constructor() {
      super();
      this.z = 30;
      console.log('SubSubClass6: this              = ' + constructors(this).map(nm).join(' < '))
      console.log('SubSubClass6: this.__proto__    = ' + constructors(this.__proto__).map(nm).join(' < '))
      console.log('SubSubClass6: super.__proto__   = ' + constructors(super.__proto__).map(nm).join(' < '))
      console.log('SubSubClass6: this.constructor  = ' + constructors(this.constructor).map(nm).join(' < '))
      console.log('SubSubClass6: super.constructor = ' + constructors(super.constructor).map(nm).join(' < '))
    }
    method() {
      super.method();
      console.log('SubSubClass6: method');
    }
    static staticMethod() {
      super.staticMethod();
      console.log('SubSubClass6: staticMethod');
    }
  }
  console.log('SubSubClass6: ' + constructors(SubSubClass6).map(nm).join(' < '))

  var o6;
  console.log();
  console.log('***', Class6.name, SubClass6.name, SubSubClass6.name);
  console.log();
  console.log(o6 = new Class6);
  o6.method();
  Class6.staticMethod();
  console.log();
  console.log(o6 = new SubClass6);
  o6.method();
  SubClass6.staticMethod();
  console.log();
  console.log(o6 = new SubSubClass6);
  o6.method();
  SubSubClass6.staticMethod();
  console.log();

  // nm(x)
  function nm(x) {
    var name = (x.hasOwnProperty && x.hasOwnProperty('name')) ?
        (x.name || 'undefined') : (x.name || 'undefined') + '(default)';
    return name;
  }

})();
