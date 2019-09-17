import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/validateView',
      name: 'validateView',
      component: () => import('@/pages/login/ValidateView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/containers/DefaultContainer.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'home',
          name: '',
          component: () => import('@/views/home/Home.vue')
        },
        {
          // IP List
          path: 'iplimit',
          name: 'iplimit',
          redirect: '/iplimit/index',
          component: () => import('@/views/iplimit/Iplimit.vue'),
          children: [
            {
              path: 'index',
              name: 'iplimitIndex',
              component: () => import('@/views/iplimit/Index.vue')
            }
          ]
        },
        {
          // 選單
          path: 'menu',
          name: 'menu',
          component: () => import('@/views/menu/Menu.vue'),
          children: [
            {
              path: 'index',
              name: 'menuIndex',
              component: () => import('@/views/menu/Index.vue')
            }
          ]
        },
        {
          // 角色
          path: 'role',
          name: 'role',
          component: () => import('@/views/role/Role.vue'),
          children: [
            {
              path: 'index',
              name: 'roleIndex',
              component: () => import('@/views/role/Index.vue')
            }
          ]
        },
        {
          // 使用者
          path: 'user',
          name: 'user',

          component: () => import('@/views/user/User.vue'),
          children: [
            {
              path: 'index',
              name: 'userIndex',
              component: () => import('@/views/user/Index.vue')
            }
          ]
        },
        {
          // 頁面
          path: 'page',
          name: 'page',

          component: () => import('@/views/page/Page.vue'),
          children: [
            {
              path: 'index',
              name: 'pageIndex',
              component: () => import('@/views/page/Index.vue')
            }
          ]
        },
        {
          // 三方平台銀行
          path: 'tPlatformBank',
          name: 'tPlatformBank',

          component: () => import('@/views/tPlatformBank/TPlatformBank.vue'),
          children: [
            {
              path: 'index',
              name: 'tPlatformBankIndex',
              component: () => import('@/views/tPlatformBank/Index.vue')
            }
          ]
        },
        {
          // 三方平台
          path: 'tPlatform',
          name: 'tPlatform',

          component: () => import('@/views/tPlatform/TPlatform.vue'),
          children: [
            {
              path: 'index',
              name: 'tPlatformIndex',
              component: () => import('@/views/tPlatform/Index.vue')
            }
          ]
        },
        {
          // 代理API
          path: 'agentapi',
          name: 'agentapi',
          component: () => import('@/views/agentapi/AgentAPI.vue'),
          children: [
            {
              path: 'index',
              name: 'agentapiIndex',
              component: () => import('@/views/agentapi/Index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('@/views/info/Info.vue')
    },
    {
      path: '/page403',
      name: 'page403',
      component: () => import('@/pages/error/Page403.vue')
    },
    {
      path: '/page500',
      name: 'page500',
      component: () => import('@/pages/error/Page500.vue')
    },
    {
      path: '*',
      component: () => import('@/pages/error/Page404.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // 判斷要進入的路由有沒有 requiresAuth，有的話表示需要驗證登入
  if (
    to.matched.some(record => {
      // console.log(from, to)
      // console.log(record.name, record.meta.requiresAuth);
      return record.meta.requiresAuth
    })
  ) {
    // 檢查是否登入
    if (Object.is(store.getters['accessToken'], '')) {
      // 透過 vuex state 取得當前的 token 是否存在
      next({
        path: '/login',
        replace: true,
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
