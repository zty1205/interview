# 判断一个数是否是素数

```javascript
function isPrime(num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
```

#  获取n以内所有的素数

```javascript
function countPrimes(n) {
  // 1表示素数， 0 表示合数
  const isPrime = new Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      ans += 1;
      console.log('i = ', i);
      // 若改数为素数 那么 x * x , x+1 * x 等都是合数
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
}
```