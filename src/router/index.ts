import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/Login.vue'),
    meta: {
      title: '登录 - 小橘问卷',
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/register/Register.vue'),
    meta: {
      title: '注册 - 小橘问卷',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/home/Home.vue'),
        meta: {
          title: '小橘问卷 - 专业的在线问卷调研平台',
          requiresAuth: false,
        },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../pages/profile/Profile.vue'),
        meta: {
          title: '个人中心 - 小橘问卷',
          requiresAuth: true,
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../pages/settings/Settings.vue'),
        meta: {
          title: '设置 - 小橘问卷',
          requiresAuth: true,
        },
      },
      {
        path: 'questionnaires',
        name: 'Questionnaires',
        component: () => import('../pages/questionnaires/Questionnaires.vue'),
        meta: {
          title: '我的问卷 - 小橘问卷',
          requiresAuth: true,
        },
      },
      {
        path: 'starred',
        name: 'Starred',
        component: () => import('../pages/starred/Starred.vue'),
        meta: {
          title: '星标问卷 - 小橘问卷',
          requiresAuth: true,
        },
      },
      {
        path: 'trash',
        name: 'Trash',
        component: () => import('../pages/trash/Trash.vue'),
        meta: {
          title: '回收问卷 - 小橘问卷',
          requiresAuth: true,
        },
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('../pages/analytics/Analytics.vue'),
        meta: {
          title: '数据分析 - 小橘问卷',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/error/404/404.vue'),
    meta: {
      title: '页面未找到 - 小橘问卷',
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0 }
    }
  },
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }

  // 检查是否需要认证
  const requiresAuth = to.meta?.requiresAuth
  const isAuthenticated = true // TODO: 从store获取认证状态

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  else if (!requiresAuth && isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})

export default router
