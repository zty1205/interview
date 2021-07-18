# trim

实现对字符串前后的空格去除

```javascript
String.prototype._trim = function () {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
```