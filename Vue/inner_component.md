# 内置组件

## slot

普通插槽：

在父组件编译和渲染阶段生成 vnodes, 所以数据的作用域都是父组件实例，子组件渲染的时候直接拿到这样渲染好的 vnodes

作用域插槽:

父组件在编译和渲染阶段并不会直接生成 vnodes，而是在父节点 Vnode 的 data 中保留一个 scopedSlots 对象，存储值不同名称的插槽以及它们对应的渲染函数，只用在子组件渲染阶段才会执行这个渲染函数生成 vnodes

## keep-alive

1. ⾸次渲染⽽⾔，除了在<keep-alive> 中建⽴缓存，和普通组件渲染没什么区别
2. 缓存渲染，把缓存的 DOM 对象直接插⼊到⽬标元素中，这样就完成了在数据更新的情况下的渲染过程，且再次渲染的时候就不会执⾏ created 、 mounted 等钩⼦函数，

## transition 和 transition-group

transition 抽象组件而 transition-group 渲染真实节点 4 种情况

- v-show
- v-if
- component is
- 组件根节点

总结起来，Vue 的过渡实现分为以下⼏个步骤：

1. ⾃动嗅探⽬标元素是否应⽤了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 JavaScript 钩⼦函数，这些钩⼦函数将在恰当的时机被调⽤。
3. 如果没有找到 JavaScript 钩⼦并且也没有检测到 CSS 过渡/动画，DOM 操作 (插⼊/删除) 在下⼀帧中⽴即执
