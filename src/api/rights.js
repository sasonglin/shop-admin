// 权限管理相关接口

import req from '@/utils/request'

// 获取权限列表
// type:tree=>树格式
// list:=> 列表格式

export const getRightsList = (type = 'list') => req({
  method: 'get',
  url: `rights/${type}`
}).then(res => res.data)
