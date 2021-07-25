## 实现一个简单的redux

```javascript
<!-- 数据中心 和 发布订阅调度中心 -->
/**
 * 生成状态树
 * @param {*} reducer 纯函数 接受dispatch的action,对state进行操作
 * @param {*} enhancer 增强器，中间件
 */

export function createStore(reducer, enhancer) {

  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  let state = {}
  let listeners = []

  function getState() {
    return state
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('listeners should be a function')
    }
    listeners.push(listener)
  }

  function dispatch(action) {
   state = reducer(state, action)
   listeners.forEach(f => f())
   return action
  }

  dispatch({type: '@@zty/redux/init'}) // 初始化数据
  return {getState, subscribe, dispatch}
} 


// addGun = dispatch(addGun())
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

// creators = {addGun, removeGun}
export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((res, k) => {
    res[k] = bindActionCreator(creators[k], dispatch)
    return res
  }, {})
}

// [f1, f2, f3] = f1(f2(f3()))
export function compose(...funs) {
  if (!funs.length) {
    return f => f
  }
  if (funs.length === 1) {
    return funs[0]
  }
  return funs.reduce((res, fun) => (...args) => res(fun(...args)))
}

// 添加中间件
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const middlewaresChain = middlewares.map(mw => mw(midApi))
    // [f1, f2, f3] => f1(f2(f3))  形成中间件链路
    dispatch = compose(...middlewaresChain)(store.dispatch)
    
    return {
      ...store,
      dispatch
    }
  }
}
```
