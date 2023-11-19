<template>
  <div class="my-profile-area">
    <div class="top-section">
      <div class="user-img-area">
        <router-link :to="`/userinfo/${user.id}`">
          <img class="user-img" :src="profile?.profileImage ?? require('@/assets/images/user.png')" alt="" />
        </router-link>
      </div>

      <div class="user-info-area">
        <p class="user-nickname">{{ profile.nickName }}</p>
        <p class="user-desc">{{ profile.description }}</p>
        <div class="user-count">
          <p>게시물 <b>{{ profile.feedCount }}</b></p>
          <p>열정지수 <b class="color-primary">{{ profile.passionIndex }}</b></p>
          <p>관심사 <b>{{ this.profile.hashtagCount }}</b></p>
        </div>
      </div>
    </div>

    <div class="user-interest-area">
      <router-link v-for="tag in hashtags" :key="tag.hashtagNames" :to="`/search/${tag.hashtagNames}`"
        :class="`tag ${tag.isPrimary && 'primary'}`">{{ tag.hashtagNames }}</router-link>

    </div>
  </div>
</template>

<script>
import userApi from '../api/users'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {}
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchData()
    }
  },
  computed: {
    ...mapGetters('auth', [
      'user'
    ]),
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
    // tagLength: function () {
    //   if (this.profile && this.profile.hashtags) {
    //     return this.profile.hashtags.length
    //   }
    //   return '0';
    // },
    hashtags() {
      if (!this.profile || !this.profile.hashtags)
        return {};

      const t = this.profile.hashtags.map(tag => {
        return {
          hashtagNames: tag,
          isPrimary: this.profile.topHashtags.includes(tag)
        }
      })
      console.log(t);
      return t;
    }
  },
  methods: {
    fetchData() {
      const userId = this.user.id;

      if (!userId)
        return;

      userApi.getUserDetails(userId, function (data) {
        this.profile = data;
      }.bind(this));
    }
  }
}

</script>

<style scoped></style>
