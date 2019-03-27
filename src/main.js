import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css' // 加载 fontawesome 字体图标库
import './css/main.css'
// 全局挂载
import AppBreadcrumb from './components/breadCrumb/index.vue'

Vue.component('AppBreadcrumb', AppBreadcrumb)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
