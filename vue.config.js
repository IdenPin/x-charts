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
  publicPath: process.env.NODE_ENV === 'production' ? '/x-charts/dist' : ''
}
