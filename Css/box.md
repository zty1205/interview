# 盒子模型

<br/>

如图所示：

<br/>

![盒子模型.png](./img/box.png)

&emsp;&emsp; 一个盒子模型可分成 margin(外边距), border(边框), padding(内边距), content(内容)， 四部分组成。

<br/>

盒子模型分为标准盒子模型和 IE 盒子模型。区别是:

- 标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
- IE 盒子模型中，width 和 height 指的是内容区域+padding+border 的宽度和高度。

<br/>

## 如何使用这两种模型

<br/>

使用 css3 的 box-sizing 属性: content-box|border-box|inherit;

- content-box: 使用标准盒子模型
- border-box: 使用 IE 盒子模型

<br/>

## 如何获取对应盒模型的宽高

<br/>

- dom.style.width/height 只能取到行内样式的宽和高，style 标签中和 link 外链的样式取不到。
- dom.currentStyle.width/height 取到的是最终渲染后的宽和高，只有 IE 支持此属性。
- window.getComputedStyle(dom).width/height 同（2）但是多浏览器支持，IE9 以上支持。
- dom.getBoundingClientRect().width/height 也是得到渲染后的宽和高，大多浏览器支持。IE9 以上支持，除此外还可以取到相对于视窗的上下左右的距离
