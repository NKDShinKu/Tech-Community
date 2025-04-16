import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
import apiClient, { checkLoginStatus, refreshToken } from '@/api/api'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const status = await checkLoginStatus()
      if (status.data.userId === 0) {
        // 如果未登录，尝试刷新token
        await refreshToken()
      }
      const res = await apiClient(`user/info/${status.data.userId}`) // 请求获取数据
      user.value = res.data
      console.log(user.value)
    }
    const setUser = (obj) => (user.value = obj)
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
