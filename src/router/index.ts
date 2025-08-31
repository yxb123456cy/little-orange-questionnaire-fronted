import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
  },

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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../pages/forgot-password/ForgotPassword.vue'),
    meta: {
      title: '忘记密码 - 小橘问卷',
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
          requiresAuth: false,
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
router.beforeEach((to, _, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }

  // 检查是否需要认证
  const requiresAuth = to.meta?.requiresAuth
  const isAuthenticated = false // TODO: 从store或localStorage获取认证状态

  if (requiresAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  else if (!requiresAuth && isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // 已登录用户访问登录/注册页，重定向到仪表板
    next({ name: 'Dashboard' })
  }
  else {
    next()
  }
})

export default router
