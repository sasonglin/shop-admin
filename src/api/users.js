// 用户相关接口处理模块
import req from '@/utils/request'

// 用户列表

// 显示用户列表信息
export const find = ({ pagenum = 1, pagesize = 5 }) => req({
  method: 'get',
  url: '/users',
  params: { // GET 参数
    pagenum,
    pagesize
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

// 修改用户信息
export const updateById = () => req({
})

// 根据id查询用户
export const findById = () => req({
})

// 改变用户状态
export const changeState = (id, state) => req({
  method: 'put',
  url: `/users/${id}/state/${state}`
}).then(res => res.data)
