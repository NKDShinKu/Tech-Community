import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore('tech-user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const refreshToken = ref(localStorage.getItem('refreshToken') || '')
  const userId = ref(localStorage.getItem('userId') || '')
  const userInfo = ref(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {})
  const setToken = (newToken, newRefreshToken, newUserId) => {
    token.value = newToken
    refreshToken.value = newRefreshToken
    userId.value = newUserId
    localStorage.setItem('token', newToken)
    localStorage.setItem('refreshToken', newRefreshToken)
    localStorage.setItem('userId', newUserId)
  }
  const removeToken = () => {
    token.value = ''
    refreshToken.value = ''
    userId.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    userInfo.value = {}
    localStorage.removeItem('userInfo')
  }

  const getUser = async (id) => {
    const res = await userGetInfoService(id)
    userInfo.value = res.data
    console.log('获取用户信息:', res.data)
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  }
  const setUser = (obj) => (userInfo.value = obj)
  return {
    token,
    refreshToken,
    userId,
    setToken,
    removeToken,
    userInfo,
    getUser,
    setUser
  }
})
