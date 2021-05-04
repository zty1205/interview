# Title

new 的原理和实现一个 new

<br/>

## new 的原理

<br/>

1. 创建一个空对象，构造函数中的 this 指向这个空对象
2. 这个新对象的\_\_proto\_\_设置为即构造函数的 prototype
3. 执行构造函数方法，属性和方法被添加到 this 引用的对象中
4. 如果构造函数中没有返回其它对象，那么返回 this，即创建的这个的新对象，否则，返回构造函数中返回的对象。

<br/>

## 实现一个 new 函数

<br/>

```javascript
let _new = function (factory, ...rest) {
  let o = {
    __proto__: factory.prototype
  };
  let res = factory.apply(o, rest);
  return typeof res === 'object' ? res : o;
};
```
