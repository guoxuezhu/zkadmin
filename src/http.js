import axios from 'axios'
import store from './store/index'
import * as types from './store/mutation-types'
import router from './router'

// axios 配置
axios.defaults.timeout = 60000

axios.defaults.baseURL = 'http://lihong.h09.66571.com'
// axios.defaults.baseURL = 'http://192.168.0.100/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    // console.log(JSON.stringify(error));
    // console : Error: Request failed with status code 402
    return Promise.reject(error.response)
  })

export default axios
