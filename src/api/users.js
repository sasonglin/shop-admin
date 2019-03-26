// 用户相关接口处理模块
import req from '@/utils/request'

// 用户列表

// 显示用户列表信息
export const find = ({ pagenum = 1, pagesize = 5, query = '' }) => req({
  method: 'get',
  url: '/users',
  params: { // GET 参数
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

// 添加用户信息
export const create = ({ username, password, email, mobile }) => req({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)

// 删除用户信息
export const deleteById = (id) => req({
  method: 'delete',
  url: `/users/${id}`
}).then(res => res.data)

// 编辑用户信息
export const updateUserById = (id, data) => req({
  method: 'put',
  url: `/users/${id}`,
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

// 根据id查询用户
export const findUserById = (id) => req({
  method: 'get',
  url: `/users/${id}`
}).then(res => res.data)

// 改变用户状态
export const changeState = (id, state) => req({
  method: 'put',
  url: `/users/${id}/state/${state}`
}).then(res => res.data)

// 修改角色
export const changeRole = (userId, roleId) => req({
  method: 'put',
  url: `/users/${userId}/role`,
  data: {
    rid: roleId
  }
}).then(res => res.data)
