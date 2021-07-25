# redux

## 基本概念

- state: 数据，即状态
- Action: 一个纯对象，携带这个操作的类型和数据信息
- Action Creater: 一个函数，根据指定参数，来生成一个Action，目的是减少代码量
- Reducer: 一个纯函数，用来修改应用的状态，接收当前State和Action，返回一个新的State。
    - 不得改写参数
    - 不得调用系统的I/O的API
    - 不得调用Date.now()或者Math.random()等不纯的方法，因为每次得到的结果会不一样
    - 不能改变State，必须返回一个新的对象，具体可以使用{...obj}运算符或者Object.assign()来操作
- combineReducers: 一个函数，将多个小的Reducer合并成一个大的Reducer
- Store: 数据存储中心
    - Store.getState() 获取Store当前的状态
    - Store.dispatch() 分派一个Action，用来修改Store的状态，从View中发出Action的唯一方法
    - Store.subscribe() 订阅一个监听器，当Store的状态发生改变的时候，执行函数
- Middlewares: 中间件, 中间件实际上就是一个拦截器，本质是一个函数，拦截所有的Action，并执行特定的操作
    - compose函数，将[f1, f2, f3] => f1(f2(f3(x))) 

## 数据流

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1. 调用 store.dispatch(action)。
2. Redux store 调用传入的 reducer 函数。
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
4. Redux store 保存了根 reducer 返回的完整 state 树。

![redux.png](WEBRESOURCE790f9aff9bd251485d284b219bae5084)

> 官网地址：https://www.redux.org.cn/docs/basics/DataFlow.html


## react-redux

- Provider

 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法。

- connect

```javascript
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

连接 React 组件与 Redux store。

连接操作不会改变原来的组件类。
反而返回一个新的已与 Redux store 连接的组件类。
