# 事件

## 事件捕获流，冒泡流和事件委托

- 事件流描述的是从页面中接收事件的顺序。
- 类型
  - 事件冒泡流：事件的传播是从最特定的事件目标到最不特定的事件目标。即从 DOM 树的叶子到根。（IE）
  - 事件捕获流：事件的传播是从最不特定的事件目标到最特定的事件目标。即从 DOM 树的根到叶子。（网景公司）
- DOM 标准规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。
  - 事件捕获阶段：实际目标（<text>）在捕获阶段不会接收事件。也就是在捕获阶段，事件从(window ->)document 到<html>再到<body>就停止了。
  - 处于目标阶段：事件在<text>上发生并处理。但是事件处理会被看成是冒泡阶段的一部分。
  - 冒泡阶段：事件又传播回文档。
- 事件委托又叫事件代理，是根据事件冒泡流，让父元素代理响应函数减少 DOM 的访问
  - target：触发事件的 DOM
  - currentTarget：绑定事件的 DOM

**_注意以下事件不支持冒泡_**：

- blur
- focus
- load
- unload
- 以及自定义的事件。

原因是在于：这些事件仅发生于自身上，而它的任何父节点上的事件都不会产生，所有不会冒泡

<font color=#ff502c>如何阻止事件捕获或冒泡</font>

- 阻止冒泡

```javascript
e.stopPropagation() || return false。

window.e.cancelBubble=true; // IE
```

- 阻止捕获

```javascript
e.stopImmediatePropagation(); // 阻止捕获和其他事件
```

- 阻止默认事件: 事件处理过程中，不阻击事件冒泡，但阻击默认行为

```javascript
e.preventDefault()

window.e.returnValue=false; || return false;// IE
```

### DOM 事件

```javascript
// DOM-1 on-xx 只能绑定一个
EventTarget.onload = function () {};
// DOM-2 可以绑定多个
EventTarget.addEventListener(
  'load',
  (e) => {},
  true ||
    false || {
      capture: '是否在捕获阶段触发',
      once: '是否只执行一次',
      passive: '函数不会调用 preventDefault()'
    }
);
// 移除
EventTarget.removeEventListener();
// 派发
EventTarget.dispatchEvent();
// dom-3新增了许多其他事件
```
