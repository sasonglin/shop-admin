import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Layout }
  ]
})
