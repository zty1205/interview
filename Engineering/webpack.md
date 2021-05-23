# Webpack

## 简介

&emsp;&emsp; 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle.

## 核心概念

- 入口(entry)

&emsp;&emsp; 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

&emsp;&emsp; 可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src。

- 输出(output)

&emsp;&emsp; output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程

- loader

&emsp;&emsp; loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

在更高层面，在 webpack 的配置中 loader 有两个目标：

- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

<font color=#ff502c>注意：Webpack 选择了 compose 方式，即从右到左执行 loader</font>

插件(plugins)

&emsp;&emsp; 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

&emsp;&emsp; plugins 需要暴露出一个 class, 在 new WebpackPlugin()的时候通过构造函数传入这个插件需要的参数，在 webpack 启动的时候会先实例化 plugin 再调用 plugin 的 apply 方法，插件需要在 apply 函数里监听 webpack 生命周期里的事件，做相应的处理

模式(mode)

&emsp;&emsp; 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化

简单例子：

```javascript
// 多个入口
module.exports = {
  mode: 'production',
  entry: {
    index: ["./src/index.js"],
    main: ["./src/main.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/, // 正则匹配文件名
      exclude: '/node_modules/', // 排除
      use: ['babel-loader']
    }
  },
  plugins: [ // 插件
    new copyWebpackPlugin([{
      from: path.resolve(__dirname, 'public/static'),
      to: path.resolve(__dirname, 'dist'),
      ignore: ['index.html']
  }])
}
```

### 基本流程

1. 解析 shell 和 config 中的配置项，用于激活 webpack 的加载项和插件
2. webpack 初始化工作，包括构建 compiler 对象，初始化 compiler 的上下文，loader 和 file 的输入输出环境
3. 解析入口 js 文件，通过对应的工厂方法创建模块，使用 acron 生成 AST 树并且遍历 AST，处理 require 的 module，如果依赖中包含依赖则遍历 build module，在遍历过程中会根据文件类型和 loader 配置找出合适的 loader 用来对文件进行转换
4. 调用 seal 方法，封装，逐次对每一个 module，chunk 进行整理，生成编辑后的代码

## 模块打包

1. 通过 fs 将模块读取成字符串，然后用 warp 包裹一下，使之成为一个字符串形式的的函数然后调用 vm.runInNewContext 这样类型的方法，这个字符串会变成一个函数。
2. 这些模块的函数会被存放在数组里，然后进行解析执行。module 和 export 都是传入的对象，webpack 会实现 require 函数，去加载其他模块。
3. 如果是**异步模块**，则会通过 jsonp 的形式去加载该模块打包好生成的 chunk。 异步加载模块可以使用 import 和 require.ensure 函数，函数将会返回一个 promise。
4. 上面方法都是公共的，可以抽离成模板的 js 文件，webpack 负责做依赖分析，并将模块读成函数填充入数组。（这里说的只是 js 的模块）

下面附上简易版的代码

```javascript
<!-- 同步模块 -->
var moduleDepList = [
  {'./moduleA': 1}, // module[0] 的依赖 他依赖moduleA 且 moduleA的下标在moduleList 中 为 1
  {}
]

function require(id, parentId) {
  var currentModlueId = parentId !== undefined ? moduleDepList[parentId][id] : id
  var module = {exports: {}}
  var moduleFunc = moduleList[currentModlueId]
  moduleFunc(id => require(id, currentModlueId), module, module.exports)
  return module.exports
}
```

```javascript
<!-- 异步模块 -->
var cache = {}

window.__jsonp = function(chunkId, moduleFunc) {
  var chunk = cache[chunkId]
  var resolve = chunk[0]
  var module = {exports: {}}
  moduleFunc(require, module, module.exports)
  resolve(module.exports)
}

require.ensure = function(chunkId, parentId) {
  var currentModlueId = parentId !== undefined ? moduleDepList[parentId][chunkId] : chunkId
  var currentChunk = cache[currentModlueId]

  if (currentChunk === undefined) {
    var $script = document.createElement('script')
    $script.src = `chunk.${chunkId}.js`
    document.body.appendChild($script)

    var promise = new Promise(function(resolve) {
      var chunkCache = [resolve] // 数组形式是为了保存promise
      chunkCache.status = true // 异步模块加载中 如果有别的包 在 异步加载在模块 那么下面的
      cache[chunkId] = chunkCache
    })
    cache[chunkId].push(promise)
    return promise
  }

  if (currentChunk.status) {
    return currentChunk[1] // 这里的promise 这里的就直接返回promise 这样模块只会加载一次
  }
  return currentChunk
}
```

> 代码地址：https://github.com/zty1205/react-recruit/tree/master/src/_webpack

## 热更新

1. client 和 server 建立一个 websocket 通信
2. 当有文件发生变动（如 fs.watchFile）的时候，webpack 编译文件，并通过 websocket 向 client 发送一条更新消息
3. client 根据收到的 hash 值，通过 ajax 获取一个 manifest 描述文件
4. client 根据 manifest 获取新的 JS 模块的代码
5. 当取到新的 JS 代码之后，会更新 modules tree，（installedModules)调用之前通过 module.hot.accept 注册好的回调，可能是 loader 提供的，也可能是你自己写的

manifest: 描述资源文件对应关系如下，打包后的文件拥有了 hash 值，所以需要进行映射。

```javascript
{
  "a.js": "a.41231243.js"
}
```

## plugin

如何开发一个 plugin

1. 一个 JavaScript 命名函数。
2. 在插件函数的 prototype 上定义一个 apply 方法。
3. 指定一个绑定到 webpack 自身的事件钩子。
4. 处理 webpack 内部实例的特定数据。
5. 功能完成后调用 webpack 提供的回调。

```javascript
// 一个 JavaScript 命名函数。
function plugin() {};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
plugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation, callback) {
    callback();
  });

  // 使用taptable的写法
  //基本写法
  compiler.hooks.someHook.tap(...)
  //如果希望在entry配置完毕后执行某个功能
  compiler.hooks.entryOption.tap(...)
  //如果希望在生成的资源输出到output指定目录之前执行某个功能
  compiler.hooks.emit.tap(...)
};
```

## 常见 plugin

- clean-webpack-plugin: 在构建之前删除上一次 build 的文件夹

- copy-webpack-plugin: 复制文件或文件夹到生成后的目录

- extract-text-webpack | mini-css-extract-plugin: 将所有入口的 chunk(entry chunks)中引用的 \*.css，移动到独立分离的 CSS 文件

- html-webpack-plugin: 将 build 后生成的资源以标签的形式嵌入到 HTML 模板内

- hot-module-replacement: 模块热更新

## 常见 loader

- babel-loader: 语法，源码转换以便能够运行在当前和旧版本的浏览器或其他环境中

- css-loader: 配合 style-loader 可以解析在 js 中引入的 css 文件，并以\<style>便签将 css-loader 内部样式注入到我们的 HTML 页面

- file-loader: 可以解析 js 中 require 的文件，输出到输出目录并返回 public URL

- html-loader: 可以对 HTML 模板中指定哪个标签属性组合(tag-attribute combination)元素应该被此 loader 处理

- less-loader: 依赖 less，可以将 less 编译成 css

- postcss-loader: 配合一些 plugin 如 cssnano,autoprefixer 可以对 css 进行压缩，优化，自动补足前缀等
- scss-loader: 配合 node-scss，可以将 scss 编译成 css

- style-loader: 配合 css-loader 可以解析在 js 中引入的 css 文件，并以\<style>便签将 css-loader 内部样式注入到我们的 HTML 页面

- url-loader: url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL(base64)

## 常见打包优化

- 配置 alias 等缩小文件搜索范围
- 使用 dll 抽离公共库
- 关闭 sourceMap
- webpack-bundle-analyzer 打包分析，将大的模块可能的移至 CDN。打包时间分析使用 speed-measure-webpack-plugin
- 开启 gzip
- 使用多线程：thread-loader 或 HappyPack
- webpack4 内置的 terser 启动多线程压缩
