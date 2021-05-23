# Vuex

## 核心概念

- state 数据
- getter 可看成数据的计算属性
- mutation 唯一更改数据的方法 通过 store.commit 使用相应的 mutation 方法
- Action 支持异步的提交 mutation 通过 store.dispatch 使用相应的 Action 方法
- module 数据分模块。如 moduleA.xx

- Getters：(state, getters, rootState, rootGetters) => {}

- Mutations：(state, payload) => {}

- Actions：({commit, dispatch, state, getters, rootState, rootGetters}, payload) => {}

- module： { moduleA }

**_数据流_** ![vuex.png](https://vuex.vuejs.org/vuex.png)

## Vue 如何注入

在使用 Vue.use(vuex) 的时候会执行 install 方法在（vue 插件机制）。这个方法会混入一个 minxin：根实例的$store 会挂在每个组件上

```javascript
Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    // store injection
    // 非根组件指向其父组件的$store，使得所有组件的实例，都指向根的store对象
    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
});
```

## 如何实现响应式

通过添加到 data 中实现响应式

```javascript
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed // 这里是store的getter
});
```

> 源码路径：src/store.js resetStoreVM 函数
