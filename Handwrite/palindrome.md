# 判断是否是回文数

“回文”是指正读反读都能读通的句子，它是古今中外都有的一种修辞方式和文字游戏，如“我为人人，人人为我”等。在数学中也有这样一类数字有这样的特征，成为回文数（palindrome number）。

设n是一任意自然数。若将n的各位数字反向排列所得自然数n1与n相等，则称n为一回文数。例如，若n=1234321，则称n为一回文数；但若n=1234567，则n不是回文数。

注意：

- 偶数个的数字也有回文数124421
- 小数没有回文数

```javascript
// 使用字符串
var isPalindrome = function (x) {
  // 小于0的数
  if (x < 0) return false;
  // 0 - 9
  if (x < 10) return true;
  // 10的倍数
  if (x % 10 === 0) return false;
  let s = String(x);
  for (let start = 0, end = s.length - 1; start < end; start++, end--) {
    if (s[start] !== s[end]) return false;
  }
  return true;
};

// 重新生成一个数
var isPalindrome = function (x) {
  // 小于0的数
  if (x < 0) return false;
  // 0 - 9
  if (x < 10) return true;
  // 10的倍数
  if (x % 10 === 0) return false;
  let s = x;
  let num = 0;
  while (s > 0) {
    num = num * 10 + (s % 10);
    s = Math.floor(s / 10);
  }
  return num === x;
};
```