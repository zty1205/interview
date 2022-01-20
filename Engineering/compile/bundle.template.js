(function () {
  var moduleList = [
    /* template-module-list */
  ];
  var moduleDepList = [
    /* template-module-dep-list */
  ];
  function require(id, parentId) {
    var currentModlueId = parentId !== undefined ? moduleDepList[parentId][id] : id;
    var module = { exports: {} };
    var moduleFunc = moduleList[currentModlueId];
    moduleFunc((id) => require(id, currentModlueId), module, module.exports);
    return module.exports;
  }

  var cache = {};

  window.__jsonp = function (chunkId, moduleFunc) {
    var chunk = cache[chunkId];
    var resolve = chunk[0];
    var module = { exports: {} };
    moduleFunc(require, module, module.exports);
    resolve(module.exports);
  };

  require.ensure = function (chunkId, parentId) {
    var currentModlueId = parentId !== undefined ? moduleDepList[parentId][chunkId] : chunkId;
    var currentChunk = cache[currentModlueId];

    if (currentChunk === undefined) {
      var $script = document.createElement('script');
      $script.src = `chunk.${chunkId}.js`;
      document.body.appendChild($script);

      var promise = new Promise(function (resolve) {
        var chunkCache = [resolve]; // 为什么用数组 ，为了保存promise
        chunkCache.status = true; // 异步模块加载中 如果有别的包 在 异步加载在模块 那么下面的
        cache[chunkId] = chunkCache;
      });
      cache[chunkId].push(promise);
      return promise;
    }

    if (currentChunk.status) {
      return currentChunk[1]; // promise 这里的就直接返回promise 这样模块只会加载一次
    }
    return currentChunk;
  };

  require(0);
})();
