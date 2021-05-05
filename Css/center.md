# 居中方案

## 水平居中

- 行内元素: text-align: center;
- 设置宽度 + margin: xxx auto;
- flex 的 justify-content: center;
- grid 的 justify-items: center;
- 父元素相对定位，子元素绝对定位，left:50%。 如果子元素宽度已知，使用 margin-left: -子元素宽度/2; 宽度未知，则使用 transformX(-50%);

## 垂直居中

- 行内元素: padding-top = padding-bottom
- 行内元素: line-height = height
- 父元素 display:table; 子元素 display:table-cell; vertical-align: middle;
- flex 的 align-items: center;
- grid 的 align-items: center;
- 父元素相对定位，子元素绝对定位，top:50%。 如果子元素高度已知，使用 margin-top: -子元素高度/2; 宽度未知，则使用 transformY(-50%);
- 父元素相对定位，子元素绝对定位。 子元素 height: xxx; top: 0; bottom: 0; margin: auto xxx;

## 水平垂直居中

- 已知高宽，使用负边距法
- 未知，使用 grid, flex 或 transfrom
