[get-constructors](https://www.npmjs.org/package/get-constructors) - npm
====

  get an array of constructors (classes) for objects and classes.

  supports Google Chrome, Mozilla Firefox, Microsoft ie11/10/9/8/7/6 and Node.js/io.js.

[Japanese version/■日本語版はこちら■](README-JP.md#readme)

# INSTALL:

```bash
$ npm install get-constructors --save
```

or

http://lightspeedworks.github.io/get-constructors/get-constructors.js

```html
<script src="http://lightspeedworks.github.io/get-constructors/get-constructors.js"></script>
```

# PREPARE:

```js
(function (constructors) {
  // you can use constructors
})(this.constructors || require('get-constructors'));
```

or

```js
var constructors = this.constructors || require('get-constructors'));
```

# USAGE:

## function: constructors(object or Class/constructor)

```js
var constructors = require('get-constructors');

var FuncProto = Function.prototype;

constructors({}); // -> [Object]
constructors(Object); // -> [Object, FuncProto]

constructors([]); // -> [Array, Object]
constructors(Array); // -> [Array, FuncProto]

function Klass() {}
constructors(new Klass); // -> [Klass, Object]
constructors(Klass); // -> [Klass, FuncProto]

var setProto = Object.setPrototypeOf ? Object.setPrototypeOf :
  function setProto(obj, proto) { obj.__proto__ = proto; };

function SubKlass() {}
SubKlass.prototype = Object.create(Klass.prototype, {
  constructor: { value: SubKlass,
    writable: true, configurable: true }});
setProto(SubKlass, Klass);

constructors(new SubKlass); // -> [SubKlass, Klass, Object]
constructors(SubKlass); // -> [SubKlass, Klass, FuncProto]
```

## method: constructors.extendPrototype([ctor = Object])

  Extends prototype method `constructors` and returns `constructors`.

### Format

```js
var constructors = require('get-constructors').extendPrototype();

var FuncProto = Function.prototype;

({}).constructors() // -> [Object]
Object.constructors() // -> [Object, FuncProto]

[].constructors() // -> [Array, Object]
Array.constructors() // -> [Array, FuncProto]

function Klass() {}
(new Klass).constructors() // -> [Klass, Object]
Klass.constructors() // -> [Klass, FuncProto]

var setProto = Object.setPrototypeOf ? Object.setPrototypeOf :
  function setProto(obj, proto) { obj.__proto__ = proto; };

function SubKlass() {}
SubKlass.prototype = Object.create(Klass.prototype, {
  constructor: { value: SubKlass,
    writable: true, configurable: true }});
setProto(SubKlass, Klass);

(new SubKlass).constructors() // -> [SubKlass, Klass, Object]
SubKlass.constructors() // -> [SubKlass, Klass, FuncProto]
```

## method: this.constructors()

  Get an array of constructor functions (classes).
  (after: constructors.extendPrototype())

### Format

```js
var constructors = require('get-constructors').extendPrototype();

function BaseClass() {}
function MyClass() {}
MyClass.prototype = new BaseClass()
MyClass.prototype.constructor = MyClass;

var o1 = new MyClass();
console.log(o1.constructor === MyClass);   // -> true

var classes = o1.constructors();
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true

BaseClass.super_ = Object;
MyClass.super_ = BaseClass;

var classes = MyClass.constructors();
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true
```

## Returns

  An array of constructor functions (classes).

## method: Class.constructors()

  Get an array of constructor functions (classes).
  (after: constructors.extendPrototype())

### Format

```js
var MyClass = BaseClass.extend('MyClass');
var classes = MyClass.constructors();
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true
```

## Returns

  An array of constructor functions (classes).


# LICENSE:

  MIT License
