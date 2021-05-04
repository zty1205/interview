# Title

限制请求并发数

<br/>

## 限制请求并发数

<br/>

```javascript
// 数组分割
function group(list = [], max = 0) {
  if (!list.length) {
    return list;
  }
  let results = [];
  for (let i = 0, len = list.length; i < len; i += max) {
    results.push(list.slice(i, i + max));
  }
  return results;
}

async function requestHandler(reqArr = [], callback = () => {}) {
  if (!reqArr.length) {
    callback();
    return reqArr;
  }
  const newGroupedUrl = reqArr.map((fn) => fn());
  const resultsMapper = (results) => results.map(callback);
  const data = await Promise.allSettled(newGroupedUrl).then(resultsMapper);
  // 相当于 then((results = []) => results.map(callback))
  return data;
}

// 主函数
async function sendRequest(reqList = [], max = 0, callback = () => {}) {
  if (!reqList.length) {
    return reqList;
  }
  const groupReq = group(reqList, max);
  const results = [];
  for (let reqArr of groupReq) {
    try {
      const result = await requestHandler(reqArr, callback);
      results.push(result);
    } catch {}
  }
  return results;
}
```
