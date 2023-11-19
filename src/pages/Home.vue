<template>
  <div id="container" class="container list-container">
    <div class="common-inner flx-sb">
      <div class="feed-list">
        <div class="feed-item-area">
          <Feed v-for="item in list" :key="item.id" :feed="item" :editable="false" v-on:toggleLike="toggleLike"
            v-on:addComment="addComment" />
        </div>
        <div class="pagination-area">
          <Pagination :currentPage="currentPage" :totalCount="totalCount" :pageSize="pageSize" :totalPages="totalPages"
            :onChange="movePage" />
        </div>
      </div>

      <Profile v-if="isAuthenticated" />
    </div>
  </div>
</template>

<script>
import Feed from "../components/Feed.vue"
import Profile from '../components/Profile'
import Pagination from '../components/Pagination'
import { mapGetters } from 'vuex'
import posts from '../api/posts'

export default {
  name: 'Home',
  components: {
    Feed,
    Profile,
    Pagination,
  },
  data() {
    return {
      list: [],
      pageSize: this.$route.query.size ? this.$route.query.size : 5,
      currentPage: this.$route.query.page ? this.$route.query.page : 1,
      totalPages: 0,
      totalCount: 0,
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
    ...mapGetters('auth', [
      'accessToken'
    ]),
  },
  methods: {
    fetchData() {
      const param = {
        page: this.currentPage - 1,
        size: this.pageSize
      }

      posts.getPosts(param, function (data) {
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalCount = data.totalElements;
        this.$router.replace({
          name: "Home",
          query: { page: this.currentPage, size: this.pageSize },
        });
      }.bind(this))
    },
    movePage(page) {
      this.currentPage = page
      this.fetchData();
    },
    addComment(response) {
      const index = this.list.findIndex(function (item) {
        return item.id === response.postId;
      })
      const feed = this.list[index];
      feed.comments.unshift(response);
    },
    toggleLike({ postId, isLike }) {
      const index = this.list.findIndex(function (item) {
        return item.id === postId;
      })

      const feed = this.list[index];
      if (isLike) {
        feed.isLike = true;
        feed.likeCount++
      } else {
        feed.isLike = false;
        feed.likeCount--
      }
    }
  }
}
</script>

<style scoped></style>
