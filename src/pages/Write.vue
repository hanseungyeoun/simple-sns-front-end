<template>
  <div id="container" class="container write-container">
    <div class="common-inner">
      <div class="form-content">
        <div class="img-preview-area">
          <!-- 사진 추가 전  -->
          <img v-if="img" :src="img" alt="" class="img-preview">
          <label v-else for="img-upload" class="txt-preview">
            여기를 눌러 이미지를 등록하세요.
          </label>

          <!-- 사진 추가 후 -->
        </div>
        <div class="form-area">
          <input id="img-upload" class="form-file" type="file" @change="fileLoad" />
          <textarea class="form-textarea" placeholder="사진에 대한 설명을 적어주세요." v-model="txt"></textarea>
          <button @click="registFeed" class="btn-large btn-solid-primary">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import posts from '../api/posts'

export default {
  name: "Write",
  data() {
    return {
      file: null,
      img: null,
      txt: '',
      feedId: this.$route.query.feed_id ? this.$route.query.feed_id : null,
      editMode: this.$route.query.edit_mode ? this.$route.query.edit_mode : false,
    };
  },
  mounted() { //최초 로딩 시 실행
    if (this.feedId) { // num 값이 있으면 상세 데이터 호출한다.
      this.fetchPost(this.feedId);
    }
  },
  methods: {
    fetchPost(feedId) {
      posts.getPost(feedId, function (data) {
        this.img = data.postImage
        this.txt = data.content
      }.bind(this),
        function (err) {
          if (err.response?.data?.message) {
            alert(err.response?.data?.message)
          }
        })
    },

    fileLoad(event) {
      this.file = event.target.files[0];
      this.img = URL.createObjectURL(event.target.files[0])
    },

    registFeed() {
      if (this.editMode) {
        if (!this.txt) return alert('설명을 입력하세요.');
      } else {
        if (!this.file || !this.txt) return alert('이미지와 설명을 모두 입력하세요.');
      }

      const body = {}
      if (this.file) {
        body.file = this.file
      }

      if (this.txt) {
        body.content = this.txt
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/formdata; charset=utf-8',
          Accept: '*/*',
        }
      }

      if (this.editMode) {
        if (!this.txt) return alert('설명을 입력하세요.');
        posts.updatePost(
          this.feedId,
          body,
          this.success.bind(this),
          this.fail,
          config
        )
      } else {

        posts.writePost(body,
          this.success.bind(this),
          this.fail,
          config)
      }
    },
    success() {
      alert("등록 되었습니다.")
      this.$router.push('/')
    },
    fail(err) {
      if (err?.response?.data?.errors) {
        alert(err?.response.data.errors[0].reason)
      }
    }

  },
};
</script>
