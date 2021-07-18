# 实现字符串翻转

字符串通过char[]的形式表示

```javascript
// hello = ["h", "e", "l", "l", "o"]

function reverseString(s = []) {
  const n = s.length;
  for (let left = 0, right = n - 1; left < right; ++left, --right) {
    [s[left], s[right]] = [s[right], s[left]];
  }
}
```