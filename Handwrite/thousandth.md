# 实现千位分隔符

\b单词边界，如果字符的左右两边有空白字符则为单词边界
\B'非单词边界'字符(这个字符可以是多个字符组成的整体)左右两边没有空白字符.

```javascript
let a = 'hw od'.replace(reg , ',')
// reg = \b => h,w,o,d
// reg = \B => h,w o,d
```

匹配模式 (?= 匹配条件)

```javascript
String.prototype.replace(arg1, function (replacement))
。
```
function (replacement) 一个用来创建新子字符串的函数，该函数的返回值将替换掉**第一个参数**匹配到的结果


```javascript
function formatCommaNumber1(number) {
  let arr = String(number).split('.');
  arr[0] = arr[0].replace(/\B(?=(\d{3})+\b)/g, ',');
  return arr.join('.');
}

function formatCommaNumber2(num) {
  return num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
}
```
