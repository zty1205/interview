# Vue3.0

## Proxy

Object.defineProperty 是一个相对比较昂贵的操作，因为它直接操作对象的属性，颗粒度比较小。将它替换为 es6 的 Proxy，在目标对象之上架了一层拦截，代理的是对象而不是对象的属性。这样可以将原本对对象属性的操作变为对整个对象的操作，颗粒度变大。

javascript 引擎在解析的时候希望对象的结构越稳定越好，如果对象一直在变，可优化性降低，proxy 不需要对原始对象做太多操作。

## setup

1. vue3.0 将组件的逻辑都写在了函数内部，setup()会取代 vue2.x 的 data()函数，返回一个对象，暴露给模板，而且只在初始化的时候调用一次。此时未创建组件实例，不能访问 this

2. 新的函数 api：const count = ref(0) ref 是一个 wrapper，是一个包装对象，会包含数字 0，可以用 count.value 来获取这个值。在函数返回的时候会关心是 value wrapper，一旦返回给模版，就不用关心了。对象使用 reactive()

优点：即使 count 包含的是基本类型，例如数字和字符串，也可以在函数之间来回传递，当用 count.value 取值的时候会触发依赖，改值的时候会触发更新。

计算属性返回的也是这个值的包装。

3. onMounted 生命周期函数直接注入。

```javascript
import { ref, reactive, toRefs, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
const step = ref(0); // 基本类型也能实现响应式 理解为{value: 0}
const data = reactive({
  count: 0
});
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // 类似data
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    function addStep(e) {
      step.value++;
      nextTick(() => {
        console.log('step= ', step);
      });
    }

    return {
      step,
      addStep,
      ...toRefs(data) // 使得data的每个属性都变成响应式，否则更改数据不会触发视图渲染
    };
  }
};
```

## Function_based API

为什么撤销 Class API ?

1，更好地支持 TypeScript

- Props 和其它需要注入到 this 的属性导致类型声明依然存在问题
- Decorators 提案的严重不稳定使得依赖它的方案具有重大风险

2，除了类型支持以外 Class API 并不带来任何新的优势

3，vue 中的 UI 组件很少用到继承，一般都是组合，可以用 Function-based API

4，静态的 import 和 export 是 treeshaking 的前提，Function-based API 中的方法都是从全局的 vue 中 import 进来的。

5，函数内部的变量名和函数名都可以被压缩为单个字母，但是对象和类的属性和方法名默认不被压缩（为了防止引用出错）。

6，更灵活的逻辑复用。
