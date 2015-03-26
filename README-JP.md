# 使い方:

## プロパティ: this.constructors

  コンストラクタ関数(クラス)の配列を取得する。
  (after: constructors.extendPrototype())

### 形式

```js
var MyClass = BaseClass.extend('MyClass');
var o1 = new MyClass();
var classes = o1.constructors;
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true
```

## 返り値

  コンストラクタ関数(クラス)の配列。

## プロパティ: Class.constructors

  コンストラクタ関数(クラス)の配列を取得する。
  (after: constructors.extendPrototype())

### 形式

```js
var MyClass = BaseClass.extend('MyClass');
var classes = MyClass.constructors;
console.log(classes[0] === MyClass);   // -> true
console.log(classes[1] === BaseClass); // -> true
console.log(classes[2] === Object);    // -> true
```

## 返り値

  コンストラクタ関数(クラス)の配列。

# ライセンス:

  MIT
