import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/indexPage.vue'),
      redirect: '/articles',
      children: [
        {
          path: '/articles',
          component: () => import('@/views/home/HomePage.vue'),
          children: [
            {
              path: '/articles/:id?',
              component: () => import('@/views/categories/indexPage.vue')
            }
          ]
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/articleDetail/indexPage.vue')
        },
        {
          path: '/creator',
          component: () => import('@/views/creator/LayoutContainer.vue'),
          redirect: '/creator/overview',
          children: [
            {
              path: '/creator/overview',
              component: () => import('@/views/creator/OverviewPage.vue')
            },
            {
              path: '/creator/manage',
              component: () => import('@/views/creator/ArticleManage.vue')
            },
            {
              path: '/creator/channel',
              component: () => import('@/views/creator/ArticleChannel.vue')
            },
          ]
        },
        {
          path: '/user',
          component: () => import('@/views/user/LayoutContainer.vue'),
          redirect: '/user/article',
          children: [
            {
              path: '/user/article',
              component: () => import('@/views/user/ArticlePage.vue')
            },
            {
              path: '/user/favorites',
              component: () => import('@/views/user/FavoritesPage.vue')
            },
            {
              path: '/user/history',
              component: () => import('@/views/user/HistoryPage.vue')
            },
            {
              path: '/user/support',
              component: () => import('@/views/user/SupportPage.vue')
            }
          ]
        },
        {
          path: 'user/setting',
          component: () => import('@/views/setting/LayoutContainer.vue'),
          redirect: '/user/setting/profile',
          children: [
            {
              path: '/user/setting/profile',
              component: () => import('@/views/setting/ProfilePage.vue')
            },
            {
              path: '/user/setting/password',
              component: () => import('@/views/setting/PasswordPage.vue')
            }
          ]
        }
      ]
    },
  ]
})

export default router

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path.includes('/user')) return '/login'
  if (userStore.token && to.path === '/login') {
    ElMessage({ message: '当前已登录', type: 'error' })
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
})
