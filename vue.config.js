/*
 * @Description: pdeng
 * @Author: your name
 * @Date: 2019-10-17 10:02:20
 * @LastEditTime: 2019-10-17 10:14:48
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/x-charts/dist' : '',
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://0.0.0.0:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/dev-api': {
        target: `http://0.0.0.0:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  }
}
