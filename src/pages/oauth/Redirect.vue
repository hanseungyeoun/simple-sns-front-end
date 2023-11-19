<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  mounted() {
    const token = this.$route.query.token
    const userId = this.$route.query.userId

    console.log('token', token)
    if (token) {
      this.login(token)
      this.fetchUser(userId)
        .then(() => {
          this.$router.replace('/')
        })
    }
  },
  methods: {
    ...mapActions('auth', ['fetchUser']),
    ...mapMutations('auth', ['login'])
  }
}
</script>
