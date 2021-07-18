# 实现一个模板引擎

underscore的template方法

```javascript
function tmpl(text, data) {
  const fn = new Function(
    'obj',
    "let p = []; with(obj){p.push('" +
      text
        .replace(/[\r\t\n]/g, '') // 替换回车
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "');")
        .replace(/%>/g, "p.push('") +
      "');}return p.join('');"
  );

  const template = function (data) {
    return fn.call(this, data);
  };
  return template;
}
```