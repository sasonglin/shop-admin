// 获取当前登录用户的权限列表

import req from '@/utils/request'

export const getMeanNav = () => req({
  method: 'get',
  url: '/menus'
}).then(res => res.data)
