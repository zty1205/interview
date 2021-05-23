# v-model 基本原理

1. 首先在编译阶段，v-model 被当成普通指令解析到 el.directives，然后在解析 v-model 的时候，会根据节点的不同请求去执行不同的逻辑。
   - 如果节点是 select、checkbox, radio，则监听的是 change 事件
   - 如果节点是 input，textarea，则监听一般是 input 事件，在.lazy 下的情况下是 change 事件。
   - 如果节点是组件，则是使用自定义的回调函数
2. 在运行的时候，通过相应事件的监听函数去更改数据。

v-model 实质是一种语法糖，换成模板写法如下：

```html
<input :value="sth" @input="sth = $event.target.value" />
```

## 组件中使用 v-model

允许一个自定义组件在使用 v-model 时定制 prop 和 event。**默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event**，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

```javascript
// 默认value
export default {
  props: {
    value: String
  },
  methods: {
    add() {
      this.$emit('input', 'hello');
    }
  }
}

// 自定义名
export default {
  model: {
    prop: 'num', // 自定义属性名
    event: 'addNum' // 自定义事件名
  },
  props: {
    num: Number,
  },

  methods: {
    add() {
      this.$emit('addNum', this.num + 1)
    }
  }
}
```
