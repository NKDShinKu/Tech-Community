<script setup>
// 这里可以添加 Vue 组件逻辑

import { useUserStore } from '@/stores'

const userStore = useUserStore()
userStore.getUser(userStore.userInfo.id)

console.log(userStore.user)
const categoryList = [
  { id: '', name: '全部' },
  { id: '1', name: '生活相关' },
  { id: '2', name: '后端' },
  { id: '3', name: '网络' },
  { id: '4', name: '前端' },
  { id: '5', name: '算法' },
  { id: '6', name: '计算机' },
  { id: '7', name: '数据库' }
]

// 置顶功能
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 平滑滚动到顶部
}
</script>

<template>
  <div class="main-layout">
    <!-- 左侧分类栏 -->
    <div class="sidebar-left">
      <h2>分类</h2>
      <el-scrollbar height="90%">
        <div class="category-list">
          <router-link
            :class="{ active: item.id === $route.params.id }"
            class="category-item"
            v-for="item in categoryList"
            :to="`/articles/${item.id}`"
            :key="item.id"
            @click="scrollToTop"
          >
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </el-scrollbar>
    </div>

    <!-- 中间文章列表区域 -->
    <div class="content-area">
      <router-view></router-view>
    </div>

    <!-- 右侧个人信息栏 -->
    <div class="sidebar-right">
      <div class="profile-content">
        <el-avatar :size="100" :src="userStore.userInfo.avatar || '/public/default.png'" />
        <h3>{{ userStore.userInfo.username || '游客模式' }}</h3>
        <p>一个热爱编程的开发者</p>
        <div class="stats">
          <span>文章: 25</span>
          <span>收藏: 150</span>
        </div>
      </div>
    </div>

    <!-- 置顶按钮 -->
    <el-backtop :right="80" :bottom="80" />
  </div>
</template>

<style scoped lang="scss">
// 主布局
.main-layout {
  margin-top: 6rem; // mt-24
  display: flex;
  justify-content: center;
  gap: 3rem; // space-x-13
  min-height: 100vh;
  padding-bottom: 2.5rem; // pb-10
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

// 左侧栏
.sidebar-left {
  width: 200px;
  height: 55vh;
  background: #ffffff;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 70px;
  padding: 20px 5px;
  border-radius: 8px;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
    gap: 2px;

    .category-item {
      cursor: pointer;
      width: 90%;
      padding: 15px;
      text-align: center;

      &:hover {
        color: #4a90e2;
      }
    }
  }
}

// 中间内容区域
.content-area {
  width: 900px;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.1);
}

// 右侧栏
.sidebar-right {
  width: 250px;

  .profile-content {
    position: sticky;
    top: 70px;
    background: #ffffff;
    padding: 1.5rem;
    box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    h3 {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }

    .stats {
      display: flex;
      gap: 1rem;
      color: #888;
    }
  }
}

.active {
  color: #2280de;
  background: #eaf2ff;
}
.back-to-top {
  position: fixed; /* 固定定位 */
  padding: 20px;
  bottom: 30px; /* 距离底部 20px */
  right: 30px; /* 距离右侧 20px */
}
</style>
