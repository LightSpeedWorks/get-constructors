// get-constructors-test.js

(function () {
  'use strict';

  var CYAN = '\x1b[36m';
  var RED  = '\x1b[31m';

  var assert = require('assert');
  var util = require('util');

  // module.paths.unshift(require('path').resolve(__dirname, '..'));
  var constructors = require('../get-constructors').extendPrototype();

  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
    function getProto(obj) { return obj.__proto__ };

  var setProto = Object.setPrototypeOf ? Object.setPrototypeOf :
    function setProto(obj, proto) { obj.__proto__ = proto; };

  var FuncProto = Function.prototype;

  // class Klass
  function Klass1() {}

  // class SubKlass extends Klass
  util.inherits(SubKlass1, Klass1);
  setProto(SubKlass1, Klass1);
  function SubKlass1() {
    Klass1.apply(this, arguments);
  }

  // class CustomArray extends Error
  util.inherits(CustomArray1, Array);
  setProto(CustomArray1, Array);
  function CustomArray1() {
    var a = Array.apply(null, arguments);
    setProto(a, CustomArray1.prototype);
    return a;
  }

  // class CustomError extends Error
  util.inherits(CustomError1, Error);
  setProto(CustomError1, Error);
  function CustomError1() {
    var e = Error.apply(null, arguments);
    setProto(e, CustomError1.prototype);
    return e;
  }

  // class StrangeFunction extends Function
  //util.inherits(StrangeFunction1, Function);
  setProto(StrangeFunction1, Function);
  StrangeFunction1.prototype = function prototypeOfStrangeFunction1() {};
  Object.defineProperty(StrangeFunction1.prototype, 'constructor',
    {value: StrangeFunction1, configurable: true, writable: true});
  setProto(StrangeFunction1.prototype, Function);
  function StrangeFunction1() {
    var self = function instanceOfStrangeFunction1() {};
    setProto(self, StrangeFunction1);
    return self;
  }

  describe('standard objects: getter constructors of instances', function () {

    it('constructors(null) -> []', function () {
      var expected = [];
      assert.deepEqual(constructors(null), expected);
      assert.deepEqual(constructors.call(null), expected);
      assert.deepEqual(constructors(undefined), expected);
      assert.deepEqual(constructors.call(undefined), expected);
    });

    it('{}.constructors() -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual({}.constructors(), expected);
      assert.deepEqual(constructors({}), expected);
      assert.deepEqual(constructors.call({}), expected);

      assert.deepEqual(new Object().constructors(), expected);
      assert.deepEqual(constructors(new Object()), expected);
      assert.deepEqual(constructors.call(new Object()), expected);

      assert.deepEqual(Object().constructors(), expected);
      assert.deepEqual(constructors(Object()), expected);
      assert.deepEqual(constructors.call(Object()), expected);
    });

    it('[].constructors() -> [Array, Object]', function () {
      var expected = [Array, Object];
      assert.deepEqual([].constructors(), expected);
      assert.deepEqual(constructors([]), expected);
      assert.deepEqual(constructors.call([]), expected);

      assert.deepEqual(new Array().constructors(), expected);
      assert.deepEqual(constructors(new Array()), expected);
      assert.deepEqual(constructors.call(new Array()), expected);

      assert.deepEqual(Array().constructors(), expected);
      assert.deepEqual(constructors(Array()), expected);
      assert.deepEqual(constructors.call(Array()), expected);
    });

    it('123..constructors() -> [Number, Object]', function () {
      var expected = [Number, Object];
      assert.deepEqual(123..constructors(), expected);
      assert.deepEqual(constructors(123), expected);
      assert.deepEqual(constructors.call(123), expected);

      assert.deepEqual(new Number(123).constructors(), expected);
      assert.deepEqual(constructors(new Number(123)), expected);
      assert.deepEqual(constructors.call(new Number(123)), expected);

      assert.deepEqual(Number(123).constructors(), expected);
      assert.deepEqual(constructors(Number(123)), expected);
      assert.deepEqual(constructors.call(Number(123)), expected);

      assert.deepEqual(Object(123).constructors(), expected);
      assert.deepEqual(constructors(Object(123)), expected);
      assert.deepEqual(constructors.call(Object(123)), expected);
    });

    it('"str".constructors() -> [String, Object]', function () {
      var expected = [String, Object];
      assert.deepEqual("str".constructors(), expected);
      assert.deepEqual(constructors("str"), expected);
      assert.deepEqual(constructors.call("str"), expected);

      assert.deepEqual(new String("str").constructors(), expected);
      assert.deepEqual(constructors(new String("str")), expected);
      assert.deepEqual(constructors.call(new String("str")), expected);

      assert.deepEqual(String("str").constructors(), expected);
      assert.deepEqual(constructors(String("str")), expected);
      assert.deepEqual(constructors.call(String("str")), expected);

      assert.deepEqual(Object("str").constructors(), expected);
      assert.deepEqual(constructors(Object("str")), expected);
      assert.deepEqual(constructors.call(Object("str")), expected);
    });

    it('true.constructors() -> [Boolean, Object]', function () {
      var expected = [Boolean, Object];
      assert.deepEqual(true.constructors(), expected);
      assert.deepEqual(constructors(true), expected);
      assert.deepEqual(constructors.call(true), expected);

      assert.deepEqual(new Boolean(true).constructors(), expected);
      assert.deepEqual(constructors(new Boolean(true)), expected);
      assert.deepEqual(constructors.call(new Boolean(true)), expected);

      assert.deepEqual(Boolean(true).constructors(), expected);
      assert.deepEqual(constructors(Boolean(true)), expected);
      assert.deepEqual(constructors.call(Boolean(true)), expected);

      assert.deepEqual(Object(true).constructors(), expected);
      assert.deepEqual(constructors(Object(true)), expected);
      assert.deepEqual(constructors.call(Object(true)), expected);
    });

    it('/rex/.constructors() -> [RegExp, Object]', function () {
      var expected = [RegExp, Object];
      assert.deepEqual(/rex/.constructors(), expected);
      assert.deepEqual(constructors(/rex/), expected);
      assert.deepEqual(constructors.call(/rex/), expected);

      assert.deepEqual(new RegExp('rex').constructors(), expected);
      assert.deepEqual(constructors(new RegExp('rex')), expected);
      assert.deepEqual(constructors.call(new RegExp('rex')), expected);

      assert.deepEqual(RegExp('rex').constructors(), expected);
      assert.deepEqual(constructors(RegExp('rex')), expected);
      assert.deepEqual(constructors.call(RegExp('rex')), expected);
    });

    it('Error().constructors() -> [Error, Object]', function () {
      var expected = [Error, Object];
      assert.deepEqual(new Error().constructors(), expected);
      assert.deepEqual(constructors(new Error()), expected);
      assert.deepEqual(constructors.call(new Error()), expected);

      assert.deepEqual(Error().constructors(), expected);
      assert.deepEqual(constructors(Error()), expected);
      assert.deepEqual(constructors.call(Error()), expected);
    });

    it('JSON.constructors() -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual(JSON.constructors(), expected);
      assert.deepEqual(constructors(JSON), expected);
      assert.deepEqual(constructors.call(JSON), expected);
    });

    it('Math.constructors() -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual(Math.constructors(), expected);
      assert.deepEqual(constructors(Math), expected);
      assert.deepEqual(constructors.call(Math), expected);
    });

  }); // describe

  describe('standard objects: getter constructors of classes', function () {

    it('Function.constructors() -> [Function, FuncProto]', function () {
      var expected = [Function, FuncProto];
      assert.deepEqual(Function.constructors(), expected);
      assert.deepEqual(constructors(Function), expected);
      assert.deepEqual(constructors.call(Function), expected);
    });

    it('Object.constructors() -> [Object, FuncProto]', function () {
      var expected = [Object, FuncProto];
      assert.deepEqual(Object.constructors(), expected);
      assert.deepEqual(constructors(Object), expected);
      assert.deepEqual(constructors.call(Object), expected);
    });

    it('Array.constructors() -> [Array, FuncProto]', function () {
      var expected = [Array, FuncProto];
      assert.deepEqual(Array.constructors(), expected);
      assert.deepEqual(constructors(Array), expected);
      assert.deepEqual(constructors.call(Array), expected);
    });

    it('Number.constructors() -> [Number, FuncProto]', function () {
      var expected = [Number, FuncProto];
      assert.deepEqual(Number.constructors(), expected);
      assert.deepEqual(constructors(Number), expected);
      assert.deepEqual(constructors.call(Number), expected);
    });

    it('String.constructors() -> [String, FuncProto]', function () {
      var expected = [String, FuncProto];
      assert.deepEqual(String.constructors(), expected);
      assert.deepEqual(constructors(String), expected);
      assert.deepEqual(constructors.call(String), expected);
    });

    it('Boolean.constructors() -> [Boolean, FuncProto]', function () {
      var expected = [Boolean, FuncProto];
      assert.deepEqual(Boolean.constructors(), expected);
      assert.deepEqual(constructors(Boolean), expected);
      assert.deepEqual(constructors.call(Boolean), expected);
    });

    it('RegExp.constructors() -> [RegExp, FuncProto]', function () {
      var expected = [RegExp, FuncProto];
      assert.deepEqual(RegExp.constructors(), expected);
      assert.deepEqual(constructors(RegExp), expected);
      assert.deepEqual(constructors.call(RegExp), expected);
    });

    it('Error.constructors() -> [Error, FuncProto]', function () {
      var expected = [Error, FuncProto];
      assert.deepEqual(Error.constructors(), expected);
      assert.deepEqual(constructors(Error), expected);
      assert.deepEqual(constructors.call(Error), expected);
    });

  }); // describe


  function doTest(prefixMessage, Klass, SubKlass, CustomArray, CustomError, StrangeFunction) {

    describe(prefixMessage + 'getter constructors of instances', function () {

      Klass &&
      it('new Klass().constructors() -> [Klass, Object]', function () {
        var expected = [Klass, Object];
        assert.deepEqual(new Klass().constructors(), expected);
        assert.deepEqual(constructors(new Klass()), expected);
        assert.deepEqual(constructors.call(new Klass()), expected);
      });

      SubKlass && Klass &&
      it('new SubKlass().constructors() -> [SubKlass, Klass, Object]', function () {
        var expected = [SubKlass, Klass, Object];
        assert.deepEqual(new SubKlass().constructors(), expected);
        assert.deepEqual(constructors(new SubKlass()), expected);
        assert.deepEqual(constructors.call(new SubKlass()), expected);
      });

      CustomArray &&
      it('new CustomArray(1, 2, 3) -> [1, 2, 3]', function () {
        assert.deepEqual(new CustomArray(1, 2, 3), [1, 2, 3]);
      });

      CustomError &&
      it('new CustomError("msg") -> new Error("msg")', function () {
        assert.deepEqual(new CustomError("msg"), new Error("msg"));
      });

      CustomArray &&
      it('new CustomArray().constructors() -> [CustomArray, Array, Object]', function () {
        var expected = [CustomArray, Array, Object];
        assert.deepEqual(new CustomArray().constructors(), expected);
        assert.deepEqual(constructors(new CustomArray()), expected);
        assert.deepEqual(constructors.call(new CustomArray()), expected);
      });

      CustomError &&
      it('new CustomError().constructors() -> [CustomError, Error, Object]', function () {
        var expected = [CustomError, Error, Object];
        assert.deepEqual(new CustomError().constructors(), expected);
        assert.deepEqual(constructors(new CustomError()), expected);
        assert.deepEqual(constructors.call(new CustomError()), expected);
      });

      StrangeFunction &&
      it('typeof new StrangeFunction() -> "function"', function () {
        assert.equal(typeof new StrangeFunction(), "function");
      });

      StrangeFunction &&
      it('(f = new StrangeFunction()).constructors() -> [f, StrangeFunction, Function, FuncProto]', function () {
        var f = new StrangeFunction();
        var expected = [f, StrangeFunction, Function, FuncProto];
        assert.deepEqual(f.constructors(), expected);
        assert.deepEqual(constructors(f), expected);
        assert.deepEqual(constructors.call(f), expected);
      });

    }); // describe


    describe(prefixMessage + 'getter constructors of classes', function () {

      Klass &&
      it('Klass.constructors() -> [Klass, FuncProto]', function () {
        var expected = [Klass, FuncProto];
        assert.deepEqual(Klass.constructors(), expected);
        assert.deepEqual(constructors(Klass), expected);
        assert.deepEqual(constructors.call(Klass), expected);
      });

      SubKlass && Klass &
      it('SubKlass.constructors() -> [SubKlass, Klass, FuncProto]', function () {
        var expected = [SubKlass, Klass, FuncProto];
        assert.deepEqual(SubKlass.constructors(), expected);
        assert.deepEqual(constructors(SubKlass), expected);
        assert.deepEqual(constructors.call(SubKlass), expected);
      });

      CustomArray &&
      it('CustomArray.constructors() -> [CustomArray, Array, FuncProto]', function () {
        var expected = [CustomArray, Array, FuncProto];
        assert.deepEqual(CustomArray.constructors(), expected);
        assert.deepEqual(constructors(CustomArray), expected);
        assert.deepEqual(constructors.call(CustomArray), expected);
      });

      CustomError &&
      it('CustomError.constructors() -> [CustomError, Error, FuncProto]', function () {
        var expected = [CustomError, Error, FuncProto];
        assert.deepEqual(CustomError.constructors(), expected);
        assert.deepEqual(constructors(CustomError), expected);
        assert.deepEqual(constructors.call(CustomError), expected);
      });

      StrangeFunction &&
      it('StrangeFunction.constructors() -> [StrangeFunction, Function, FuncProto]', function () {
        var expected = [StrangeFunction, Function, FuncProto];
        assert.deepEqual(StrangeFunction.constructors(), expected);
        assert.deepEqual(constructors(StrangeFunction), expected);
        assert.deepEqual(constructors.call(StrangeFunction), expected);
      });

    }); // describe

  } // doTest

  doTest('(ES5) ', Klass1, SubKlass1, CustomArray1, CustomError1, StrangeFunction1);

  try {
    var Klass, SubKlass, CustomArray, CustomError;

    eval('class Klass2 {} \n' +
         'class SubKlass2 extends Klass2 {} \n' +
         'class CustomArray22 extends Array {\n' +
         '  constructor() { for (var i = 0; i < arguments.length; ++i) this.push(arguments[i]); }\n' +
         '} \n' +
         'class CustomArray2 extends Array {\n' +
         '  constructor() { ; \n' +
         '    var a = Array.apply(null, arguments);\n' +
         '    setProto(a, CustomArray2.prototype);\n' +
         '    return a;' +
         '  }\n' +
         '} \n' +
         'class CustomError2 extends Error {} \n' +
         'Klass = Klass2; \n' +
         'SubKlass = SubKlass2; \n' +
         'CustomArray = CustomArray2; \n' +
         'CustomError = CustomError2; \n');

    doTest('(ES6 class) ', Klass, SubKlass, CustomArray, CustomError);

  } catch (e) {
    describe('use iojs (ES6) and try ' + CYAN + 'mocha --harmony!', function () {
      it('harmony classes not supported: ' + RED + e, function () {});
    });
  }

})();
