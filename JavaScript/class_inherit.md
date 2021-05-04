# Title

class 和继承

<br/>

## class

<br/>

ES6 之前实例化对象是通过构造函数实现的，ES6 后可以通过关键字 class 创建类（可以认为是一种语法糖）

- class 中的 constructor 就是在实例化对象调用的构造函数，该构造函数可不写。
- 实例对象必须使用 new 关键字生成
- class 不可以当做函数执行
- class 不存在变量提升
- class 中定义的属性和方法都挂在原型上，所有的实例对象都有这些属性和方法。构造函数中定义的是实例的属性和方法。
- class 中可以通过 static 定义静态方法，静态变量需在类外声明（calss.staticName==staticValue）。静态属性和方法只可以通过 class 来调用，实例不可调用

<br/>

## ES5-实现继承的几种方式

<br/>

1. 原型链继承：替换子类型的原型

```javascript
function superClass(name) {
  this.name = name;
}
function subClass(sex) {
  this.sex = sex;
}

// 继承了superClass
subClass.prototype = new superClass();
```

缺点：

- 包含引用类型的原型属性会被所有实例共享
- 在创建子类型的实例时，不能向超类型的构造函数中传递参数

<br/>

2. 经典继承（借用构造函数）：为了避免实例共享原型属性而带来的技术

```javascript
function subClass(name, sex) {
  // 继承了superClass的属性
  superClass.call(this, name);
  this.sex = sex;
}
```

缺点:

- 无法做到函数复用
- 不能继承超类型在原型上定义的方法

<br/>

3. 组合继承：融合了原型链继承和经典继承，避免了他们的缺陷

```javascript
function subClass(name, sex) {
  // 继承了superClass的属性
  superClass.call(this, name); // 第一次调用
  this.sex = sex;
}
// 继承方法
subClass.prototype = new superClass(); // 第二次调用
subClass.prototype.constructor = subClass;
```

缺点:

- 需要调用两次超类型的构造函数

<br/>

4. 原型继承：基于已有的对象创建新的对象

```javascript
// 以一个对象作为实例的原型对象
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 在ES5 规范化了该继承
Object.create();
```

缺点：

- 包含引用类型的原型属性会被所有实例共享

<br/>

5. 寄生式继承：思路和工厂模式类似，即创建一个仅用于继承过程的函数

```javascript
function createAnother(o) {
  // 创建新对象
  var clone = Object.create(o);
  // 增强这个对象
  o.say = function () {};
  return o;
}
```

缺点：

- 无法做到函数复用

<br/>

6. 寄生式组合继承：通过构造函数来继承属性，通过原型链的混成形式来继承方法

```javascript
function inheritsPrototype(subClass, superClass) {
  var prototype = Object.create(superClass.prototype);
  prototype.constructor = subClass;
  subClass.prototype = prototype;
}
```

集寄生式继承和组合继承的优点于一身，是实现基于类型继承的最有效方式

<br/>

## 实现一个继承 inherits 函数

使用上面所述的寄生组合式继承

```javascript
function inherits(subClass, superClass) {
  // ... 省略参数校验
  subClass.prototype = Object.create(superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
}


<!-- 使用 -->
function superClass(name) {
  this.name = name
}

superClass.prototype.say = function() {
  console.log(`hello my name is ${this.name}`)
}

function subClass(sex) {
  this.sex = sex
}

_inherits(subClass, superClass)
```

## ES5/6 继承的不同

<br/>

继承属性，方法，静态方法

- ES6 继承: 通过 extends 关键字
- ES5 继承: 通过修改原型链实现继承

本质：

- ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.call(this)）。
- ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

<br/>
