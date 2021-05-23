# 模块化发展历程

- IIFE： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。
- AMD： 使用 requireJS 来编写模块化，特点：依赖必须提前声明好。
- CMD： 使用 seaJS 来编写模块化，特点：支持动态引入依赖文件。
- CommonJS： nodejs 中自带的模块化。
- UMD：兼容 AMD，CommonJS 模块化语法。
- ES Modules： ES6 引入的模块化，支持 import 来引入另一个 js 。

## IIFE

IIFE（立即调用函数表达式）

```javascript
var m1 = (function () {
  var name = 'zty';
  return name;
})();

// IIFE 执行后返回的结果：
m1; // "zty"
```

IIFE 拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

## AMD 和 CMD

- AMD 是 RequireJS 在推广过程中对模块定义的规范化而产出的。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化而产出的。
- 对于依赖的模块，AMD 可以提前执行，也可以延迟执行，CMD 则是延迟执行。
- AMD 推崇依赖前置，CMD 则推崇就近依赖。
- AMD 支持全局 require、局部 require，但是 CMD 则不支持全局 require。

```Javascript
// AMD  依赖前置
define(['./zty', './ty'], function(zty, ty) {
  zty.sayName()
  ty.sayName()
})

// CMD
define(function(require, exprots, module) {
  var zty = require('./zty')
  zty.sayName()
  // 需要的时候才去require
  var ty = require('./ty')
  ty.sayName()
})
```

## CommonJs

- 主要运用在服务端 js，如 node
- 全局对象：global
- 一个文件就是一个模块，拥有单独的作用域，所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；
- 同步加载
- 通过 require 来加载模块：require 基本功能：读取并执行一个 JS 文件，然后返回该模块的 module.exports 对象，如果没有发现指定模块会报错
- 通过 exports 和 module.exports 来暴露模块中的内容

## UMD

UMD 是为了让同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行。

```Javascript
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        global.returnExports = factory(global.jQuery);
    }
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
   // methods
      ...
   return {...}
}))
```

## ES6 Module

- 严格模式
- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable 的使得编译时就能确定模块的依赖关系，以及输入和输出的变量

## ES6 Module 和 CommonJS 的区别

- CommonJS 模块是运行时加载，ES6 Modules 是编译时输出接口
- CommonJS 输出是值的拷贝；ES6 Modules 输出的是值的引用，被输出模块的内部的改变会影响引用的改变
- CommonJs 导入的模块路径可以是一个表达式，因为它使用的是 require()方法；而 ES6 - Modules 只能是字符串
- CommonJS this 指向当前模块，ES6 Modules this 指向 undefined
- 且 ES6 Modules 中没有这些顶层变量：arguments、require、module、exports、**filename、**dirname
