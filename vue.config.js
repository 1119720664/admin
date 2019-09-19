module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.1.186:10090',  /*target: 'http://192.168.31.20:7800',*/
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
