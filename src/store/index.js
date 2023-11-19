import { createStore, createLogger } from 'vuex'
import store from '../common/localStore'
import userApi from '../api/users'

const auth = {
  namespaced: true,
  state: () => ({
    user: store.getUser(),
    accessToken: store.getToken(),
    isAuthenticated: !!store.getToken(),
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload
      store.saveUser(payload)
    },
    logout: function(state) {
      state.user = {}
      state.accessToken = ''
      state.isAuthenticated = false
      store.destroyToken()
      store.destroyUser()
    },
    login: function(state, payload = {}) {
      state.accessToken = payload
      state.isAuthenticated = true
      state.accessToken = payload
      store.saveToken(payload)
    },
  },
  actions: {
    logout: function(context, payload) {
      return new Promise(resolve => {
        setTimeout(function() {
          context.commit('logout', payload)
          resolve({})
        }, 50)
      })
    },
    login: function(context, payload) {
      let params = {
        email: payload.email,
        password: payload.password,
      }

      return new Promise((resolve, reject) => {
        userApi.login(
          params,
          data => {
            const { accessToken } = data
            context.commit('login', accessToken)
            resolve(data)
          },
          err => {
            reject(err)
          },
        )
      })
    },
    fetchUser({ commit }, id) {
      return new Promise(resolve => {
        userApi.getUser(id, data => {
          const { id, email, nickName, description, profileImage } = data
          commit('setUser', {
            id,
            email,
            nickName,
            description,
            profileImage,
          })
          resolve(data)
        })
      })
    },
  },
  getters: {
    accessToken: state => {
      return state.accessToken
    },
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    user: state => {
      return state.user
    },
  },
}

export default createStore({
  modules: {
    auth,
  },
  plugins: [createLogger()],
})
