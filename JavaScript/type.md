# 基础类型和类型检测

## 基础类型

- 简单类型：Undefined, Null, boolean, number, string。 *存储结构-栈*
- 复杂类型：Object, Array, Date, Function, RegExp （Symbol， Set, Map）*存储结构-堆*
- 基本包装类型：Boolean, Number, String *存储结构-堆*

## 类型检测

- typeof: 区分不了引用类型（typeof null === Object）
- instanceof: 区分不了普通类型
- constructor: 容易篡改
- Object.prototype.toString.call()： 完美(ES6的也能区分)

```javascript
Object.prototype.toString.call('a') === [Object String]
Object.prototype.toString.call(Null) === [Object Null]
```

**async 函数**
```javascript
Object.prototype.toString.call(async function () {}) ===[object AsyncFunction]
```

如果经过编译后就可能需要判断内容

```javascript
export function isAsyncFunction(fn){
    let fnStr =fn.toString()     
    return Object.prototype.toString.call(fn) === '[object AsyncFunction]' || fnStr.includes("return _regenerator.default.async(function")
}
```
