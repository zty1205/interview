# Title

实现 bind call apply

<br/>

## 实现一个 bind

<br/>

```javascript
Function.prototype._bind = function (context, ...args) {
  context = context || window;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  return function (..._args) {
    args = args.concat(_args);

    context[fnSymbol](...args);
    delete context[fnSymbol];
  };
};
```

<br/>

## 实现一个 call

<br/>

```javascript
Function.prototype._call = function (context, ...args) {
  context = context || window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this; // 这个this 就是这个函数实例了

  context[fnSymbol](...args);
  delete context[fnSymbol];
};
```

<br/>

## 实现一个 apply

<br/>

```javascript
Function.prototype._apply = function (context, argsArr) {
  context = context || window;

  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;

  context[fnSymbol](...argsArr);
  delete context[fnSymbol];
};
```
