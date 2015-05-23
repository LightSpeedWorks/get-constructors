[get-constructors](https://www.npmjs.org/package/get-constructors) - npm
====

[English version](README.md#readme)

  オブジェクトやクラスのコンストラクタ配列(クラス一覧)を取得する。

  Google Chrome, Mozilla Firefox, Microsoft ie11/10/9/8/7/6 や Node.js/io.js をサポートします。

# インストール:

```bash
$ npm install get-constructors --save
```

または

http://lightspeedworks.github.io/get-constructors/get-constructors.js

```html
<script src="http://lightspeedworks.github.io/get-constructors/get-constructors.js"></script>
```

# 準備:

```js
(function (constructors) {
  // constructors を使う事ができます
})(this.constructors || require('get-constructors'));
```

または

```js
var constructors = this.constructors || require('get-constructors'));
```

# 使い方:

## 関数: constructors(object または Class/constructor)

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

## メソッド: constructors.extendPrototype([ctor = Object])

  プロトタイプにメソッド `constructors` を拡張して `constructors` を返す。

### 形式

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

## メソッド: this.constructors()

  コンストラクタ関数(クラス)の配列を取得する。
  (after: constructors.extendPrototype())

### 形式

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

## 返り値

  コンストラクタ関数(クラス)の配列。

## メソッド: Class.constructors()

  コンストラクタ関数(クラス)の配列を取得する。
  (after: constructors.extendPrototype())

### 形式

```js
var MyClass = BaseClass.extend('MyClass');
var classes = MyClass.constructors();
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true
```

## 返り値

  コンストラクタ関数(クラス)の配列。

# ライセンス:

  MITライセンス
