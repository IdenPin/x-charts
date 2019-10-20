export default {
  path: '/geo',
  name: 'Geo',
  component: () => import('@/views/geo'),
  children: [
    {
      path: 'china',
      name: 'China',
      component: () => import('@/views/geo/china')
    },
    {
      path: 'basin',
      name: 'Basin',
      component: () => import('@/views/geo/basin')
    },
    {
      path: 'choose',
      name: 'Choose',
      component: () => import('@/views/geo/choose')
    },
    {
      path: 'runInHole',
      name: 'RunInHole',
      component: () => import('@/views/geo/runInHole')
    }
  ]
}
