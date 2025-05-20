<script setup>
import { ref } from 'vue'

const userInfo = ref({
  avatar: '@/assets/default.png',
  nickname: '二階堂真紅',
  description: '一个热爱编程的开发者',
})

const stats = ref({
  comments: 120,
  likes: 350,
  favorites: 80,
})
</script>

<template>
  <div class="overview-page">
    <!-- 个人信息展示 -->
    <el-card class="user-info-card">
      <div class="user-info">
        <el-avatar :size="80" :src="userInfo.avatar" />
        <div class="info">
          <h3>{{ userInfo.nickname }}</h3>
          <p>{{ userInfo.description }}</p>
        </div>
      </div>
    </el-card>

    <!-- 统计数据展示 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="8">
        <el-card>
          <el-statistic
            title="文章评论数"
            :value="stats.comments"
            prefix-icon="el-icon-chat-line-round"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-statistic
            title="文章点赞数"
            :value="stats.likes"
            prefix-icon="el-icon-thumb"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-statistic
            title="文章收藏数"
            :value="stats.favorites"
            prefix-icon="el-icon-star-off"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.overview-page {

  .user-info-card {
    margin-bottom: 20px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;

      .info {
        h3 {
          font-size: 1.5rem;
          margin: 0;
        }

        p {
          color: #666;
          margin: 0;
        }
      }
    }
  }

  .stats-row {
    display: flex;
    justify-content: space-between;

    .el-card {
      text-align: center;
    }
  }
}
</style>