// 角色管理相关接口

import req from '@/utils/request'

// 获取角色列表
export const getRoleList = () => req({
  method: 'get',
  url: '/roles'
}).then(res => res.data)
// 删除角色
export const deleteRoleById = (roleId) => req({
  method: 'delete',
  url: `/roles/${roleId}`
}).then(res => res.data)
// 新增角色
export const create = ({ roleName, roleDesc }) => req({
  method: 'post',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)
