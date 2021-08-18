# 运行原理

注入 uni.runtime 原理和 MPVue 差不多

![mpvue.png](https://note.youdao.com/yws/res/30623/WEBRESOURCE53756971cdb449f2427ec34dabf02d63)

主要解决四个方面：

- Vue.js 实例与小程序 Page 实例建立关联小程序和 Vue.js - 生命周期建立映射关系，能在小程序生命周期中触发 Vue.js 生命周期
- 小程序事件建立代理机制，在事件代理函数中触发与之对应的 Vue.js 组件事件响应
- vue 与小程序的数据同步

**实例**

小程序实例的类型，可能的值是

- 'app': 对应 我们 vue 应用的最外层，也就是路由的挂载根节点 app.vue
- 'page': 除了 app.vue,其他的 vue 实例
- 'component': 其他的 vue 组件

在每个 vue 实例挂载的时候，会初始化，将 vue 实例的属性同步到小程序对应的实例上。其中一个属性 mpType，就是区别 app 或 page 的属性。（这里用的是 initMP 函数）

**生命周期**

生命周期都会调用在小程序生命周期时调用 callHook(rootVueVm, 'onload', query)

**事件处理**

1. 生成的 wxml 中，所有事件都被\_\_e 的函数(即 handleEvent)接管，并添加 data-event-opts="tap,chooseDrug,$event" 分别是事件，响应函数，event 对象

2. handeEevent 的作用 (实例：this.$vm)

包装 event 对象 // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]] （包装成 uni-appevent 对象（多了 mp 对象，x,y 等），）并添加了 preventDafault 和 stopPropagation 方法，但是 preventDafault 和 stopPropagation 方法是两个空函数(noop)，所以组织冒泡还是得使用.stop 修饰符通过 compile 编译成 catchEvent）

3. 触发响应函数

**更新机制**

在 vender.js 中的 patch 函数

对比新老 data

- 新的 data 存在 this.\_data 和 this.\_computedWatcher
- 老的数据 this.$scope.data  (this.$scope 指向的就是小程序实例) 最后调用 setData 更新 diffData

```javascript
this.__next_tick_pending = true;
mpInstance.setData(diffData, function () {
  this$1.__next_tick_pending = false;
  flushCallbacks$1(this$1); // setData的回调
});
```
