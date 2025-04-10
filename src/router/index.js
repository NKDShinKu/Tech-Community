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
      redirect: '/article',
      children: [
        {
          path: '/article',
          component: () => import('@/views/home/HomePage.vue'),
          children: [
            {
              path: '/article/:id?',
              component: () => import('@/views/categories/indexPage.vue')
            }
          ]
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/articleDetail/indexPage.vue')
        },
        {
          path: '/about',
          component: () => import('@/views/about/indexPage.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/creator/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/articleManage/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/articleManage/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
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
