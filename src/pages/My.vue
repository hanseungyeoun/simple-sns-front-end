<template>
  <div id="container" class="container thumb-container">
    <div class="common-inner">
      <Profile></Profile>
      <div class="thumb-view">
        <ul class="thumb-list">
          <li v-for="item in list" :key="item.id" class="thumb-item" @click="() => openModal(item)">
            <img :src="item.postImage" alt="" />
          </li>
        </ul>
      </div>
      <div class="pagination-area">
        <div class="pagination-area">
          <Pagination :currentPage="currentPage" :totalCount="totalCount" :pageSize="pageSize" :totalPages="totalPages"
            :onChange="movePage" />
        </div>
      </div>
    </div>
    <Modal v-if="currentFeed" :feed="currentFeed" :close="closeModal" v-on:toggleLike="toggleLike"
      v-on:addComment="addComment" />

  </div>>
</template>

<script>
import Profile from "../components/Profile.vue"
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import posts from '../api/posts'


export default {
  name: "My",
  components: {
    Profile,
    Modal,
    Pagination
  },
  data() {
    return {
      currentFeed: null,
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

  methods: {

    fetchData() {
      const param = {
        page: this.currentPage - 1,
        size: this.pageSize
      }

      posts.getMyPosts(param, function (data) {
        this.list = data.content;
        this.totalPages = data.totalPages;
        this.totalCount = data.totalElements;
        this.$router.replace({
          path: "/my",
          query: { page: this.currentPage, size: this.pageSize },
        });
      }.bind(this))
    },
    openModal(data) {
      this.currentFeed = data;
    },
    closeModal() {
      this.currentFeed = null;
    },

    movePage(page) {
      this.currentPage = page;
      this.fetchData();
      this.$router.push('/')
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