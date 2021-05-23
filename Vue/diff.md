# vue 的 diff 原理

```javascript
// componentInstance上 是vue组件实例
// elm是DOM节点
function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
  // 只讲如何对比
}
```

1. 如果 ldVnode === vnode，则认为没有变化 return
2. 如果 oldVnode 跟 vnode 都是静态节点(实例不会发生变化)，且具有相同的 key，并且当 vnode 是克隆节点或是 v-once 指令控制的节点时，则把 oldVnode.componentInstance 赋值到 vnode.componentInstance 上
3. 如果 vnode 是文本节点但是 vnode.text != oldVnode.text 时只需要更新 vnode.elm 的文本内容就可以。
4. 如果 vnode 不是文本节点或注释节点
   1. 如果 vnode 和 oldVnode 都有子节点并且两者的子节点不一致时，就调用 updateChildren 更新子节点
   2. 如果只有 vnode 有子节点，则调用 addVnodes 创建子节点
   3. 如果只有 oldVnode 有子节点，则调用 removeVnodes 把这些子节点都删除
   4. 如果 vnode 文本为 undefined，则清空 vnode.elm 文

```javascript
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 对比
  }
  // 删除多余节点或新增节点
}

function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment && // 是否为注释节点
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) || // 当标签是<input>的时候，type必须相同
      (isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error)))
  );
}
```

思路是同层比较和首尾两端对比：

1. 使用 sameVnode 函数判断两个节点是否值得比较，值得比较则使用 patchVnode 进行对比。
2. 从 vnode 的首尾子节点和 oldVnode 的首尾子节点进行交叉比较。比较通过则移动下标，继续进行比较
   1. newStart vs oldStart;
   2. newEnd vs oldEnd;
   3. oldStart vs newEnd;
   4. newStart vs oldEnd;
3. 如果 newStart 设置了 key 值，则尝试去 oldChild 寻找相同 key 值的节点。
   1. 如果未找到该节点，如果未找到则新建一个节点
   2. 如果找到了且是相同类型的节点则进行 patchVnode。否则也是新建节点
4. while 遍历结束后，删除或新增剩余多余的节点。

在做对比中 key 的作用 主要是

- 决定节点是否可以复用
- 建立 key-index 的索引,主要是替代遍历，提升性能
