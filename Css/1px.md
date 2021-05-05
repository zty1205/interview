# 一像素边框

<br/>

## 媒体查询，写具体数值

<br/>

```css
.border {
  border: 1px solid #999;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border {
    border: 0.5px solid #999;
  }
}
```

<br/>

## 设置 border-image 方案

<br/>

```css
.border-image-1px {
  border-width: 1px 0px;
  -webkit-border-image: url('border.png') 2 0 stretch;
  border-image: url('border.png') 2 0 stretch;
}
```

<br/>

## box-shadow 方案, box-shadow: h-shadow v-shadow [blur] [spread] [color] [inset]; 分别是水平阴影位置，垂直阴影位置，模糊距离， 阴影尺寸，阴影颜色，将外部阴影改为内部阴影

<br/>

```css
box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
```

<br/>

## 伪元素 + transform + 媒体查询

<br/>

```css
<!-- ratio 2 -- > border-1px {
  position: relative;
}
.border-1px::after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  border-top: 1px solid #e6e6e6;
  width: 100%;
  height: 200%;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
```
