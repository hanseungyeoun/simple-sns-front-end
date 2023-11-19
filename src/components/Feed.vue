<template>
  <div id="container" class="container list-container">
    <div class="feed-item">
      <div class="feed-header">
        <a href="#none" class="flx-ac">
          <img :src="feed?.profileImage ?? require('@/assets/images/user.png')" alt="" class="user-img" />{{
            feed.nickName
          }}
        </a>
        <div v-if="editable" class="feed-header-btns">
          <button class="feed-header-btn btn-small btn-solid-gray" @click="editFeed">
            수정
          </button>
          <button class="feed-header-btn btn-small btn-solid-primary" @click="deleteFeed">
            삭제
          </button>
        </div>
      </div>
      <div class="feed-body">
        <img class="feed-img" :src="feed?.postImage" alt="" />

        <div class="feed-like">
          <button :class="`btn-like ${feed.isLike && 'is-active'}`" @click="toggleLike">응원해요</button>
          <span class="like-count">
            {{ feed.likeCount ? feed.likeCount + '명이 응원해요' : '첫번째로 응원하기' }}
          </span>
        </div>
        <p class="feed-txt">
          {{ filteredText }}

          <span class="feed-more" v-if="feed.content.length > 20 && !isLong" @click="moreText">
            더보기
          </span>
          &nbsp;
          <router-link v-for=" tag  in  feed.hashtags " :key="tag" class="tag" :to="`/search/${tag}`">
            &nbsp;#{{ tag }}
          </router-link>
        </p>
        <p class="feed-date">{{ feed.createdAt }}</p>
      </div>
      <div class="feed-footer">
        <div class="comment-area">
          <ul class="comment-list">
            <li v-for=" comment  in  feed.comments " :key="comment" class="comment-item">
              <a onclick="alert('친구의 페이지로 이동')" class="fw700">
                {{ comment.name }}
              </a>&nbsp;
              <span>{{ comment.comment }}</span>
            </li>
          </ul>
        </div>
        <div class="comment-form">
          <input class="comment-input" type="text" placeholder="댓글을 입력하세요." v-model="newComment">
          <button @click="submitComment" class="btn-comment color-primary" :disabled="!newComment">게시</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import comments from '../api/comments'
import like from '../api/like'
import posts from '../api/posts'

export default {
  name: 'Feed',
  props: [
    'feed',
    'editable'
  ],
  data() {
    return {
      isLong: false,
      newComment: ''
    }
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
      'user'
    ]),
    filteredText() {
      if (this.feed.content.length > 20 && !this.isLong) {
        return this.feed.content.slice(0, 20)
      } else {
        return this.feed.content
      }
    },
  },
  methods: {
    moreText() {
      this.isLong = !this.isLong
    },
    submitComment() {
      if (!this.isAuthenticated) return alert('로그인 해주세요!!')

      let params = {
        postId: this.feed.id,
        userId: this.user.id,
        comment: this.newComment
      }

      comments.addComment(params, function (data) {
        this.newComment = "";
        this.$emit('addComment', data)

      }.bind(this))
    },
    toggleLike() {
      if (!this.isAuthenticated) return alert('로그인 해주세요!!')

      const params = {
        postId: this.feed.id,
        isLike: !this.feed.isLike
      }

      like.like(params, function (data) {
        this.$emit('toggleLike', data)
      }.bind(this),
        function (err) {
          if (err?.response?.data?.errors) {
            alert(err?.response.data.errors[0].reason)
          }
        }.bind(this))
    },
    editFeed() {
      this.$router.replace({
        name: "Write",
        query: { edit_mode: true, feed_id: this.feed.id },
      });
    },

    deleteFeed() {
      if (confirm("삭제 하시겠습니까")) {
        posts.deletePost(this.feed.id, function () {
          this.$emit('deleteFeed', this.feed.id)
        }.bind(this))
      }
    }
  }
}
</script>

<style scoped></style>
