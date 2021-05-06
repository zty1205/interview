# hash 和 history 模式

<br/>

## hash

<br/>

- 使用 window.location.hash 属性及窗口的 onhashchange 事件，可以实现监听浏览器地址 hash 值变化，执行相应的 js 切换网页。下面具体介绍几个使用过程中必须理解的要点：

- hash 指的是地址中#号以及后面的字符，也称为散列值。hash 也称作锚点，本身是用来做页面跳转定位的。如 http://localhost/index.html#abc，这里的#abc 就是 hash；散列值是不会随请求发送到服务器端的，所以改变 hash，不会重新加载页面；
- 监听 window 的 hashchange 事件，当散列值改变时，可以通过 location.hash 来获取和设置 hash 值；
- location.hash 值的变化会直接反应到浏览器地址栏；

<br/>

## history

<br/>

- window.history 属性指向 History 对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路径，不会刷新页面。
- History 对象保存了当前窗口访问过的所有页面网址。通过 history.length 可以得出当前窗口一共访问过几个网址。
- 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
- 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。

```javascript
History.pushState()
History.replaceState()
window.addEventListener('popstate', function(e) {}
```

- 仅仅调用 pushState()方法或 replaceState()方法 ，并不会触发该事件;
- 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用 History.back()、History.forward()、History.go()方法时才会触发。 -m 另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
- 页面第一次加载的时候，浏览器不会触发 popstate 事件。
