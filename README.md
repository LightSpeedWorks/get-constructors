# get-constructors
get an array of constructors for objects and classes

# INSTALL

```bash
$ npm install get-constructor
```

or

```html
<script src="get-constructors.js"></script>
```

# USAGE

## constructors

```js
var constructors = require('get-constructors');

var FuncProto = Function.prototype;

constructors({}) // -> [Object]
constructors([]) // -> [Array, Object]

constructors(Object) // -> [Object, FuncProto]
constructors(Array) // -> [Array, FuncProto]

function Klass() {}
constructors(new Klass) // -> [Klass, Object]
constructors(Klass // -> [Klass, FuncProto]
```

## constructors.extendPrototype([Class = Object])

```js
var constructors = require('get-constructors');

var FuncProto = Function.prototype;

constructors.extendPrototype();

{}.constructors // -> [Object]
[].constructors // -> [Array, Object]

Object.constructors // -> [Object, FuncProto]
Array.constructors // -> [Array, FuncProto]

function Klass() {}
new Klass().constructors // -> [Klass, Object]
Klass.constructors // -> [Klass, FuncProto]
```

# LICENSE

  MIT License
