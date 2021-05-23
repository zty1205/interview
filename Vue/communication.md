# vue 中通信方式

- props 和 $emit
- $parent 和 $children
- ref 和 refs
- $attr 和 $listener: v-bind="$attrs" v-on="$listeners"
- provide 和 inject: 实质就是递归父组件帮你寻找对应的 provider  
  provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
- vueBus: 中央事务总线，一个发布订阅中心
- vuex：状态树管理
