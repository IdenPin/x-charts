import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lineOrBar',
      name: 'LineOrBar',
      component: () => import('./views/LineOrBar')
    },
    {
      path: '/pie',
      name: 'Pie',
      component: () => import('./views/Pie')
    },
    {
      path: '/radar',
      name: 'Radar',
      component: () => import('./views/Radar')
    }
  ]
})
