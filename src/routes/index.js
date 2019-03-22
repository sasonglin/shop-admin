import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/Home/index.vue'
import Users from '@/views/Users/index.vue'
import Roles from '@/views/Role/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        // Home 展示到父路由的 router-view 中，path 为空，则默认作为 / Layout 展示的组件
        { path: '', component: Home },
        { path: '/users', component: Users },
        { path: '/roles', component: Roles }
      ]
    }
  ]
})
