var constructors = require('../get-constructors').extendPrototype();

console.log(({}).constructors());   // -> [Object]
console.log(Object.constructors()); // -> [Object, Function.prototype]

console.log([].constructors());     // -> [Array, Object]
console.log(Array.constructors());  // -> [Array, Function.prototype]

function Klass() {}
console.log((new Klass).constructors()); // -> [Klass, Object]
console.log(Klass.constructors());       // -> [Klass, Function.prototype]

function SubKlass() {}
SubKlass.prototype = new Klass();
SubKlass.prototype.constructor = SubKlass;
SubKlass.super_ = Klass;

console.log((new SubKlass).constructors()); // -> [SubKlass, Klass, Object]
console.log(SubKlass.constructors());       // -> [SubKlass, Klass, Function.prototype]
