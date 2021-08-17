# js异步发展方案

## 回调函数callback

- 优点：解决了同步的问题
- 缺点：
    - 回调地狱
    - 异步回调无法使用try-catch捕获
    - 不能return

## Promise

- 优点：链式调用，解决了回调地狱的问题
- 缺点：不能取消

## generator

函数外面用*，内部异步用yield
特点：可以控制函数的执行

## async/await

- 优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题
- 缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。