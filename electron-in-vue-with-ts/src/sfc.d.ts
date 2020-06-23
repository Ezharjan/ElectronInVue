/**
 * 告诉 TypeScript window是个全局对象，直接可用，这样就不会在window.xx = 123时报错
 */
declare var window: Window & typeof globalThis

/**
 * 引入部分第三方库/自己编写的模块的时候需要额外声明文件
 * 引入的时候，需要使用类似 import VueLazyLaod from 'vue-lazyload' 的写法
 */
declare module 'vue-lazyload'
declare module '@zz/perf/vue'
declare module 'raven-js'
declare module 'raven-js/plugins/vue'