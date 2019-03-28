import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css' // 加载 fontawesome 字体图标库
import './css/main.css'
// 全局挂载
import AppBreadcrumb from './components/breadCrumb/index.vue'
// import dayjs from 'dayjs'

// 建议过滤器用法
//  将过滤器封装
//  让过滤器成为简单插件
import filters from './filters/index.js'

Vue.use(filters, {
  // 用于存放其他参数
})

Vue.component('AppBreadcrumb', AppBreadcrumb)

Vue.use(ElementUI)
/**
 * 过滤器
 * 使用规则： {{ 数据 | 过滤器函数（参数...）}}
 * 数据将作为第一个参数，（）中的参数从第二个参数开始往后传
 * 过滤器的本质就是一个函数：一个可用在模板中调用的函数
 * 全局过滤器：可以用在任何组件模板中调用
 * 局部：只能在定义所在的组件模板中使用
 */

//  非建议写法
// Vue.filter('dataFormat', (value, format = 'YYYY-MM-DD hh-mm-ss') => {
//   return dayjs(value).format(format)
// })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
