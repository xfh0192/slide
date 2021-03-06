import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import sliderWrapper from '@/components/slide/sliderWrapper'

Vue.use(Router)

let router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/slider',
      name: 'sliderWrapper',
      component: sliderWrapper
    },
    {
      path: '/animate',
      name: 'animate',
      component: () => import('../components/animate/wrapper')
    },
    {
      path: '/css/demo',
      name: 'cssDemo',
      component: () => import('../components/cssDemo/wrapper')
    },
    {
      path: '/sql/demo',
      name: 'sqlDemo',
      component: () => import('../components/sqlDemo/wrapper')
    },
    {
      path: '/fs/demo',
      name: 'fsDemo',
      component: () => import('../components/fsDemo/wrapper')
    },
    {
      path: '/observer',
      name: 'observer',
      component: () => import('../components/observerMode/wrapper')
    },
    {
      path: '/mongo/demo',
      name: 'mongoLogin',
      component: () => import('../components/loginDemo/wrapper'),
      redirect: '/mongo/demo/login',
      children: [
        {
          path: 'login',
          name: 'login',
        },
        {
          path: 'regist',
          name: 'regist',
        }
      ]
    }
  ]
})

// https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
// 全局路由守卫
router.beforeEach((to,from,next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  console.log(to, from)
  next()
})

router.afterEach((to, from, next) => {
  console.log(to, from)
})

export default router;