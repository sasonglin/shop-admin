// 角色管理相关接口

import req from '@/utils/request'

// 获取角色列表
export const getRoleList = () => req({
  method: 'get',
  url: '/roles'
}).then(res => res.data)
