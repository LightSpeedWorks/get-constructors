// es6-class-test.js

(function () {
  'use strict';

  function Class3() {
    this.x = 10;
    console.log('Class3: this.constructor.name:', this.constructor.name);
  }
  try { Class3.name = 'Class3'; } catch(err) {}
  Class3.prototype.method = function method() {
    console.log('Class3: method');
  };
  Class3.staticMethod = function staticMethod() {
    console.log('Class3: staticMethod');
  };

  function SubClass3() {
    Class3.call(this);
    this.y = 20;
    console.log('SubClass3: this.constructor.name:', this.constructor.name);
  }
  try { SubClass3.name = 'SubClass3'; } catch(err) {}
  function __(ctor) { this.constructor = ctor; }
  __.prototype = Class3.prototype;
  SubClass3.prototype = new __(SubClass3);
  SubClass3.prototype.method = function method() {
    Class3.prototype.method.call(this);
    console.log('SubClass3: method');
  };
  SubClass3.staticMethod = function staticMethod() {
    Class3.staticMethod();
    console.log('SubClass3: staticMethod');
  };

  function SubSubClass3() {
    SubClass3.call(this);
    this.z = 30;
    console.log('SubSubClass3: this.constructor.name:', this.constructor.name);
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

  class Class6 {
    constructor() {
      this.x = 10;
      console.log('Class6: this.constructor.name:', this.constructor.name);
      console.log('Class6: super.constructor.name:', super.constructor.name);
      console.log('Class6: super.__proto__.constructor.name:', super.__proto__.constructor.name);
    }
    method() {
      console.log('Class6: method');
    }
    static staticMethod() {
      console.log('Class6: staticMethod');
    }
  }
  class SubClass6 extends Class6 {
    constructor() {
      super();
      this.y = 20;
      console.log('SubClass6: this.constructor.name:', this.constructor.name);
      console.log('SubClass6: super.constructor.name:', super.constructor.name);
      console.log('SubClass6: super.__proto__.constructor.name:', super.__proto__.constructor.name);
    }
    method() {
      super.method();
      console.log('SubClass6: method');
    }
    static staticMethod() {
      super.staticMethod();
      console.log('SubClass6: staticMethod');
    }
  }
  class SubSubClass6 extends SubClass6 {
    constructor() {
      super();
      this.z = 30;
      console.log('SubSubClass6: this.constructor.name:', this.constructor.name);
      console.log('SubSubClass6: super.constructor.name:', super.constructor.name);
      console.log('SubSubClass6: super.__proto__.constructor.name:', super.__proto__.constructor.name);
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

})();
