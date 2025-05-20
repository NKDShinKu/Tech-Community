<template>
  <nav class="navbar">
    <div class="nav-left">技术分享社区</div>
    <div class="nav-center">
      <router-link to="/articles" :class="{ active: $route.path.includes('/articles') }" class="nav-item">首页</router-link>
      <router-link to="/article-manage" :class="{ active: $route.path.includes('/article-manage') }" class="nav-item">创作者中心</router-link>
    </div>
    <div class="nav-right">
      <input type="text" v-model="searchQuery" placeholder="搜索..." class="search-box" />

      <router-link v-if="userStore.token" to="/user" class="nav-item">
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span>
            <el-avatar :src="userStore.user.user_pic || avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="setting"><Icon icon="hugeicons:setting-07" style="font-size: 18px" />设定中心</el-dropdown-item>
              <el-dropdown-item command="article"><el-icon><Document /></el-icon>我的文章</el-dropdown-item>
              <el-dropdown-item command="favorites"><el-icon><Star /></el-icon>我的收藏</el-dropdown-item>
              <el-dropdown-item command="support"><Icon icon="prime:thumbs-up" style="font-size: 18px" />我的点赞</el-dropdown-item>
              <el-dropdown-item command="history"><Icon icon="material-symbols-light:history-2-rounded" style="font-size: 18px" />浏览历史</el-dropdown-item>
              <el-dropdown-item command="logout"><Icon icon="quill:off" style="font-size: 16px" />退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </router-link>

      <router-link v-else to="/login" class="nav-item">登录/注册</router-link>
    </div>
  </nav>
  <router-view class="router-view"></router-view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { Document, Star } from '@element-plus/icons-vue'

const handleCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('你确认退出登录吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.setUser({})
    router.push(`/login`)
  } else {
    router.push(`/user/${command}`)
  }
}

const searchQuery = ref('')
const userStore = useUserStore()
const router = useRouter()
</script>

<style lang="scss" scoped>
.active {
  color: rgb(31, 126, 222);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: rgb(31, 126, 222); // hover 较淡的色条
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 15px 150px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.nav-item {
  margin: 0 15px;
  text-decoration: none;
  font-size: 16px;
  position: relative;
  padding: 5px 8px;
  transition: color 0.3s;

  &:hover {
    color: rgb(75, 138, 201);
  }

  &:hover::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: rgb(75, 138, 201); // hover 较淡的色条
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.nav-right {
  display: flex;
  align-items: center;
}

.search-box {
  padding: 5px 10px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.router-view {
  margin-top: 5rem;
}
</style>
