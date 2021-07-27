# vue 事件机制

## dom 事件

编译阶段 parse

调用 processAttrs(el)， parseModifiers 使用正则匹配事件 v-on 和@xxx。最后添加到 el.events 和 el.nativeEvents

- 编译阶段 codeGen

codeGen 阶段、执行的 genElement 中的 genData() 生成虚拟渲染函数

- 挂载后

虚拟 dom 转化到实际 dom，并调用原生 addEventListener 绑定事件

.native - 监听组件根元素的原生事件。例如

```html
<comp @click.native=""></comp>
```

如果子组件不 emit click 事件，那么跟组件可以通过.native 监听点击事件

## 事件委托

vue 在处理大列表绑定事件的时候，是有一定的性能问题的，框架内部没有把事件提到父节点上来做事件委托，唯一优化的是列表之间绑定的事件指向的函数都是同一个引用，且在 dom 销毁的时候能主动销毁事件，所以能负载一定的数据量，如果业务里的确存在非常大量的数据，建议还是自己在父节点上进行事件绑定，或者改变交互，进行分页。

## eventsMixin

在 vue 实例上绑定了$on, $emit, $off, $once, 作为一个事件中心

emit 其实是触发自身的事件 因为 event 属性是绑在子组件上的 虽然回调函数是定义在父组件上的

## 自定义事件

对于自定义事件时间，会在组件初始化节点通过 initEvents 创建 (放在子组件的$listener 对象 和 \_events 对象上，但 \_events 上的回调 bind 的是父组件的 this) 原生 DOM 事件和自定义事件主要的区别就在于添加和删除事件的方式不一样，并且自定义事件的派发是往当前实例上派发，但是可以利用在父组件环境定义回调函数来实现父子组件的通讯
