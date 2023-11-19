import req from './req-wrapper'

const URI_PREPENDER = `${process.env.VUE_APP_API_SERVER_URL}/api/v1/comments`
const wrap = url => `${URI_PREPENDER}${url}`

const CONNETS_URI = {
  ADD_COMMENT: '',
}

export default {
  addComment(body, success, fail) {
    req.post(wrap(CONNETS_URI.ADD_COMMENT), body, success, fail)
  },
}
