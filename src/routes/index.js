import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/login.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/Home/index.vue'
import Users from '@/views/Users/index.vue'
import Roles from '@/views/Role/index.vue'
import Rights from '@/views/Rights/index.vue'
import { getToken } from '@/utils/auth.js'

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
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
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
  const token = getToken()
  // 如果没有就跳转到login页面
  if (!token) {
    return next('/login')
  }
  // 注:老师注释==>我们需要一个每次请求都能检测token的设置项
  //
  // 验证token是否有效
  // token是由服务器签发生成的，需要服务器检测
  // 所有最好有一个接口，传递一个 token 参数，返回该 token 是否有效
  //
  // 我们这里也没必要需要有这么一个单独的接口来验证登录的有效性
  // 因为我们每个页面几乎都会发请求（请求用户列表、请求商品列表）
  // 而除了登录接口，其它的接口都需要提供身份令牌才能使用
  // 所以我们只需要在发起具体的业务请求的响应结果中查看 token 身份令牌是否有效（服务器会告诉你）
  //
  // 如果有token就让其通过
  next()
})

export default router
