// 手动实现 即index.js 解析出的应该是这样的
// 在浏览器和node环境下都能支持
(function() {
  var moduleList = [
    // index.js
    function (require, module, exports) {
      const moduleA = require('./moduleA')
      console.log('moduleA = ', moduleA)
    },
    // moduleA.js
    function (require, module, exports) {
      module.exports = new Date().getTime()
    }
  ]
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

  require(0) // 入口函数
})()