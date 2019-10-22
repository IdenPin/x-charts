export default [
  {
    path: '/lineOrBar',
    name: 'LineOrBar',
    component: () => import('@/views/LineOrBar')
  },
  {
    path: '/pie',
    name: 'Pie',
    component: () => import('@/views/Pie')
  },
  {
    path: '/radar',
    name: 'Radar',
    component: () => import('@/views/Radar')
  },
  {
    path: '/scatter',
    name: 'Scatter',
    component: () => import('@/views/Scatter')
  },
  {
    path: '/tree',
    name: 'Tree',
    component: () => import('../views/Tree')
  }
]
