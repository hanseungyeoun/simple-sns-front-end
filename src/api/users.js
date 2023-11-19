import req from './req-wrapper'

const URI_PREPENDER = `${process.env.VUE_APP_API_SERVER_URL}/api/v1/users`
const wrap = url => `${URI_PREPENDER}${url}`

const ACCOUNT_URI = {
  JOIN: '/join',
  LOGIN: '/login',
  ME: '/me',
  DETAILS: '/me/details',
  UPDATE_USER: '',
}

export default {
  join(body, success, fail) {
    console.log('getUser')

    req.post(wrap(ACCOUNT_URI.JOIN), body, success, fail)
  },

  login(body, success, fail) {
    console.log('getUser')

    req.post(wrap(ACCOUNT_URI.LOGIN), body, success, fail)
  },

  getUser(userId, success) {
    console.log('getUser')

    req.get(wrap(`${ACCOUNT_URI.ME}`), {}, success)
  },

  getUserDetails(userId, success) {
    console.log('getUserDetails')
    req.get(wrap(`${ACCOUNT_URI.DETAILS}`), {}, success)
  },

  updateUsers(userId, body, success, fail, config) {
    req.upload(
      wrap(`${ACCOUNT_URI.UPDATE_USER}/${userId}`),
      body,
      success,
      fail,
      config,
    )
  },
}
