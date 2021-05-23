# Babel

## 核心包

- babel-core：babel 转译器本身，提供了 babel 的转译 API，如 babel.transform 等，用于对代码进行转译。像 webpack 的 babel-loader 就是调用这些 API 来完成转译过程的。
- babylon：js 的词法解析器
- babel-traverse：用于对 AST（抽象语法树，想了解的请自行查询编译原理）的遍历，主要给 plugin 用
- babel-generator：根据 AST 生成代码

## babel 的工作原理

babel 的转译过程分为三个阶段：parsing、transforming、generating，以 ES6 代码转译为 ES5 代码为例，babel 转译的具体过程如下：

1. ES6 代码输入
2. babylon 进行解析得到 AST
3. plugin 用 babel-traverse 对 AST 树进行遍历转译
4. 得到新的 AST 树
5. 用 babel-generator 通过 AST 树生成 ES5 代码

此外，还要注意很重要的一点就是，babel 只是转译新标准引入的语法，比如 ES6 的箭头函数转译成 ES5 的函数；而新标准引入的新的原生对象，部分原生对象新增的原型方法，新增的 API 等（如 Proxy、Set 等），这些 babel 是不会转译的。需要用户自行引入 polyfill 来解决

## polyfill, runtime, core-js

- polyfill: 那处理类似 assign,includes,map,includes ，某些浏览器 没有的方法 最直接的办法的是 根据 一份浏览器不兼容的表格(这个 browserslist 已经完成了)，把对应浏览器不支持的语法全部重新写一遍，这样会导致 polyfill.js 这个包非常大。 但 preset 中的"useBuiltIns": "usage" 支持局部引入。
- runtime：为了满足 npm 组件开发的需要，出现了 @babel/runtime 来做隔离。如\_Promise 对 Promise 的实现
- core-js：polyfill、runtime 的核心，因为 polyfill 和 runtime 其实都只是对 core-js 和 regenerator 的再封装，方便使用而已。core-js 的结构是高度模块化的，它把每个特性都组织到一个小模块里，然后再把这些小模块组合成一个大特性，层层组织。比如： core-js/es6/array
