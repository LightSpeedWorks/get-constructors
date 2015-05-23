var constructors = require('../get-constructors');

console.log(constructors({}));     // -> [Object]
console.log(constructors(Object)); // -> [Object, Function.prototype]

console.log(constructors([]));     // -> [Array, Object]
console.log(constructors(Array));  // -> [Array, Function.prototype]

function Klass() {}
console.log(constructors(new Klass)); // -> [Klass, Object]
console.log(constructors(Klass));     // -> [Klass, Function.prototype]

function SubKlass() {}
SubKlass.prototype = new Klass();
SubKlass.prototype.constructor = SubKlass;
SubKlass.super_ = Klass;

console.log(constructors(new SubKlass)); // -> [SubKlass, Klass, Object]
console.log(constructors(SubKlass));     // -> [SubKlass, Klass, Function.prototype]
