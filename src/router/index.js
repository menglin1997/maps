
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/begin',
      name: 'begin',
      meta: '选择地图',
      component: () => import('@/views/Begin')
    },
    {
      path: '/baidu',
      name: 'Baidu',
      meta: '百度地图',
      component: () => import('@/views/baidu')
    },
    {
      path: '/tengxun',
      name: 'Tengxun',
      meta: '腾讯地图',
      component: () => import('@/views/tengxun')
    },
    {
      path: '/gaode',
      name: 'Gaode',
      meta: '高德地图',
      component: () => import('@/views/gaode')
    },
    {
      path: '/',
      name: '',
      redirect: '/begin'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  document.title = typeof to.meta === 'string' ? to.meta : '花开富贵寄存柜'
  next()
})

export default router
