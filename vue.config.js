module.exports = {
  devServer: {
    proxy: process.env.PROXY_SERVER || '',
  },
}
