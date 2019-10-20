import Vue from 'vue'
import Router from 'vue-router'
import Chart from './chart'
import Geo from './geo'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 图表类
    ...Chart,
    // 地图类
    Geo
  ]
})
