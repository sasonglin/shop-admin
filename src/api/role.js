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
// 修改角色
export const editRoleById = (roleId, data) => req({
  method: 'put',
  url: `/roles/${roleId}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)

// 更新角色权限列表
// rid 需要提供以 , 分割的字符串 id，注意：父节点id也需要
export const updataRightList = (roleId, rids) => req({
  method: 'post',
  url: `/roles/${roleId}/rights`,
  data: {
    rids
  }
}).then(res => res.data)

// 根据角色 id 删除授权角色
export const deleteRightsByRoleId = (roleId, rightId) => req({
  method: 'delete',
  url: `roles/${roleId}/rights/${rightId}`
}).then(res => res.data)
