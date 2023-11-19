import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store/index.js'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Search from './pages/Search.vue'
import My from './pages/My.vue'
import Write from './pages/Write.vue'
import UserInfo from './pages/UserInfo.vue'
import OauthRedirect from '@/pages/oauth/Redirect'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    children: [
      {
        path: ':page:size',
        component: Home,
        name: 'Home',
      },
    ],
  },

  { path: '/login', component: Login, name: Login },
  { path: '/signup', component: Signup },
  {
    path: '/write',
    component: Write,
    name: 'Write',
    children: [
      {
        path: ':edit_mode:feed_id',
        component: Write,
        name: 'Write',
      },
    ],
  },
  {
    path: '/my',
    component: My,
    beforeEnter: () => {
      // 경로 진입 거부
      const isAuthenticated = store.state.auth.isAuthenticated
      if (!isAuthenticated) {
        alert('로그인 해주세요!!')
        return '/login'
      }
    },
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':tag',
        component: Search,
      },
    ],
  },
  { path: '/userinfo/:userId', component: UserInfo },
  {
    path: '/oauth/redirect',
    name: 'OauthRedrect',
    component: OauthRedirect,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(to => {
//   const isAuthenticated = store.state.auth.isAuthenticated
//   console.log(to.path)

//   console.log(to.path instanceof String)

//   if (!isAuthenticated && to.path != '/login') {
//     // 유저를 로그인 페이지로 리디렉션

//     return '/login'
//   }
// })

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
