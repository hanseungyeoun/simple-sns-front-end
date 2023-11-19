import axios from 'axios'
import store from '../store/index'
import handler from './res-handler'

const appendAuth = config => {
  if (!config) config = { headers: {} }
  if (!config.headers) config.headers = {}

  const token = store.state.auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${store.state.auth.accessToken}`
  }

  return config
}

export default {
  get(url, param, success, fail = err => err.response.data.message, config) {
    console.log(url)
    axios
      .get(url, {
        params: param,
        headers: appendAuth(config).headers,
      })
      .then(handler.handle(success))
      .catch(fail)
  },

  post(url, body, success, fail = err => err.response.data.message, config) {
    axios
      .post(url, body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  put(url, body, success, fail = err => err.response.data.message, config) {
    axios
      .put(url, body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
  upload(url, body, success, fail = err => err.response.data.message, config) {
    var formData = new FormData()
    if (body.constructor === Object) {
      for (let key in body) {
        formData.append(key, body[key])
      }
    } else if (body.constructor === Array) {
      body.forEach(b => formData.append(b[0], b[1]))
    } else {
      console.error('unkown type')
    }
    axios
      .post(url, formData, {
        headers: appendAuth(config).headers,
        onUploadProgress: e => {
          let percentCompleted = Math.round((e.loaded * 100) / e.total)
          console.log(e.lengthComputable)
          console.log(percentCompleted)
        },
      })
      .then(handler.handle(success))
      .catch(fail)
  },
  delete(url, success, fail = err => err.response.data.message, config) {
    axios
      .delete(url, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail)
  },
}
