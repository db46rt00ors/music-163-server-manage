// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000/', //对应自己的接口
        pathRewrite: { '^/': '' }
      }
    }
  }
}