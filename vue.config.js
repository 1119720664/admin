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
        target: 'http://192.168.1.110:7800',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
