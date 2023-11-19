import req from './req-wrapper'
const URI_PREPENDER = `${process.env.VUE_APP_API_URL}/api/v1/posts`
const wrap = url => `${URI_PREPENDER}${url}`

const POST_URI = {
  POSTS: '',
  GET_MY_POST: '/my',
  GET_POST: '/{postId}',
  SEARCH: '/search/{hashtag}',
  WIRTE_POST: '',
  UPDATE_POST: '/{postId}/renew',
  DELETE_POST: '/{postId}',
}

export default {
  getPosts(param, success) {
    console.log('getPosts')

    req.get(wrap(POST_URI.POSTS), param, success)
  },

  getMyPosts(param, success) {
    req.get(wrap(POST_URI.GET_MY_POST), param, success)
  },

  getPost(postId, success, fail) {
    const url = wrap(POST_URI.GET_POST).replace('{postId}', postId)

    req.get(url, {}, success, fail)
  },
  searchPost(hashtag, param, success) {
    const url = wrap(POST_URI.SEARCH).replace('{hashtag}', hashtag)
    req.get(url, param, success)
  },

  writePost(body, success, fail, config) {
    req.upload(wrap(POST_URI.WIRTE_POST), body, success, fail, config)
  },

  updatePost(feedId, body, success, fail, config) {
    const url = wrap(POST_URI.UPDATE_POST).replace('{postId}', feedId)
    req.upload(url, body, success, fail, config)
  },

  deletePost(feedId, success, fail) {
    const url = wrap(POST_URI.DELETE_POST).replace('{postId}', feedId)
    req.delete(url, {}, success, fail)
  },
}
