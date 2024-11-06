import axios from 'axios'
import localStore from '../util/localStore'

const instance = axios.create({
  headers: { 'content-type': 'application/json; charset=utf-8;' },
})

instance.interceptors.request.use(
  config => {
    const token = localStore.getToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  },
)
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
