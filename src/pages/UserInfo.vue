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

          <div class="form-group mgt8">
            <input class="form-input" type="text" placeholder="닉네임" aria-label="닉네임 입력창" required v-model="nickName" />
          </div>
          <textarea class="form-textarea mgt8" placeholder="상세 설명을 적어주세요." v-model="desc"></textarea>

          <button @click="registFeed" class="btn-large btn-solid-primary">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '../api/users'

export default {
  name: "UserInfo",
  data() {
    return {
      file: null,
      img: null,
      desc: '',
      descError: false,
      nickName: '',
      nickNameError: false,
      userId: this.$route.params.userId ?? ''
    };
  },
  mounted() {
    if (this.userId) {
      this.fetchUser(this.userId);
    }
  },
  methods: {
    fetchUser(userId) {
      userApi.getUser(userId, function (data) {
        const { nickName, description, profileImage } = data
        this.nickName = nickName
        this.desc = description
        this.img = profileImage
      }.bind(this))
    },

    fileLoad(event) {
      this.file = event.target.files[0];
      this.img = URL.createObjectURL(event.target.files[0])
    },

    registFeed() {
      if (!this.img || !this.nickName || !this.desc) return alert('이미지와 별명,설명을 모두 입력하세요.');

      const body = {}
      if (this.file) {
        body.file = this.file
      }

      if (this.nickName) {
        body.nickName = this.nickName
      }

      if (this.desc) {
        body.description = this.desc
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/formdata; charset=utf-8',
          Accept: '*/*',
        }
      }
      userApi.updateUsers(this.userId, body, this.success.bind(this), this.fail, config)

    },
    success() {
      alert("수정 되었습니다.")
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
