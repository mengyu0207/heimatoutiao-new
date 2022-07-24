import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from '@/utlis/dayjs'
// 引入字体图标css
import '@/assets/fonts/iconfont.css'
// 引入want 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入flexble
import 'amfe-flexible/index.min.js'

Vue.config.productionTip = false

Vue.use(Vant)
// 全局过滤器
// 参数1 过滤器名称 参数2 过滤器函数
// 使用方法： {{表达式|过滤器名称}}
// 管道符前面的表达式结果 会作为参数传递到过滤器函数中的
Vue.filter('relativeTime', (value) => {
  return dayjs(value).fromNow()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
