export default {
  path: '/geo',
  name: 'Geo',
  component: () => import('@/components/Node'),
  children: [
    {
      path: 'china',
      name: 'China',
      component: () => import('@/views/geo/China')
    },
    {
      path: 'basin',
      name: 'Basin',
      component: () => import('@/views/geo/Basin')
    },
    {
      path: 'choose',
      name: 'Choose',
      component: () => import('@/views/geo/Choose')
    },
    {
      path: 'runInHole',
      name: 'RunInHole',
      component: () => import('@/views/geo/RunInHole')
    }
  ]
}
