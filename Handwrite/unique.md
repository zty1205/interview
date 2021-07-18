# 数组去重

## ES5版本(有缺陷)

```javascript
// {value: 1} {value:1}  也被去掉了 这是不对的
function unique1(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    // 区别  1和"1" 和 对象
    let key = typeof item + JSON.stringify(item);
    return obj[key] ? false : (obj[key] = true);
  });
}

```

## ES6版本

```javascript
function unique(arr = []) {
  return [...new Set(arr)];
}

function unique(arr = []) {
  const map = new Map();
  return arr.filter((x) => !map.has(x) && map.set(x, 1));
}
```
