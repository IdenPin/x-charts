import axios from 'axios'

const service = axios.create({
  // baseURL: 'process.env.VUE_APP_BASE_API',
  withCredentials: true,
  timeout: 30 * 1000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
