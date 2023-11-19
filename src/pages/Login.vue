<template>
  <div id="container" class="container">
    <div class="form-inner">
      <form action="#" class="form-container" @submit.prevent="fetchLogin" novalidate="true">
        <fieldset>
          <legend>로그인</legend>

          <h1 class="form-title">로그인</h1>

          <div class="form-group">
            <!-- input 에러있는 경우 클래스명 error 추가 -->
            <input :class="`form-input ${emailError && 'error'}`" type="email" placeholder="이메일 주소"
              aria-label="이메일 주소 입력창" required v-model="email" />
            <p v-if="emailError" class="txt-error">이메일을 입력해주세요.</p>
          </div>

          <div class="form-group mgt8">
            <input :class="`form-input ${passwordError && 'error'}`" type="password" placeholder="비밀번호"
              aria-label="비밀번호 입력창" required v-model="password" />
            <p v-if="passwordError" class="txt-error">비밀번호를 입력해주세요.</p>
          </div>

          <button class="btn-large btn-solid-primary mgt32">로그인</button>
        </fieldset>
        <div class="socal_login_container">
          <template v-for="social in socials" :key="social.socialType">
            <a :href='socialLoginUrl(social.socialType)' class="social_btn">
              <img :src='social.src' :style='{ width: social.width, height: social.height }' class="social_login">
              {{ social.comment }}
            </a>
          </template>
        </div>
      </form>

      <p class=" mgt16 color-gray3 center">
        계정이 없으신가요?
        <router-link to="/signup" class="underline">회원가입</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import $ from '@/utils'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      socials: [
        {
          socialType: 'google',
          src: $.getSocialImage('google'),
          width: '32px',
          height: '32px',
          comment: '구글 로그인'
        },
        {
          socialType: 'naver',
          src: $.getSocialImage('naver'),
          width: '32px',
          height: '32px',
          comment: '네이버 로그인'
        },
        {
          socialType: 'kakao',
          src: $.getSocialImage('kakao'),
          width: '32px',
          height: '32px',
          comment: '카카오 로그인'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
      'fetchUser'
    ]),
    fetchLogin() {
      if (this.email && this.password) {
        this.login({
          email: this.email,
          password: this.password,
        }).then(({ userId }) => {
          return this.fetchUser(userId)
        })
          .then(() => {
            this.$router.push('/');
          })
          .catch(function (error) {
            if (error?.response) {
              alert(error.response.data.message)
            }
          });
      }

      if (!this.email) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }

      if (!this.password) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    },
    socialLoginUrl(socialType) {
      return $.getSocialLoginUrl(socialType)
    }
  }
}
</script>

<style scoped>
.socal_login_container {
  text-align: center;
  margin: 10px auto;
}

.social_login {
  height: 32px;
  float: left;
  margin-top: 5.2px;
  margin-left: 10px;
}

.social_btn:hover {
  color: #2098f3;
}

.social_btn {
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 16px;
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
</style>
