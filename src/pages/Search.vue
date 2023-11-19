<template>
  <div id="container" class="container">
    <div class="common-inner">
      <div class="search-area">
        <input class="search-input" type="text" placeholder="검색어를 입력하세요." v-model="searchInput"
          @keyup.enter="fetchData" />
      </div>
      <div class="search-result-area">
        <div v-if="list.length === 0" class="no-result">
          검색 결과가 없습니다.
        </div>
        <div v-else>
          <p class="mgb16">검색결과 <b>{{ list.length }}개</b></p>
          <div class="thumb-view">
            <ul class="thumb-list">
              <li v-for="item in list" :key="item.id" class="thumb-item" @click="() => openModal(item)">
                <img :src="item.postImage" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="currentFeed" :feed="currentFeed" :close="closeModal" />
  </div>
</template>

<script>
import posts from '../api/posts'
import Modal from '../components/Modal'

export default {
  name: "Search",
  components: {
    Modal,
  },
  mounted() {
    console.log(this.$route);
    this.searchInput = this.$route.params.tag ?? '';
    if (this.searchInput)
      this.fetchData()

  },
  data() {
    return {
      searchInput: '',
      currentFeed: null,
      list: []
    }
  },

  methods: {
    fetchData() {
      posts.searchPost(this.searchInput, {}, function (data) {
        this.list = data.content;
        this.$router.replace({
          path: '/search',
          params: { tag: this.searchInput },
        });
      }.bind(this))
    },
    openModal(data) {
      this.currentFeed = data
    },
    closeModal() {
      this.currentFeed = null
    },
  }
};
</script>