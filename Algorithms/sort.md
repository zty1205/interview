# 排序算法

## 1. 冒泡排序

- 冒泡排序 大的往下沉 相邻的比较
- 时间复杂度 O(n^2)
- 空间复杂度 O(1)
- 稳定的排序算法

```javascript
function bubble_sort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}
```

警告优化后的冒泡排序

```javascript
function bubble_sort(array) {
  let flag;
  let endIndex = array.length - 1;
  let pos = 0;
  for (let i = 0; i < array.length; i++) {
    flag = 0;
    for (let j = 0; j < endIndex; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        flag = 1;
        pos = j;
      }
    }

    endIndex = pos;

    if (!flag) {
      return array;
    }
  }
  return array;
}
```

## 2. 归并排序

- 归并排序 分治法 分成一小块一小块的再逐渐合起来
- 时间复杂度 O(NLogN)
- 空间复杂度 O(n)
- 稳定的排序算法

```javascript
function merge_sort(arr) {
  function merge(left, right) {
    let tmp = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) tmp.push(left.shift());
      else tmp.push(right.shift());
    }

    return tmp.concat(left, right);
  }

  if (arr.length === 1) return arr;

  let mid = arr.length >> 1;
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  return merge(merge_sort(left), merge_sort(right));
}
```

## 3. 插入排序

- 插入排序 从第一个作为有序数组，认为前面的数据是已排好序的，后面的数据往前面移动
- 时间复杂度 O(n^2)
- 空间复杂度 O(1)
- 稳定的排序算法

```javascript
function insert_sort(array) {
  for (let i = 1; i < array.length; i++) {
    let cur = array[i];
    let j = i;
    while (j - 1 >= 0 && cur < array[j - 1]) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = cur;
  }
  return array;
}
```

## 4. 希尔排序

- 希尔排序 使用序列（如 4,2,1）的进行插入排序 效率更好 但不稳定
- 时间复杂度 O(n^2)
- 空间复杂度 O(1)
- 不稳定的排序算法

```javascript
function shell_sort(arr) {
  let len = arr.length;
  // gap 即为增量 这里每次去长度的一般
  for (let gap = len >> 1; gap > 0; gap = gap >> 1) {
    for (let i = gap; i < len; i++) {
      let j = i;
      let current = arr[i];
      // 以current 为基准
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap];
        j = j - gap;
      }
      arr[j] = current;
    }
  }
  return arr;
}
```

## 5. 选择排序

- 选择排序 每次把最小的放到前面 未排序的和前面的比较
- 时间复杂度 O(n^2)
- 空间复杂度 O(1)
- 不稳定的排序算法

```javascript
function choose_sort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }
  }
  return array;
}
```

## 6. 快速排序

- 快速排序 以基准点分开两边
- 时间复杂度 O(NLogN)
- 空间复杂度 O(1)
- 不稳定的排序算法

```javascript
function quick_sort(array) {
  function _sort(arr, start, end) {
    if (start >= end) return;
    let l = start;
    let r = end;
    let guard = arr[start];
    while (l < r) {
      // 里面还需判断 l r 防止超标
      while (l < r && arr[r] >= guard) r--;
      while (l < r && arr[l] <= guard) l++;

      [arr[l], arr[r]] = [arr[r], arr[l]]; // change
    }
    [arr[l], arr[start]] = [arr[start], arr[l]]; // change

    _sort(arr, start, l - 1);
    _sort(arr, l + 1, end);
    return arr;
  }

  return _sort(array, 0, array.length - 1);
}
```

## 7. 堆排序

- 堆排序 构建二叉树搜索树的顺序存储
- 时间复杂度 O(NLogN)
- 空间复杂度 O(1)
- 不稳定的排序算法

```javascript
function heap_sort(arr) {
  // 交换两个节点
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function shiftDown(arr, i, length) {
    let temp = arr[i]; // 当前父节点
    // j<length 的目的是对结点 i 以下的结点全部做顺序调整
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
      temp = arr[i]; // 将 arr[i] 取出，整个过程相当于找到 arr[i] 应处于的位置
      if (j + 1 < length && arr[j] < arr[j + 1]) {
        j++; // 找到两个孩子中较大的一个，再与父节点比较
      }
      if (temp < arr[j]) {
        swap(arr, i, j); // 如果父节点小于子节点:交换；否则跳出
        i = j; // 交换后，temp 的下标变为 j
      } else {
        break;
      }
    }
  }

  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = arr.length >> (1 - 1); i >= 0; i--) {
    shiftDown(arr, i, arr.length);
  }
  // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i); // 根节点与最后一个节点交换
    shiftDown(arr, 0, i); // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，所以第三个参数为 i，即比较到最后一个结点前一个即可
  }
  return arr;
}
```

## 8. 基数排序

- 基数排序 多关键字排序，同计数排序类似
- 空间复杂度 O(kn) k 为最大数的长度
- 空间复杂度 r + n r 为基数

```javascript
function radix_sort(array) {
  const radix = 10;
  let len = String(Math.max.apply(Math, array)).length;
  let radixArr = Array.from({ length: radix }, () => []);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < array.length; j++) {
      let rad = Math.floor(array[j] / Math.pow(radix, i)) % radix;
      radixArr[rad].push(array[j]);
    }
    console.log('radixArr = ', JSON.parse(JSON.stringify(radixArr)));
    array = [];
    for (let k = 0; k < radixArr.length; k++) {
      array = array.concat(radixArr[k]);
      radixArr[k] = [];
    }
  }
  return array;
}
```

## 9. 桶排序

- 将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）
- 时间复杂度 O(N+C)，其中 C=N\*(logN-logM)。如果相对于同样的 N，桶数量 M 越大，其效率越高，最好的时间复杂度达到 O(N)。
- 空间复杂度为 O(N+M)

```javascript
function bucketSort(array) {
  const max = Math.max.apply(Math, array);
  const min = Math.min.apply(Math, array);
  const len = Math.floor((max - min) / 10) + 1;
  let bucketArr = Array.from({ length: len }, () => []);
  console.log('bucketArr = ', JSON.parse(JSON.stringify(bucketArr)));
  for (let i = 0; i < array.length; i++) {
    let rad = Math.floor((array[i] - min) / 10);
    console.log('rad = ', rad);
    bucketArr[rad].push(array[i]);
  }
  console.log('bucketArr = ', JSON.parse(JSON.stringify(bucketArr)));
  return bucketArr.reduce((preRes, cur) => {
    preRes = preRes.concat(choose_sort(cur));
    return preRes;
  }, []);
}
```

## 10. 计数排序

- 给定的输入序列中的每一个元素 x，确定该序列中值小于 x 的元素的个数（此处并非比较各元素的大小，而是通过对元素值的计数和计数值的累加来确定）。一旦有了这个信息，就可以将 x 直接存放到最终的输出序列的正确位置上。

计数排序对输入的数据有附加的限制条件：

1、输入的线性表的元素属于有限偏序集 S；

2、设输入的线性表的长度为 n，|S|=k（表示集合 S 中元素的总数目为 k），则 k=O(n)。

在这两个条件下，计数排序的复杂性为 O(n)。

```javascript
function countSort(array) {
  const max = Math.max.apply(Math, array);
  const min = Math.min.apply(Math, array);
  const len = max - min + 1;
  let countArr = Array.from({ length: len }, () => 0);
  console.log('countArr = ', countArr);
  // 计数
  for (let i = 0; i < array.length; i++) {
    countArr[array[i] - min] += 1;
  }
  console.log('countArr1 = ', JSON.parse(JSON.stringify(countArr)));
  for (let i = 1; i < countArr.length; i++) {
    countArr[i] += countArr[i - 1];
  }
  console.log('countArr2 = ', JSON.parse(JSON.stringify(countArr)));
  let res = [];
  for (let i = array.length - 1; i > -1; --i) {
    countIndex = array[i] - min;
    res[countArr[countIndex] - 1] = array[i];
    countArr[countIndex] -= 1;
  }
  return res;
}
```
