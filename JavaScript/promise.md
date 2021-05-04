# Title

手写 Promise 和相关方法

## Promise

<br/>

```javascript
function innerResolve(value) {
  if (this.state === 'pending') {
    this.state = 'fulfilled';
    this.value = value;
    this.onResolvedCallbacks.forEach((f) => f());
  }
}

function innerReject(value) {
  if (this.state === 'pending') {
    this.state = 'rejected';
    this.value = value;
    this.onRejectedCallbacks.forEach((f) => f());
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called; // 是否调用过成功或者失败
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    // Promise存在三个状态（state）pending、fulfilled、rejected
    this.state = 'pending';

    // 成功时，不可转为其他状态，且必须有一个不可改变的值（value）
    this.value = undefined;

    // 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(innerResolve.bind(this), innerReject.bind(this));
    } catch (err) {
      innerReject(err);
    }
  }

  // then的方法 返回一个新的promise
  then(onFulfilled, onRejected) {
    // x 是第一个promise resolve或reject的值
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });
    return promise2;
  }
}

// resolve方法
Promise.resolve = function (val) {
  return new Promise((resolve, reject) => {
    resolve(val);
  });
};
// reject方法
Promise.reject = function (val) {
  return new Promise((resolve, reject) => {
    reject(val);
  });
};

// race方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};

// all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function (promises) {
  let arr = [];
  let i = 0;
  return new Promise((resolve, reject) => {
    function processData(index, data) {
      arr[index] = data;
      i++;
      if (i == promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};
```
