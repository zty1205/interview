# Title

防抖和节流

<br/>

## 防抖和节流

<br/>

防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。

- 函数防抖: debounce
  - 定义：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。
- 函数节流: throttle
  - 定义：触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。。
- 简单实现:

```javaScript
function debounce(fn, delay) {
  let timer;
  return function(...rest) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, rest), delay)
  }
}
```

```javaScript
function throttle(fn, delay) {
  let start
  return function(...rest) {
    let now =  Date.now()
    !start && (start = now)

    if (now - start >= delay) {
      fn.apply(this, rest)
      start = now
    }
  }
}

function throttle2(fn, delay){
  let timer
  return function(...rest){
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(this, rest);
        timer = null;
      }, delay)
    }
  }
}
```
