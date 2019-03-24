// 封装本地存储对 token 的操作
const TOKEN_KEY = 'token'
const localStorage = window.localStorage

// 获取 token 值
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

// 设置 token 值
export const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

// 删除 token 值
export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}
