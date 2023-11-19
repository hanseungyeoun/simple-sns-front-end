import axios from 'axios'
import store from '../store/index.js'

const http = axios.create({
  headers: { 'content-type': 'application/json; charset=utf-8;' },
})

http.interceptors.request.use(
  config => {
    const isAuthenticated = store.state.auth.isAuthenticated
    if (isAuthenticated) {
      config.headers.Authorization = 'Bearer ' + store.state.auth.accessToken
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  },
)
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default http
