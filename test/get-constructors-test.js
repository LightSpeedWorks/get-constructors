// get-constructors-test.js

(function () {
  'use strict';

  var assert = require('assert');
  var util = require('util');

  // module.paths.unshift(require('path').resolve(__dirname, '..'));
  var constructors = require('../get-constructors');
  constructors.extendObject();

  var setProto = Object.setPrototypeOf ? Object.setPrototypeOf :
    function setProto(obj, proto) { obj.__proto__ = proto; };

  var Empty = Object.getPrototypeOf(Function);

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

    it('{}.constructors -> [Object]', function () {
      assert.deepEqual({}.constructors, [Object]);
    });

    it('[].constructors -> [Array, Object]', function () {
      assert.deepEqual([].constructors, [Array, Object]);
    });

    it('/rex/.constructors -> [RegExp, Object]', function () {
      assert.deepEqual(/rex/.constructors, [RegExp, Object]);
    });

    it('Error().constructors -> [Error, Object]', function () {
      assert.deepEqual(Error().constructors, [Error, Object]);
    });

    it('JSON.constructors -> [Object]', function () {
      assert.deepEqual(JSON.constructors, [Object]);
    });

    it('Math.constructors -> [Object]', function () {
      assert.deepEqual(Math.constructors, [Object]);
    });

  }); // describe

  describe('standard objects: getter constructors of classes', function () {

    it('Function.constructors -> [Function, Empty]', function () {
      assert.deepEqual(Function.constructors, [Function, Empty]);
    });

    it('Object.constructors -> [Object, Empty]', function () {
      assert.deepEqual(Object.constructors, [Object, Empty]);
    });

    it('Array.constructors -> [Array, Empty]', function () {
      assert.deepEqual(Array.constructors, [Array, Empty]);
    });

    it('RegExp.constructors -> [RegExp, Empty]', function () {
      assert.deepEqual(RegExp.constructors, [RegExp, Empty]);
    });

    it('Error.constructors -> [Error, Empty]', function () {
      assert.deepEqual(Error.constructors, [Error, Empty]);
    });

  }); // describe


  describe('standard objects: constructors call instances', function () {

    it('constructors.call({}) -> [Object]', function () {
      assert.deepEqual(constructors.call({}), [Object]);
    });

    it('constructors.call([]) -> [Array, Object]', function () {
      assert.deepEqual(constructors.call([]), [Array, Object]);
    });

    it('constructors.call(/rex/) -> [RegExp, Object]', function () {
      assert.deepEqual(constructors.call(/rex/), [RegExp, Object]);
    });

    it('constructors.call(Error()) -> [Error, Object]', function () {
      assert.deepEqual(constructors.call(Error()), [Error, Object]);
    });

    it('constructors.call(JSON) -> [Object]', function () {
      assert.deepEqual(constructors.call(JSON), [Object]);
    });

    it('constructors.call(Math) -> [Object]', function () {
      assert.deepEqual(constructors.call(Math), [Object]);
    });

  }); // describe


  describe('standard objects: constructors call classes', function () {

    it('constructors.call(Function) -> [Function, Empty]', function () {
      assert.deepEqual(constructors.call(Function), [Function, Empty]);
    });

    it('constructors.call(Object) -> [Object, Empty]', function () {
      assert.deepEqual(constructors.call(Object), [Object, Empty]);
    });

    it('constructors.call(Array) -> [Array, Empty]', function () {
      assert.deepEqual(constructors.call(Array), [Array, Empty]);
    });

    it('constructors.call(RegExp) -> [RegExp, Empty]', function () {
      assert.deepEqual(constructors.call(RegExp), [RegExp, Empty]);
    });

    it('constructors.call(Error) -> [Error, Empty]', function () {
      assert.deepEqual(constructors.call(Error), [Error, Empty]);
    });

  }); // describe


  function doTest(prefixMessage, Klass, SubKlass, StrangeFunction) {

    describe(prefixMessage + 'getter constructors of instances', function () {

      it('new Klass().constructors -> [Klass, Object]', function () {
        assert.deepEqual(new Klass().constructors, [Klass, Object]);
      });

      it('new SubKlass().constructors -> [SubKlass, Klass, Object]', function () {
        assert.deepEqual(new SubKlass().constructors, [SubKlass, Klass, Object]);
      });

      StrangeFunction &&
      it('typeof new StrangeFunction() -> "function"', function () {
        assert.equal(typeof new StrangeFunction(), "function");
      });

      StrangeFunction &&
      it('(f = new StrangeFunction()).constructors -> [f, StrangeFunction, Function, Empty]', function () {
        var f = new StrangeFunction();
        assert.deepEqual(f.constructors, [f, StrangeFunction, Function, Empty]);
      });

    }); // describe


    describe(prefixMessage + 'getter constructors of classes', function () {

      it('Klass.constructors -> [Klass, Empty]', function () {
        assert.deepEqual(Klass.constructors, [Klass, Empty]);
      });

      it('SubKlass.constructors -> [SubKlass, Klass, Empty]', function () {
        assert.deepEqual(SubKlass.constructors, [SubKlass, Klass, Empty]);
      });

      StrangeFunction &&
      it('StrangeFunction.constructors -> [StrangeFunction, Function, Empty]', function () {
        assert.deepEqual(StrangeFunction.constructors, [StrangeFunction, Function, Empty]);
      });

    }); // describe


    describe(prefixMessage + 'constructors call instances', function () {

      it('constructors.call(new Klass()) -> [Klass, Object]', function () {
        assert.deepEqual(constructors.call(new Klass()), [Klass, Object]);
      });

      it('constructors.call(new SubKlass()) -> [SubKlass, Klass, Object]', function () {
        assert.deepEqual(constructors.call(new SubKlass()), [SubKlass, Klass, Object]);
      });

      StrangeFunction &&
      it('constructors.call(f = new StrangeFunction()) -> [f, StrangeFunction, Function, Empty]', function () {
        var f = new StrangeFunction();
        assert.deepEqual(constructors.call(f), [f, StrangeFunction, Function, Empty]);
      });

    }); // describe


    describe(prefixMessage + 'constructors call classes', function () {

      it('constructors.call(Klass) -> [Klass, Empty]', function () {
        assert.deepEqual(constructors.call(Klass), [Klass, Empty]);
      });

      it('constructors.call(SubKlass) -> [SubKlass, Klass, Empty]', function () {
        assert.deepEqual(constructors.call(SubKlass), [SubKlass, Klass, Empty]);
      });

      StrangeFunction &&
      it('constructors.call(StrangeFunction) -> [StrangeFunction, Function, Empty]', function () {
        assert.deepEqual(constructors.call(StrangeFunction), [StrangeFunction, Function, Empty]);
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
    describe('harmony classes not supported: ' + e, function () {
      it('harmony classes not supported: ' + e, function () {});
    });
  }

})();
