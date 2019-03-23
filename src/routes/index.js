import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/Home/index.vue'
import Users from '@/views/Users/index.vue'
import Roles from '@/views/Role/index.vue'

Vue.use(Router)

const router = new Router({
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

/**
 * 路由拦截器，或者说导航守卫，所有请求都会经过它
 * to 去哪里
 * from 来自哪里
 * next 通行方法
 */
router.beforeEach((to, from, next) => {
  // 1. 如果请求的 /login ，则直接允许通过
  if (to.path === '/login') {
    next()
  }
  // 如果不是，就验证有没有token
  const token = window.localStorage.getItem('token')
  // 如果没有就跳转到login页面
  if (!token) {
    return next('/login')
  }
  next()
})

export default router
