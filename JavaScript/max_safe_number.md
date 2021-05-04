# Title

最大安全数

## 最大安全数

js 使用 8 位浮动数存储数字，范围是-2^63 ~ 2^63 - 1。但是在超过一定的值后执行加减法就不正确了，这个值叫做最大安全值。

**最大安全值为 2^53-1** **最大安全值为-2^53+1**

js 中 Number 的存储结构是：

- 1 位符号位
- 11 位指数位
- 52 位尾数位

浮点数在保存数字的时候做了规格化处理，对于二进制来说， 小数点前保留一位， 规格化后始终是 1.\*\*\*, 节省了 1 bit，这个 1 并不需要保存。所以是 52+1=53。

可以使用第三方库如 bignum, bigInt 等处理

## 大数相加问题

即相加超过最大安全数的问题，此时只能使用字符串表示

```javascript
function add(num1, num2) {
  let n1 = '' + num1;
  let n2 = '' + num2;

  // 取两个数字的最大长度
  let maxLength = Math.max(n1.length, n2.length);
  // 用0去补齐长度
  n1 = n1.padStart(maxLength, 0); // "0009007199254740991"
  n2 = n2.padStart(maxLength, 0); // "1234567899999999999"

  let s = 0;
  let carry = 0;
  let sum = '';
  for (let i = maxLength - 1; i >= 0; i--) {
    s = parseInt(n1[i]) + parseInt(n2[i]) + carry;
    carry = Math.floor(s / 10);
    sum = (s % 10) + sum;
  }
  if (carry === '1') {
    sum = '1' + sum;
  }
  return sum;
}
```
