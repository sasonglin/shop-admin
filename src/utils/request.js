// 请求模块: 统一封装 axios 的使用
import axios from 'axios'
import router from '@/routes/index'
// 设置 baseURL ， 下方是简单方式，适用于只有一个接口路径
// axios.defaults.baseURL = 'https://api.example.com'

// 当项目有多个接口路径的时候，我们可以通过创建不同的 axios 实例来设置
// axios 实例具有 axios 所有完整的功能

const req = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
  // 摄制好基准路径后，每次请求的时候就不需要写请求的基础路径了
  // 只需要写 API 提供的小段请求路径即可
})

// 添加拦截器

// 添加一个请求拦截器
// config 是请求体
req.interceptors.request.use(function (config) {
  console.log(config.url)
  // 在每次请求的时候(非login请求)进行拦截，统一添加 token (除了login)
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  // 通过请求拦截
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
/**
 * Axios 响应拦截器
 * 所有通过 http（Axios实例）发出去的请求收到到的响应都会经过这里
 * 响应回来先进入这里，然后再进入你真正发请求的地方
 */
req.interceptors.response.use(function (response) {
  // 统一处理 token 无效跳转到登录页
  // console.log(response);
  //
  // router.currentRoute 当前路由对象
  // console.log(router.currentRoute)
  if (response.data.meta.status === 401) {
    // 如果结果验证为 401 就跳转回login页面,跳转路径中包含之前想要访问的页面路径
    // 登陆成功后可以直接返回需要访问的页面，不是首页（登录成功回到原来的页面）
    // 这里用fullPath是因为返回的原路径可能带有参数
    router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
  }
  // 通过响应拦截
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default req
