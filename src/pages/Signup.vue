<template>
  <div id="container" class="container">
    <div class="form-inner">
      <form action="" class="form-container" @submit="signup" novalidate="true">
        <fieldset>
          <legend>회원가입</legend>

          <h1 class="form-title">회원가입</h1>

          <div class="form-group">
            <input :class="`form-input ${emailError && 'error'}`" type="email" placeholder="이메일 주소"
              aria-label="이메일 주소 입력창" required v-model="email" />
            <p v-if="emailError" class="txt-error">이메일을 입력해주세요.</p>
          </div>

          <div class="form-group mgt8">
            <input :class="`form-input ${nickNameError && 'error'}`" type="text" placeholder="닉네임" aria-label="닉네임 입력창"
              required v-model="nickName" />
            <p v-if="nickNameError" class="txt-error">닉네임을 입력해주세요.</p>
          </div>

          <div class="form-group mgt8">
            <input :class="`form-input ${passwordError && 'error'}`" type="password" placeholder="비밀번호"
              aria-label="비밀번호 입력창" required v-model="password" />
            <p v-if="passwordError" class="txt-error">비밀번호를 입력해주세요.</p>
          </div>

          <button class="btn-large btn-solid-primary mgt32">회원가입</button>
        </fieldset>
      </form>

      <p class="mgt16 color-gray3 center">
        이미 계정이 있으신가요?
        <router-link to="/login" class="underline">로그인</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import users from '../api/users'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      emailError: false,
      nickName: '',
      nickNameError: false,
      password: '',
      passwordError: false,
    }
  },
  methods: {

    signup: function (e) {
      e.preventDefault();

      if (this.email && this.nickName && this.password) {
        users.join({
          email: this.email,
          password: this.password,
          nickName: this.nickName,
        },
          function () {
            alert('회원가입 되었습니다.')
            this.$router.push('/');
          }.bind(this),
          function (err) {
            if (err?.response?.data?.errors) {
              alert(err?.response.data.errors[0].reason)
            }
          }
        )
      }

      if (!this.email) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }

      if (!this.name) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }

      if (!this.nickName) {
        this.nickNameError = true;
      } else {
        this.nickNameError = false;
      }

      if (!this.password) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    }
  }
}
</script>

<style scoped></style>
