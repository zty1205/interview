# Title

this 的指向

## this

- this 指的是当前的执行环境
- 一般时指向 window, 严格模式下 this 绑定到 undefined
- 对象调用函数的情况下，指向调用者
- 构造函数下，指向实例
- bind call apply with 函数可以绑定 this 的指向
  - call: call(this, arg1, arg2, ...)。会执行该函数
  - apply: apply(this, firstArg | argArray[]) 多个参数可使用参数数组，会执行该函数
  - bind: bind(this, firstArg | argArray[]) 返回一个函数，函数内的 this 指向传入的 this。多次 bind 只有第一次有效。
  - with: with (expression) { statement } // with'语句將某个对象添加到作用域链的顶部(window 之下，没有切断作用域链，在 expression 中找不到定义的，仍会往 window 上寻找)，在严格模式该标签禁止使用
