# nextTick 的原理

- Vue.nextTick 是在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
- 浏览器为了能够使得 JS 内部 task 与 DOM 任务能够有序的执行，会在一个 task 执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）
- Vue.nextTikc 的降级顺序（优先使用） Promise.then(microtask) , MutationObserver(microtask) , setImmediate(task) , setTimeout(fn, 0)(task)
