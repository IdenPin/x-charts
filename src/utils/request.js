import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send Ls when cross-domain requests
  timeout: 30 * 1000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['ep_access_token'] = 'bTlYTThxa3BCOStUOXRESHFhT2c4eUJOWFI4Y3Y0djhkdk4rVThtODNnV1pTUGFLek92aW02b1lvTENBY3Z1TQ=='
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    {
      const res = response.data
      if (res.code !== 'SYS000') {
        Message({
          message: res.msg || 'error',
          type: 'error',
          duration: 5 * 1000
        })
        if (res.code === 'SYS999') {
          Message({
            message: res.msg || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject(res.msg || 'error')
      } else {
        return res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
