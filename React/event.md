# react 的事件机制

## 合成事件

在 react 中使用 jsx 语法绑定的事件并不是原生事件，而是一种合成事件 SyntheticEvent。例如 SyntheticEvent, SyntheticKeyboardEvent, SyntheticFocusEvent 等。他有以下特点：

- 默认的事件流是冒泡，如果以捕获的方式来触发事件的话，事件类型后面加一个后缀 Capture
- 几乎所有的事件代理(delegate)到 document，达到性能优化的目的，例如对于 audio、video 标签，存在一些媒体事件(例如 onplay、onpause)，只能在这些标签上进行事件绑定，绑定一个入口分发函数(dispatchEvent)
- 对于每种类型的事件，拥有统一的分发函数 dispatchEvent
- 事件对象(event)是合成对象(SyntheticEvent)，不是原生的。所以 e.stopPropagation()方法阻止的知识合成事件流的传播。

## 如何实现

React 事件机制分为事件注册，和事件分发，两个部分。

- 组件加载 (mountComponent)、更新 (updateComponent) 的时候，调用 \_updateDOMProperties 方法对 props 进行处理，将事件绑定在 document 上，并存储在 EventPluginHub 中（订阅发布中心）
- 回调统一是 ReactEventListener 的 dispatch 方法。通过\_dispatchListeners 里得到所有绑定的回调函数，然后循环执行里面的所有的回调函数
