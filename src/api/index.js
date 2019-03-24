/**
 * 公共接口处理模块
 * 我们建议将请求都封装成一个一个的小函数，在需要的时候可以志杰调用
 * 好处: 维护方便，可重用性强
 */

import req from '../utils/request'

// 用户登录

export const login = data => req({
  method: 'post',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
