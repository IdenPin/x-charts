class EventBus {
  constructor(vue) {
    if (!this.handles) {
      Object.defineProperty(this, 'handles', {
        value: {},
        enumerable: false
      })
    }
    this.Vue = vue
    // _uid和EventName的映射
    this.eventMapUid = {}
  }
  setEventMapUid(uid, eventName) {
    if (!this.eventMapUid[uid]) this.eventMapUid[uid] = []
    this.eventMapUid[uid].push(eventName) // 把每个_uid订阅的事件名字push到各自uid所属的数组里
  }
  $on(eventName, callback, vm) {
    // vm是在组件内部使用时组件当前的this用于取_uid
    if (!this.handles[eventName]) this.handles[eventName] = []
    this.handles[eventName].push(callback)
    if (vm instanceof this.Vue) this.setEventMapUid(vm._uid, eventName)
  }
  $emit() {
    const args = [...arguments]
    const eventName = args[0]
    const params = args.slice(1)
    if (this.handles[eventName]) {
      const len = this.handles[eventName].length
      for (let i = 0; i < len; i++) {
        this.handles[eventName][i](...params)
      }
    }
  }
  $offVmEvent(uid) {
    const currentEvents = this.eventMapUid[uid] || []
    currentEvents.forEach(event => {
      this.$off(event)
    })
  }
  $off(eventName) {
    delete this.handles[eventName]
  }
}
// 写成Vue插件形式，直接引入然后Vue.use($EventBus)进行使用
const $EventBus = {}

$EventBus.install = (Vue, option) => {
  Vue.prototype.$eventBus = new EventBus(Vue)
  Vue.mixin({
    beforeDestroy() {
      // 拦截beforeDestroy钩子自动销毁自身所有订阅的事件
      this.$eventBus.$offVmEvent(this._uid)
    }
  })
}

export default $EventBus

/**
// main.js中
...
import EventBus from './eventBus.js'
Vue.use(EnemtBus)

 created () {
    let text = Array(1000000).fill('xxx').join(',')
    this.$eventBus.$on('home-on', (...args) => {
      console.log('home $on====>>>', ...args)
      this.text = text
    }, this) // 注意第三个参数需要传当前组件的this，如果不传则需要手动销毁
  },
  mounted () {
    setTimeout(() => {
      this.$eventBus.$emit('home-on', '这是home $emit参数', 'ee')
    }, 1000)
  },
  beforeDestroy () {
    // 这里就不需要手动的off销毁eventBus订阅的事件了
  }
...
 */
