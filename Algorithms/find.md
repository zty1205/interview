# 查找算法

## 二分查找

时间复杂度 O(logN) 空间复杂度 O(N)

<center>递归算法</center>

<br/>

```javascript
function mid_find(array, target) {
  function _mid(array, target, start, end) {
    if (start > end) return -1;
    let mid = (end + start) >> 1;
    let mVal = array[mid];

    if (mVal === target) {
      return mid;
    } else if (mVal < target) {
      return _mid(array, target, mid + 1, end);
    } else {
      return _mid(array, target, start, mid);
    }
  }

  return _mid(array, target, 0, array.length - 1);
}
```

<br/>

<center>非递归算法</center>

<br/>

```javascript
function mid_find(array, target) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let mid = (start + end) >> 1;
    let mVal = array[mid];

    if (mVal === target) {
      return mid;
    } else if (mVal < target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return -1;
}
```

## 树&hash

- 依赖于二叉搜索树结构（左 < 根 < 右）
- 构建哈希表后，查找一步到位
