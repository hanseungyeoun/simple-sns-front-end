<template>
  <nav id="nav">
    <div class="common-inner nav-inner">
      <router-link to="/">
        <!-- <img src="../assets/images/logo.svg" alt="FAST CAMPUS"> -->
        <h2>Home</h2>
      </router-link>

      <ul class="gnb-list" :data-login="isAuthenticated">
        <!-- 로그인시 -->
        <li class="gnb-item menu-search">
          <router-link to="/search" class="gnb-link">
            <img src="../assets/images/ico-search.svg" alt="검색하기">
          </router-link>
        </li>
        <li class="gnb-item menu-write">
          <router-link to="/write" class="gnb-link">
            <img src="../assets/images/ico-write.svg" alt="전체 피드">
          </router-link>
        </li>
        <li class="gnb-item menu-user">
          <router-link to="/my" class="gnb-link">
            <img v-if="isAuthenticated && user?.profileImage"
              :src="user?.profileImage ?? require('@/assets/images/ico-search.svg')" alt="" class="user-img">
          </router-link>
        </li>

        <li class="gnb-item menu-user">
          <button class="gnb-link btn-small btn-solid-primary" @click="fetchLogout">
            로그 아웃
          </button>
        </li>

        <!-- 비로그인시 -->
        <li class="gnb-item menu-login">
          <router-link to="/login" class="gnb-link btn-small btn-solid-primary">
            로그인
          </router-link>
        </li>
        <li class="gnb-item menu-signup">
          <router-link to="/signup" class="gnb-link">회원가입</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'

export default {
  name: 'Nav',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
    ...mapGetters('auth', [
      'user'
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),
    fetchLogout() {
      this.logout()
    }
  }
}
</script>

