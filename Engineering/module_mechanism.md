# JS五种模块化方案

<br/>

## js模块化

&emsp;&emsp;
JS模块化是将一些公共的js抽离成一个个单独的模块，实现解决命名冲突，提高代码复用性等目的。下面带大家了解js中的5种模块化规范，分别是:
- AMD
- CMD
- CommonJS
- ES6 Module
- UMD
  
<br>
---
<br>
<div align=center><font color=#008000 size=4>01 AMD 和 CMD</font></div>
<br>

先来了解下AMD 和 CMD 两兄弟：首先

- AMD 是 RequireJS 在推广过程中对模块定义的规范化而产出的。
- CMD 是 SeaJS 在推广过程中对模块定义的规范化而产出的。

两者都能实现浏览器端的js模块化开发，不同之处且听下方娓娓道来：

- 对于依赖的模块，AMD可以提前执行，也可以延迟执行，CMD则是延迟执行。
- AMD推崇依赖前置，CMD则推崇就近依赖。（可以说，CMD就是个"懒人"）
- AMD支持全局require、局部require，但是CMD则不支持全局require，所以CMD没有全局API而AMD有。

看一下例子：

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

<br/>
两种写法都是定义一个模块，且该模块依赖于模块zty和模块ty。这里不再多介绍，更多的区别可见

https://github.com/seajs/seajs/issues/277。 


<br>
---
<br>
<div align=center><font color=#008000 size=4>02 CommonJS</font></div>
<br/>

CommonJS是为服务器提供的一种模块形式的优化，CommonJS模块建议指定一个简单的用于声明模块服务器端的API，并且不像AMD那样尝试去广泛的操心诸如io，文件系统，约定以及更多的一揽子问题。它有以下特点：

- 主要运用在服务端js，如node
- 全局对象：global
- 一个文件就是一个模块，拥有单独的作用域，所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；(你可以暴露一个时间戳来测试)
- 模块的加载顺序，按照代码的出现顺序，
- 同步加载
- 通过 require 来加载模块：require基本功能：读取并执行一个JS文件，然后返回该模块的module.exports对象，如果没有发现指定模块会报错
- 通过 exports 和 module.exports 来暴露模块中的内容


<font color=red size=3>那么 exports 和 module.exports有什么区别呢？</font>

- 模块内的exports：为了方便，node为每个模块提供一个exports变量，其指向module.exports，相当于在模块头部加了这句话：var exports = module.exports，在对外输出时，可以给module.exports对象添加方法

- module.exports 方法还可以单独返回一个数据类型(String、Number、Object...)，而 exports 只能返回一个 Object 对象。所有的 exports 对象最终都是通过 module.exports 传递执行，因此可以更确切地说，exports 是给 module.exports 添加属性和方法。


<br>
---
<br>
<div align=center><font color=#008000 size=4>03 ES6-Module</font></div>
<br/>

ES6模块化规范是ES6在语言标准的层面上，实现了模块功能，而且实现得相当简单，其设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。并且ES6的模块自动采用严格模式，无论我们是否添加了在模块头部加上 "use strict" 。
ES6 Module常见的有四个命令，分别是
- 导出 export
- 默认导出 export default
- 导入 import
- 重命名 as

<br/>

**export：**

- export导出应该是一种接口或是理解为一种定义，而不应该是值

- export导出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

- export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下面的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

```Javascript
// 情况一
export 'zty'  // 报错 Syntax Error 

// 情况二
const m = 1 
export m // 报错 Syntax Error 

function fun() { 
  export const age = 25  
} 
// SyntaxError: 'import' and 'export' may only appear at the top level 

// 正确的应该是 
export const m = 1
```

下面我们看一个例子：
```Javascript

// 模块A 
export var name = 'zty'
setTimeout(() => name = 'rename', 500)

// mian.js
import {name} from './test' 
console.log('name = ', name) 
setTimeout(() => console.log('name = ', name), 1000)
```
答案是：

我们用setTimeout设置定时器改变模块内的值，外部我们仍能拿到模块内改变的值。那么CommonJS是否有这种特性呢？

CommonJS和下面的export default命令是一致的，如果你改变的是简单类型，那么更改无效（模块导出不变），如果是复杂类型，那么是可以获取内部实时的值。

<br/>

**export default：**

本质上，export default就是在Module上输出一个叫做default的变量或方法，和export完全不同，所以它后面不能跟变量声明语句，但表达式，function，class除外。

```Javascript
function noop() {} 
export default noop 
// 等价于 
export default function noop() {} 

const zty = {age: 25} 
export default zty 

export const a = {} // 报错 
// Only expressions, functions or classes are allowed as the `default` export
```

**import：**

- import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
- 对于export导出的接口应该使用 import  { interface1 } 的方式
- 对于export default导出的变量应该使用import  interface1  的方式
- import命令具有提升效果，会提升到整个模块的头部，首先执行。
- 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。


<br/>

**as：**

as可以为你提供重命名功能，列如

```Javascript
// a.js
var m = 1
export {m as n}
export {m as default}
// 等价于 export default m

// 获取
import {n} from './a.js'
import a from './a.js'
// n = 1 a = 1
```

import和export还可以混合使用


```Javascript
export { name, zty } from './a.js';

// 可以简单理解为
import { name, zty } from './a.js';
export { name, zty };

// 还可以 使用 as
export { name as n } from './a.js';

// 整体输出
export * from './a.js';
```

<font color=red size=2>注意的是 export * 或忽略模块A中的export default</font>


<br/>

**在浏览器中使用ES6 Module**

值得注意的是浏览器中并不能直接使用ES6 Module。如果你要使用，请注意以下几点：

- 浏览器加载 ES6 模块，也使用\<script>标签，但是要加入type="module"属性。即

```Javascript
<script type="module" src="./zty.js"></script>
```

- 不能直接写文件名，即使是同一层级下面的文件。也要加上 './zty.js'，可以使用绝对路径和相对路径，文件名后缀 .js 必须要有，不然浏览器无法识别路径。

- 浏览器对于带有type="module"的\<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了\<script>标签的"defer"属性。

- 如果网页有多个\<script type="module">，它们会按照在页面出现的顺序依次执行。

- \<script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。一旦使用了async属性，\<script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。


<br>
---
<br>
<div align=center><font color=#008000 size=4>04 UMD</font></div>
<br/>

最后给大家介绍一下UMD规范，UMD是为了让同一个代码模块在使用 CommonJs、CMD 甚至是 AMD 的项目中运行。为了实现兼容，所以有点“丑陋”。下面我们直接看代码。

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

整个代码分成两部分，一部分是外层的立即执行函数，传入一个全局对象和工厂函数，里面的 if else则对AMD，CommonJS和浏览器环境进行兼容处理。最后return处理的变量和方法就是我们外部可访问的。

<br/>

## 结束语

如果有错误或者不严谨的地方，欢迎指正~