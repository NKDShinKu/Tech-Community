<script setup>
import { Management, Promotion } from '@element-plus/icons-vue'

// 获取用户信息
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">

      <el-menu :default-active="$route.path" text-color="#000000" router>
        <el-menu-item index="/article-manage/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article-manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>文章管理中心</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  text-align: center;

  .el-aside-logo {
    height: 150px;
    background: url('@/assets/article.svg') no-repeat center / 120px auto;
  }

  .el-aside {
    background-color: #ffffff;
    padding: 20px 0;
    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      font-size: 14px;
      color: #2e2d2d;

      strong {
        color: #409eff;
      }
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #ffffff;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-main {
    padding: 0 20px;
    background-color: #f5f7fa;
    overflow-y: auto;
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #000000;
  }
}
</style>
