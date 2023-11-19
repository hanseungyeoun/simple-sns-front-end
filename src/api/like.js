import req from './req-wrapper'

const URI_PREPENDER = `${process.env.VUE_APP_API_URL}/api/v1/like`
const wrap = url => `${URI_PREPENDER}${url}`

const CONNETS_URI = {
  LIKE: '',
}

export default {
  like(body, success, fail) {
    req.post(wrap(CONNETS_URI.LIKE), body, success, fail)
  },
}
