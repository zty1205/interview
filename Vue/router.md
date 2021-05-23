# Vue-Router

## 路由模式

- HashHistory 模式：实质是监听 onhashchange 事件 （window.location API - location.hash）
- HTML5History 模式：实质是使用 h5 的 window.history API, 监听 popstate 事件（pushState, replaceState）。**_使用该模式，服务器和前端需要做好页面 404 的处理_**
- AbstractHistory 模式：在不支持上面两种方式的环境下使用，如 node 环境，实际是使用数组模拟路由历史栈

## 导航守卫

- 全局守卫

  - router.beforeEach((to, from, next) => {})
  - router.afterEach((to, from) => {})
  - router.beforeResolve((to, from) => {}) 。与 afterEach 类似, 区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用

- 路由独享守卫(router 文件内)

  - beforeEnter: (to, from, next) => {}

- 组件内守卫 - beforeRouteEnter (to, from, next) { // 在渲染该组件的对应路由被 confirm 前调用 // 不！能！获取组件实例 `this` // 因为当守卫执行前，组件实例还没被创建 }, - beforeRouteUpdate (to, from, next) { // 在当前路由改变，但是该组件被复用时调用 // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候， // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。 // 可以访问组件实例 `this` }, - beforeRouteLeave (to, from, next) { // 导航离开该组件的对应路由时调用 // 可以访问组件实例 `this` } }

## 导航守卫的顺序，导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

导航守卫如何按顺序执行和 next 的实现

```javascript
// 顺序执行
export function runQueue(queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  const step = (index) => {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], () => {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

// 上面的fn会传入下面的函数
const iterator = (hook: NavigationGuard, next) => {
  if (this.pending !== route) {
    return abort(createNavigationCancelledError(current, route));
  }
  try {
    hook(route, current, (to: any) => {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this.ensureURL(true);
        abort(createNavigationAbortedError(current, route));
      } else if (isError(to)) {
        this.ensureURL(true);
        abort(to);
      } else if (
        typeof to === 'string' ||
        (typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string'))
      ) {
        // next('/') or next({ path: '/' }) -> redirect
        abort(createNavigationRedirectedError(current, route));
        if (typeof to === 'object' && to.replace) {
          this.replace(to);
        } else {
          this.push(to);
        }
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  } catch (e) {
    abort(e);
  }
};
```

## vue-router 如何注入

- 基于 vue 的插件机制，全局混入 beforeCreated 和 destroyed 的生命钩子
- 查找根实例上的 route，注入到每个组件上，监听 current 变化

```javascript
Vue.mixin({
  beforeCreate() {
    if (isDef(this.$options.router)) {
      this._routerRoot = this;
      this._router = this.$options.router;
      this._router.init(this);
      Vue.util.defineReactive(this, '_route', this._router.history.current);
    } else {
      this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
    }
    registerInstance(this, this);
  },
  destroyed() {
    registerInstance(this);
  }
});
```

- vue 原型上添加两个属性$router和$route, 拦截 get 操作，限制 set 操作

```javascript
Object.defineProperty(Vue.prototype, '$router', {
  get() {
    return this._routerRoot._router;
  }
});
```

- 注册全局组件 RouterView 和 RouterLink

## route 和 router

- router 是 VueRouter 的一个对象，通过 Vue.use(VueRouter)和 VueRouter 构造函数得到一个 router 的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性。

- route 是一个跳转的路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name,path,params,query 等
