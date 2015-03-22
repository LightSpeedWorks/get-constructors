// get-constructors-test.js

(function () {
  'use strict';

  var assert = require('assert');
  var util = require('util');

  // module.paths.unshift(require('path').resolve(__dirname, '..'));
  var constructors = require('../get-constructors');
  constructors.extendPrototype();

  var getProto = Object.getPrototypeOf ? Object.getPrototypeOf :
    function getProto(obj) { return obj.__proto__ };

  var setProto = Object.setPrototypeOf ? Object.setPrototypeOf :
    function setProto(obj, proto) { obj.__proto__ = proto; };

  var Empty = getProto(Function);

  // class Klass
  function Klass1() {}

  // class SubKlass extends Klass
  util.inherits(SubKlass1, Klass1);
  setProto(SubKlass1, Klass1);
  function SubKlass1() {
    Klass1.apply(this, arguments);
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
  StrangeFunction1.prototype = function instanceOfStrangeFunction1() {};
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

    it('{}.constructors -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual({}.constructors, expected);
      assert.deepEqual(constructors({}), expected);
      assert.deepEqual(constructors.call({}), expected);

      assert.deepEqual(new Object().constructors, expected);
      assert.deepEqual(constructors(new Object()), expected);
      assert.deepEqual(constructors.call(new Object()), expected);

      assert.deepEqual(Object().constructors, expected);
      assert.deepEqual(constructors(Object()), expected);
      assert.deepEqual(constructors.call(Object()), expected);
    });

    it('[].constructors -> [Array, Object]', function () {
      var expected = [Array, Object];
      assert.deepEqual([].constructors, expected);
      assert.deepEqual(constructors([]), expected);
      assert.deepEqual(constructors.call([]), expected);

      assert.deepEqual(new Array().constructors, expected);
      assert.deepEqual(constructors(new Array()), expected);
      assert.deepEqual(constructors.call(new Array()), expected);

      assert.deepEqual(Array().constructors, expected);
      assert.deepEqual(constructors(Array()), expected);
      assert.deepEqual(constructors.call(Array()), expected);
    });

    it('123..constructors -> [Number, Object]', function () {
      var expected = [Number, Object];
      assert.deepEqual(123..constructors, expected);
      assert.deepEqual(constructors(123), expected);
      assert.deepEqual(constructors.call(123), expected);

      assert.deepEqual(new Number(123).constructors, expected);
      assert.deepEqual(constructors(new Number(123)), expected);
      assert.deepEqual(constructors.call(new Number(123)), expected);

      assert.deepEqual(Number(123).constructors, expected);
      assert.deepEqual(constructors(Number(123)), expected);
      assert.deepEqual(constructors.call(Number(123)), expected);

      assert.deepEqual(Object(123).constructors, expected);
      assert.deepEqual(constructors(Object(123)), expected);
      assert.deepEqual(constructors.call(Object(123)), expected);
    });

    it('"str".constructors -> [String, Object]', function () {
      var expected = [String, Object];
      assert.deepEqual("str".constructors, expected);
      assert.deepEqual(constructors("str"), expected);
      assert.deepEqual(constructors.call("str"), expected);

      assert.deepEqual(new String("str").constructors, expected);
      assert.deepEqual(constructors(new String("str")), expected);
      assert.deepEqual(constructors.call(new String("str")), expected);

      assert.deepEqual(String("str").constructors, expected);
      assert.deepEqual(constructors(String("str")), expected);
      assert.deepEqual(constructors.call(String("str")), expected);

      assert.deepEqual(Object("str").constructors, expected);
      assert.deepEqual(constructors(Object("str")), expected);
      assert.deepEqual(constructors.call(Object("str")), expected);
    });

    it('true.constructors -> [Boolean, Object]', function () {
      var expected = [Boolean, Object];
      assert.deepEqual(true.constructors, expected);
      assert.deepEqual(constructors(true), expected);
      assert.deepEqual(constructors.call(true), expected);

      assert.deepEqual(new Boolean(true).constructors, expected);
      assert.deepEqual(constructors(new Boolean(true)), expected);
      assert.deepEqual(constructors.call(new Boolean(true)), expected);

      assert.deepEqual(Boolean(true).constructors, expected);
      assert.deepEqual(constructors(Boolean(true)), expected);
      assert.deepEqual(constructors.call(Boolean(true)), expected);

      assert.deepEqual(Object(true).constructors, expected);
      assert.deepEqual(constructors(Object(true)), expected);
      assert.deepEqual(constructors.call(Object(true)), expected);
    });

    it('/rex/.constructors -> [RegExp, Object]', function () {
      var expected = [RegExp, Object];
      assert.deepEqual(/rex/.constructors, expected);
      assert.deepEqual(constructors(/rex/), expected);
      assert.deepEqual(constructors.call(/rex/), expected);

      assert.deepEqual(new RegExp('rex').constructors, expected);
      assert.deepEqual(constructors(new RegExp('rex')), expected);
      assert.deepEqual(constructors.call(new RegExp('rex')), expected);

      assert.deepEqual(RegExp('rex').constructors, expected);
      assert.deepEqual(constructors(RegExp('rex')), expected);
      assert.deepEqual(constructors.call(RegExp('rex')), expected);
    });

    it('Error().constructors -> [Error, Object]', function () {
      var expected = [Error, Object];
      assert.deepEqual(new Error().constructors, expected);
      assert.deepEqual(constructors(new Error()), expected);
      assert.deepEqual(constructors.call(new Error()), expected);

      assert.deepEqual(Error().constructors, expected);
      assert.deepEqual(constructors(Error()), expected);
      assert.deepEqual(constructors.call(Error()), expected);
    });

    it('JSON.constructors -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual(JSON.constructors, expected);
      assert.deepEqual(constructors(JSON), expected);
      assert.deepEqual(constructors.call(JSON), expected);
    });

    it('Math.constructors -> [Object]', function () {
      var expected = [Object];
      assert.deepEqual(Math.constructors, expected);
      assert.deepEqual(constructors(Math), expected);
      assert.deepEqual(constructors.call(Math), expected);
    });

  }); // describe

  describe('standard objects: getter constructors of classes', function () {

    it('Function.constructors -> [Function, Empty]', function () {
      var expected = [Function, Empty];
      assert.deepEqual(Function.constructors, expected);
      assert.deepEqual(constructors(Function), expected);
      assert.deepEqual(constructors.call(Function), expected);
    });

    it('Object.constructors -> [Object, Empty]', function () {
      var expected = [Object, Empty];
      assert.deepEqual(Object.constructors, expected);
      assert.deepEqual(constructors(Object), expected);
      assert.deepEqual(constructors.call(Object), expected);
    });

    it('Array.constructors -> [Array, Empty]', function () {
      var expected = [Array, Empty];
      assert.deepEqual(Array.constructors, expected);
      assert.deepEqual(constructors(Array), expected);
      assert.deepEqual(constructors.call(Array), expected);
    });

    it('Number.constructors -> [Number, Empty]', function () {
      var expected = [Number, Empty];
      assert.deepEqual(Number.constructors, expected);
      assert.deepEqual(constructors(Number), expected);
      assert.deepEqual(constructors.call(Number), expected);
    });

    it('String.constructors -> [String, Empty]', function () {
      var expected = [String, Empty];
      assert.deepEqual(String.constructors, expected);
      assert.deepEqual(constructors(String), expected);
      assert.deepEqual(constructors.call(String), expected);
    });

    it('Boolean.constructors -> [Boolean, Empty]', function () {
      var expected = [Boolean, Empty];
      assert.deepEqual(Boolean.constructors, expected);
      assert.deepEqual(constructors(Boolean), expected);
      assert.deepEqual(constructors.call(Boolean), expected);
    });

    it('RegExp.constructors -> [RegExp, Empty]', function () {
      var expected = [RegExp, Empty];
      assert.deepEqual(RegExp.constructors, expected);
      assert.deepEqual(constructors(RegExp), expected);
      assert.deepEqual(constructors.call(RegExp), expected);
    });

    it('Error.constructors -> [Error, Empty]', function () {
      var expected = [Error, Empty];
      assert.deepEqual(Error.constructors, expected);
      assert.deepEqual(constructors(Error), expected);
      assert.deepEqual(constructors.call(Error), expected);
    });

  }); // describe


  function doTest(prefixMessage, Klass, SubKlass, StrangeFunction) {

    describe(prefixMessage + 'getter constructors of instances', function () {

      it('new Klass().constructors -> [Klass, Object]', function () {
        var expected = [Klass, Object];
        assert.deepEqual(new Klass().constructors, expected);
        assert.deepEqual(constructors(new Klass()), expected);
        assert.deepEqual(constructors.call(new Klass()), expected);
      });

      it('new SubKlass().constructors -> [SubKlass, Klass, Object]', function () {
        var expected = [SubKlass, Klass, Object];
        assert.deepEqual(new SubKlass().constructors, expected);
        assert.deepEqual(constructors(new SubKlass()), expected);
        assert.deepEqual(constructors.call(new SubKlass()), expected);
      });

      StrangeFunction &&
      it('typeof new StrangeFunction() -> "function"', function () {
        assert.equal(typeof new StrangeFunction(), "function");
      });

      StrangeFunction &&
      it('(f = new StrangeFunction()).constructors -> [f, StrangeFunction, Function, Empty]', function () {
        var f = new StrangeFunction();
        var expected = [f, StrangeFunction, Function, Empty];
        assert.deepEqual(f.constructors, expected);
        assert.deepEqual(constructors(f), expected);
        assert.deepEqual(constructors.call(f), expected);
      });

    }); // describe


    describe(prefixMessage + 'getter constructors of classes', function () {

      it('Klass.constructors -> [Klass, Empty]', function () {
        var expected = [Klass, Empty];
        assert.deepEqual(Klass.constructors, expected);
        assert.deepEqual(constructors(Klass), expected);
        assert.deepEqual(constructors.call(Klass), expected);
      });

      it('SubKlass.constructors -> [SubKlass, Klass, Empty]', function () {
        var expected = [SubKlass, Klass, Empty];
        assert.deepEqual(SubKlass.constructors, expected);
        assert.deepEqual(constructors(SubKlass), expected);
        assert.deepEqual(constructors.call(SubKlass), expected);
      });

      StrangeFunction &&
      it('StrangeFunction.constructors -> [StrangeFunction, Function, Empty]', function () {
        var expected = [StrangeFunction, Function, Empty];
        assert.deepEqual(StrangeFunction.constructors, expected);
        assert.deepEqual(constructors(StrangeFunction), expected);
        assert.deepEqual(constructors.call(StrangeFunction), expected);
      });

    }); // describe

  } // doTest

  doTest('(ES5) ', Klass1, SubKlass1, StrangeFunction1);

  try {
    var Klass, SubKlass;

    eval('class Klass2 {} \n' +
         'class SubKlass2 extends Klass2 {} \n' +
         'Klass = Klass2; \n' +
         'SubKlass = SubKlass2; \n');

    doTest('(ES6 class) ', Klass, SubKlass, null);

  } catch (e) {
    describe('use iojs (ES6) and try mocha --harmony!', function () {
      it('harmony classes not supported: ' + e, function () {});
    });
  }

})();
