# 前端常见优化

## 构建工具帮我们完成的

- 前置 css，后置 js，防止 js 加载，运行影响页面渲染
- 将小图达成 base64，减少资源请求。[file-loader, url-loader,...]
- 压缩精简 html，css 和 js，减小打包体积。 [uglifyjs, OptimizeCssAssetsPlugin, ...]
- Gzip 压缩，该功能需要服务器支持才能正常显示页面
- css 预处理器，开启 css 编程之路

## HTML

- 减少 DOM 数量
- 避免重排和重绘: 减少 DOM 操作，动画优先使用 **_opacity， transform_** 属性; 合并 DOM 的读写操作，如使用 document.createDocumentFragment(); 使用虚拟 DOM 的思想
- 使用特殊的函数，优化条件渲染：window.requestAnimationFrame()， window.requestIdleCallback()

## CSS

- 避免使用 css 表达式
- 使用 css sprite 雪碧图，减少图片请求
- 在不影响画质的情况下，使用合理的图片格式和压缩图片，优先使用 JPG 格式，如果能用 css3 实现动画，则尽量不使用 GIF。如果能使用 canvas 或 SVG 实现，则尽量不使用图片

## JS

- 使用 JavaScript Cache API，我们可以使用 service worker。
- 延迟不必要的 JS 首屏加载 defer , aysc, 动态添加 script 节点
- 删除未使用的 JavaScript 和 合并重复的代码 减少编译时间（JIT）
- 避免内存泄漏 意外的全局变量；没有销毁的计时器；已经删除的 DOM 还是被引用，（删除 DOM 后将变量设值为 null 可以避免这个问题）
- 避免使用全局变量 & 优先使用局部变量，作用域链查找更快
- 使用 web workers 处理需要大量执行时间的代码（子线程）
- 合理使用事件代理。合并类似的操作，节约内存空间，减少 DOM 操作
- 使用高级函数等，例如 addEvent 的兼容惰性加载函数

```javascript
let addEvent1 = (type, element, fun) => {
  if (element.addEventListener) {
    addEvent1 = (type, element, fun) => {
      element.addEventListener(type, fun, false);
    };
  } else if (element.attachEvent) {
    addEvent1 = (type, element, fun) => {
      element.attachEvent('on' + type, fun);
    };
  } else {
    addEvent1 = (type, element, fun) => {
      element['on' + type] = fun;
    };
  }
  return addEvent1(type, element, fun);
};
```

## React 相关优化

### 更合理的 Props 和 state 写法

```JSX
function(props) {
  return <div>{props.name}</div>
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'zty',
      age: 18
    }
    this.click = this.click.bind(this) // 绑定函数方式1
    this.data = {user: 'zty'}
  }
  click() {}
  click1() {}
  render() {
    return (
      <div>
        <button onClick={this.click1.bind(this)}></button> // 绑定函数方式2
        <button onClick={() => this.click1()}></button> // 绑定函数方式3
        <button style={{color: 'red'}}></button> // 内联对象
        <btn {...this.state}></btn> // 传递了不必要的属性
      </div>
    )
  }
}
```

在我们的 render 函数不推荐使用 bind 和箭头函数，因为每次 render 的时候都需要重新 bind 和生成 click 事件的响应函数，内联的对象也是如此。

推荐:

- 在构造函数里使用 bind
- 尽量不使用内联的对象
- 不传递不必要的属性

### 合理使用 shouldComponentUpdate 和 PureComponent

react 的生命周期 shouldComponentUpdate 可以控制本次是否重新渲染组件。当父组件更新的时候我们可以进行 props 或 state 的对比来判断本次更新数据是否渲染组件。你可以使用以下方式:

- 写一个简单的对象对比函数
- 使用 immuntable.js
- 使用 React.PureComponent

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true || false
}
```

## Vue 相关优化

在 vue2.0 中不在 data 上使用嵌套多层的对象，或使用 Object.freeze 冻结对象。vue3 中使用了 lazy reactive 不用担心这个。

### 异步加载路由

异步加载路由对应的组件：异步打包 chunk,在路由跳转该页面是加载该 chunk

- import()
- require.ensure()

例子：

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: import(/* webpackChunkName: "foo" */ './Foo.vue')
    }
  ]
});
```

### 自动生成路由文件

通过 require.context，自动生成路由 规范命名，可参考 ssr 的命名，可以实现动态路由，即:id.vue（nuxt 用的是 glob）。

require.context 返回的是**webpack**require\_\_(idx) '../components/foo'对应的下标

```javascript
let r = require.context('../components/foo', true, /\.vue$/);
let arr = [];
r.keys().map((name) => {
  const nameArr = name.split('.');
  const comp = r(name).default;
  arr.push({
    path: `/foo${nameArr[1]}`,
    component: comp,
    title: comp.name,
    meta: comp.meta
  });
});
console.log('arr = ', arr);
```

### 动态注册 store

store 有个 API：

```javascript
/**
 *
 * @param {*} name 模块名
 * @param {*} module store中的一个模块
 * @param {*} config 配置，合并策略
 */
function registerModule(name, module, config) {}
```

我们可以开发一个插件：当某个页面需要使用 vuex 时，动态注册 store。例子如下：

```javascript
export const dynamicModule = {
  install: function(Vue) {
    console.log('install')
    Vue.mixin({
      beforeCreate: function() {
        if (this.$options.dynamicVuex) {
          import('./store/module/simple.store.js').then(module => { // or require.ensure
            console.log('then module = ', module)
            this.$store.registerModule('dyModule', module.default)
          })
        }
      },

    })
  },
  uninstall: function() {
    ...
  }
}
```

## 工程化

- 使用 CDN 分发网络，请求资源更快
- 减少 HTTP 请求次数，减少 DNS 查询次数（尽量减少主机名），避免重定向
- DNS 预获取 link 标签 ref='dns-prefetch' herf=''
- 使 AJAX 可缓存：get 请求可在客户端缓存；post 请求不能再客户端缓存，但是服务端可以缓存数据（redis，memorycache 等），提高请求速度。
- 模块化，组件库，工具库
- 微前端
- SSR 和预渲染，提高渲染速度和更好的性能体验

## 结束语

持续更新中...
