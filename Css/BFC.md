# BFC

## 什么是 BFC

<br/>

Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

块级格式化上下文 (Block Fromatting Context)。BFC 是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个 BFC 中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

<br/>

## 如何触发 BFC

<br/>

为了便于理解，我们换一种方式来重新定义 BFC。一个 HTML 元素要创建 BFC，则满足下列的任意一个或多个条件即可：

- body 元素
- float 的值不是 none。
- position 的值不是 static 或者 relative。
- display 的值是 inline-block、table-cell、flex、table-caption 或者 inline-flex
- overflow 的值不是 visible

<br/>

## BFC 的特性

<br/>

- 内部的 Box 会在垂直方向，一个接一个地放置。
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠 <font color=#ff502c>（margin 坍塌）</font>
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC 的区域不会与 float box 重叠。
- 计算 BFC 的高度时，浮动元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

<br/>

### margin 坍塌

同一个 BFC 下两个容器，第一个容器的下边距和第二个容器的上边距发生了重叠

![bfc1.png](http://note.youdao.com/yws/res/28463/WEBRESOURCEd51debedcf38901658aaf308f49980e3)

解决方法是让两个盒子属于两个不用的 bfc

```html
<div class="box"></div>
<div class="box"></div>

<div style="overflow: hidden">
  <div class="box"></div>
</div>
<div style="overflow: hidden">
  <div class="box"></div>
</div>
```

### BFC 可以包含浮动的元素（清除浮动）

![bfc2.png](http://note.youdao.com/yws/res/28474/WEBRESOURCEb8542ff900ef61d1224700c79a0a9d52)

```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>

<div style="border: 1px solid #000;">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

### BFC 可以阻止元素被浮动元素覆盖

![bfc3.png](http://note.youdao.com/yws/res/28483/WEBRESOURCE8c7a1eb4c6c1a15581488ed64d281906)

```html
<div style="height: 100px; width: 100px; float: left; background: lightblue">左浮动的元素</div>
<div style="width: 200px; height: 200px; background: #eee">
  没有浮动, 也没有触发 BFC 元素, 1111111111111111111111111111
</div>

<div class="h" style="height: 20px"></div>

<div style="height: 100px; width: 100px; float: left; background: lightblue">左浮动的元素</div>
<div style="width: 200px; height: 200px; background: #eee; overflow: hidden">
  没有浮动, 触发 BFC 元素, 1111111111111111111111111111
</div>
```
