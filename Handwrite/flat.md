# 拍平数组和对象

Array.phototype.flat()

- 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
- 不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
- 传入 <=0 的整数将返回原数组，不“拉平”
Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
- 如果原数组有空位，Array.prototype.flat() 会跳过空位。

拓展

**ES5 对空位的处理，就非常不一致，大多数情况下会忽略空位。**

- forEach(), filter(), reduce(), every() 和some() 都会跳过空位。
- map() 会跳过空位，但会保留这个值。
- join() 和 toString() 会将空位视为 undefined，而undefined 和 null 会被处理成空字符串。


**ES6 明确将空位转为 undefined。**

entries()、keys()、values()、find() 和 findIndex() 会将空位处理成 undefined。
for...of 循环会遍历空位。
fill() 会将空位视为正常的数组位置。
copyWithin() 会连空位一起拷贝。
扩展运算符（...）也会将空位转为 undefined。
Array.from 方法会将数组的空位，转为 undefined。

## 不考虑层数

```javascript
function flat2(arr = []) {
  while (arr.some((x) => Array.isArray(x))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flat3(arr = []) {
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? pre.concat(flat3(cur)) : pre.concat(cur);
  }, []);
}

function flat4(arr = []) {
  let stack = [...arr];
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.unshift(item);
    }
  }
  return res;
}
```

## 考虑层数

```javascript
function flat5(arr, dep = 1) {
  return dep > 0
    ? arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat5(cur, dep - 1) : cur), [])
    : arr.slice();
}

function flat6(arr, dep = 1) {
  let array = [...arr];
  while (dep > 0) {
    if (array.some((x) => Array.isArray(x))) {
      array = [].concat(...array);
    } else {
      break;
    }
    dep--;
  }
  return array;
}
```

## 对象的扁平化

只包含普通类型，数组和对象。例如

```javascript
{
    num: 1,
    arr: [1, 2]
    obj: {
        name: 'name'
    }
}

// 偏平化后=>
{
    num: 1,
    arr.[0]: 1,
    arr.[1]: 2,
    obj.name: 'name'
}
```
  
```javascript
function _typeof(object) {
  let _toString = Object.prototype.toString
  return _toString.call(object)
}

function flatten(obj) {
  if (!obj) return
  let res = {}

  function flat(key, value) {
    if (_typeof(value) === "[object Array]") {
      if (value.length === 0) {
        res[key] = []
        return
      }
      for(let k in value) {
        flat(key ? `${key}.[${k}]` : k, value[k])
      }
    } else if (_typeof(value) === "[object Object]") {
      if (Object.keys(value).length === 0) {
        res[key] = {}
        return
      }
      for(let k in value) {
        flat(key ? `${key}.${k}` : k, value[k])
      }
    } else {
      res[key] = value
    }
  }

  flat('', obj)
  return res
}
```