# Title

柯里化

## 柯里化

```javascript
function curry(fn, args) {
  let length = fn.length;

  args = args || [];

  return function () {
    let _args = args.slice(0);

    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }

    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
```

```javascript
function curry(fn, ...args) {
  return args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args);
}
```
