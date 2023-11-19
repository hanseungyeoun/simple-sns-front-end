export default {
  handle(success) {
    return res => {
      if (res.status == 200 || res.status == 201) {
        success(res.data.data)
      }
    }
  },
}
