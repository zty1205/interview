# 编译原理

1. 注册构建命令
2. 初始化环境变量
3. 合并 libs 中的目标平台构建配置 module.exports = mp
4. 修改 alias，loaders 及 plugins 等配置
5. 执行 webpack 流程

入口：

- 普通 vue 项目的构建入口相对比较简单，整个应用只需要一个入口文件即可
- 对于小程序的构建，每个页面都需要单独的一个入口文件，且入口文件内容基本一致，存在一定的冗余，这两个框架也都有相应的优化措施：uni-app 所有页面的 config 均在 pages.json 中配置，构建入口均为 src/main.js 这个文件，通过传入不同的参数配合自定义 loader 来实现对不同页面的构建，同时根据构建模式的不同会输出三种不同的入口内容

- webpack-preprocess-loader：该 loader 用于实现条件编译，uni-app 对几乎所有类型的文件均添加了这一 loader，使得代码的多端兼容极为便捷，其内部通过调用 preprocess 这个库实现
- webpack-uni-pages-loader：该 loader 作用于 src/pages.json，解析生成项目及各页面的 config，并配合 wrap-loader 将转换后的结果引入 src/main.js 中
- wrap-loader 该 loader 作用于 src/main.js，自动引入各平台运行时兼容
- ProvidePlugin 注入 uni 等全局对象

条件编辑原理：

webpack-preprocess-loader 通过文件后缀获取条件表达式， 通过正则匹配出

- left 属性是正则 start 的匹配结果
- right 属性是正则 end 的匹配结果
- match 是处在正则 start 和 end 中间的内容
- between 是正则 start 前的内容

然后通过 context 上下文的平台决定使用哪个编译里的代码 返回
