# Title

深拷贝

<br/>

## 浅拷贝和深拷贝

<br/>

简单来说，就是在拷贝复杂类型时，浅拷贝复制的是引用地址，深拷贝是拷贝一份新的属性。

如何实现深拷贝：

1. 通过 JSON 拷贝

```javascript
JSON.parse(JSON.stringify());
```

虽然简单，但是有一些缺陷：

- 不能拷贝原型链上的属性
- 对象的属性值是函数时，无法拷贝
- 不能正确的处理 Date, 得到了 Date.toString()
- 不能正确的处理 RegExp 类型的数据, 得到了 new Object()
- 会忽略 undefined, Symbol

<br/>

2. Object.assign({}, target) 或 {...target}

优点：

- 可以解决 JSON 不能处理或是无法拷贝的问题缺点是:
- 只能深拷贝最顶上的一层
- 不能拷贝原型链上的属性

<br/>

3. 实现一个递归的深拷贝函数

优点：

- 可以解决 JSON 不能处理或是无法拷贝的问题
- 可以获取原型链上的属性缺点是:
- 需要递归和逻辑较为复杂

下面是一个深拷贝的实现函数

<br/>

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 递归拷贝
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') return obj; // 简单类型

  if (hash.has(obj)) return hash.get(obj); // 循环引用

  let instance = new obj.constructor();
  hash.set(obj, instance);

  for (let key in obj) {
    // no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash);
    }
  }
  return instance;
}
```
