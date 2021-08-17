# 观察者模式 & 发布订阅模式

## 观察者模式

【行为型模式】

主要解决：一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。

优点：

- 观察者和被观察者是抽象耦合的
- 建立一套触发机制。

缺点：

- 如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间
- 如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
- 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

```typescript
// 观察者模式
export abstract class Observer {
  constructor() {}
  abstract update(): void;
}

export class Subject {
  observers: Array<Observer>;
  constructor(observers: Array<Observer>) {
    this.observers = observers || [];
  }
  notify(): void {
    this.observers.forEach((o) => o.update());
  }
  add(o: Observer): Subject {
    this.observers.push(o);
    return this;
  }
  remove(o: Observer): void {
    let idx = -1;
    for (let i = this.observers.length; i >= 0; --i) {
      if (this.observers[i] === o) {
        idx = i;
      }
    }
    idx != -1 && this.observers.splice(idx, 1);
  }
}
```

## 发布订阅模式

```typescript
// 发布订阅模式
export abstract class EventCenter {
  handlers: Handlers;
  constructor(handlers: Handlers = {}) {
    this.handlers = handlers;
  }
  on(type: string, handler: (...rest: any) => any) {
    Array.isArray(this.handlers[type]) ? this.handlers[type].push(handler) : (this.handlers[type] = [handler]);
  }
  emit(type: string, ...rest: any): void {
    let hs = this.handlers[type];
    if (hs && hs.length) {
      hs.forEach((x) => x.apply(this, rest));
    }
  }
}

export interface Handlers {
  [propName: string]: Array<(...rest: any) => any>;
}
```

## 区别

- 两个模式都是一个对象的状态发生变化，通知相关联的对象。
- 观察者模式中，被观察者（可理解为发布者）与观察者（可理解为订阅者），这两者之间是直接关联、互相依赖的，是松耦合的关系。而发布-订阅模式中，发布者与订阅者是不直接关联的，它们之间多了一个事件通道，通过这个事件通道把发布者和订阅者关联起来。
- 观察者模式中，被观察者发布通知，所有观察者都会收到通知。发布-订阅模式中，发布者发布通知，只有特定类型的订阅者会收到通知。
