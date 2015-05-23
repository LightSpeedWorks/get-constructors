var constructors = require('../get-constructors').extendPrototype();

function BaseClass() {}
function MyClass() {}
MyClass.prototype = new BaseClass()
MyClass.prototype.constructor = MyClass;
MyClass.super_ = BaseClass;

var classes = MyClass.constructors();
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Function.prototype); // -> true
