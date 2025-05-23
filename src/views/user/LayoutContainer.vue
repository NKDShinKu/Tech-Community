<template>
  <div class="profile-page">
    <!-- 用户卡片 -->
    <el-card class="user-card">
      <div class="user-info">
        <img class="avatar" src="@/assets/default.png" />
        <div class="info">
          <div class="name">二階堂真紅</div>
          <div class="meta">
            <p>+ 你从事什么职业?</p>
          </div>
        </div>
        <router-link to="/user/setting"><el-button class="setting-btn" type="primary">设定中心</el-button></router-link>

      </div>
    </el-card>

    <!-- 标签页 -->
    <el-card class="content">
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" router>
          <el-menu-item index="/user/article"><el-icon><Document /></el-icon> 文章</el-menu-item>
          <el-menu-item index="/user/favorites"><el-icon><Star /></el-icon>收藏</el-menu-item>
          <el-menu-item index="/user/support"><Icon icon="prime:thumbs-up" style="font-size: 20px" />点赞</el-menu-item>
          <el-menu-item index="/user/history"><Icon icon="material-symbols-light:history-2-rounded" style="font-size: 20px" />浏览历史</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main">
        <router-view v-if="isEmpty"></router-view>
        <el-empty v-else description="没有数据" />
      </el-main>
    </el-card>

    <!-- 文章内容（为空时显示空状态） -->

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Document, Star } from '@element-plus/icons-vue'


const isEmpty = ref(true)
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 20px;
  width: 1000px;
  margin: 4rem auto 0;
  .user-card {
    margin-bottom: 10px;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 16px;
      }

      .info {
        flex: 1;

        .name {
          font-weight: bold;
          font-size: 20px;
        }

        .meta {
          color: #409EFF;
          p {
            margin: 0;
            cursor: pointer;
          }
        }
      }

      .setting-btn {
        margin-left: auto;
      }
    }
  }

  .content {
    height: 73vh;
    .main {
      padding: 0 30px 0;
      height: 62vh;
    }
  }

}
</style>
