# src 和 href 的区别

<br/>

- href：Hypertext Reference 的缩写，超文本引用，它指向一些网络资源，建立和当前元素或者说是本文档的链接关系。

```html
<a href="https://www.aaa.com"></a>

<link type="text/css" rel="stylesheet" href="aaa.css" />
```

- src：source 的所写，表示的是对资源的引用，它指向的内容会嵌入到当前标签所在的位置。

```html
<img src="aaa.jpg">

<iframe src="aaa.html">

<script src="aaa.js">
```

**_区别_**

- src 用于替代这个元素，而 href 用于建立这个标签与外部资源之间的关系。
- 浏览器需要加载完毕 src 的内容才会继续往下走。而遇到 href，页面会并行加载后续内容。
