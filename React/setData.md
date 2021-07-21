# setState

## 同步 or 异步

- 异步：在 react 的生命周期勾子或 react 事件监听回调中使用
- 同步：其他情况，如定时器回调，原生事件监听回调，promise 回调

为什么 setState 是异步的

- setState 出发 React 的更新生命周期函数 4 个函数：shouldComponentUpdate，componentWillUpdate，render，componentDidUpdate。如果每一次 setState 调用都走一圈生命周期，并拿 render 函数返回的结果会拿去做 Virtual DOM 比较和更新 DOM 树，这个就比较费时间。
- 目前 React 会将 setState 的效果放在队列中，积攒着一次引发更新过程。为的就是把 Virtual DOM 和 DOM 树操作降到最小，用于提高性能。

## setState 如何实现

```javascript
ReactComponent.prototype.setState = function (partialState, callback) {
  // 更新的操作会放在数组里
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
```

总体流程如下：

1. 将 state 放入 enqueueSetState 队列中，并调用 enqueueUpdate 处理要更新的 Component
2. 如果组件当前正处于 update 中(isBatchingUpdates)，则先将 Component 存入 dirtyComponent 中。否则调用 batchedUpdates 处理。
3. batchedUpdates 发起一次 transaction.perform()事务
4. 事务会更新 isBatchingUpdates 为 false，循环遍历所有的 dirtyComponents，调用 updateComponent 刷新组件，并执行它的 pendingCallbacks, 也就是 setState 中设置的 callback。
