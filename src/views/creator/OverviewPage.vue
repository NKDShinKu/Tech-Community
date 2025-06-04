<script setup>
import { ref } from 'vue'
import { Warning } from '@element-plus/icons-vue'
import { useUserStore} from '@/stores/index.js'

const userStore = useUserStore()

const userInfo = ref({
  avatar: userStore.userInfo.avatar,
  nickname: userStore.userInfo.username,
  description: '一个热爱编程的开发者'
})

const stats = ref({
  comments: 120,
  likes: 350,
  favorites: 80,
  views: 5000
})
</script>

<template>
  <div class="overview-page">
    <!-- 个人信息展示 -->
    <el-card class="user-info-card">
      <div class="user-info">
        <el-avatar :size="80" :src="userInfo.avatar || '/public/default.png'" />
        <div class="info">
          <h3>{{ userInfo.nickname }}</h3>
          <p>{{ userInfo.description }}</p>
        </div>
      </div>
    </el-card>

    <!-- 统计数据展示 -->
    <el-card class="data-card">
      <div class="title-card">数据概览</div>
      <el-row :gutter="20" class="stats-row">
        <el-col :span="12">
          <el-card shadow="never">
            <el-statistic title="文章浏览量" :value="stats.views" >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  文章浏览量
                  <el-tooltip
                    effect="dark"
                    content="文章被所有用户浏览的总数量，不包括列表浏览"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <template #prefix>
                <Icon icon="fluent-mdl2:view" style="font-size: 16px; margin-right: 5px" />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <el-statistic
              :value="stats.favorites"
            >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  文章收藏数
                  <el-tooltip
                    effect="dark"
                    content="文章被已登录用户收藏的总数量，包括自己"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <template #prefix>
                <Icon icon="uit:favorite" style="font-size: 16px; margin-right: 5px" />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="stats-row">
        <el-col :span="12">
          <el-card shadow="never">
            <el-statistic
              title="文章评论数"
              :value="stats.comments"
            >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  文章评论数
                  <el-tooltip
                    effect="dark"
                    content="文章被已登录用户评论的总数量，包括自己"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <template #prefix>
                <Icon icon="mdi-light:comment-text" style="font-size: 16px; margin-right: 5px" />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <el-statistic title="文章点赞数" :value="stats.likes" >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  文章点赞数
                  <el-tooltip
                    effect="dark"
                    content="文章被已登录用户点赞的总数量，包括自己"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <template #prefix>
                <Icon icon="prime:thumbs-up" style="font-size: 16px; margin-right: 5px" />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.overview-page {
  display: flex;
  flex-direction: column;
  height: 100%;
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

  .data-card {
    background-color: rgba(255, 255, 255, 1);
    padding: 5px 20px 10px;
    flex: 1;
    .title-card {
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 30px;
      padding: 10px;
      border-bottom: #a6a2a2 1px solid;
      border-radius: 8px;
    }

    .stats-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .el-card {
        text-align: center;
        height: 150px;
        background-color: #f7f8fa;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    }
  }
}
</style>