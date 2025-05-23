<script setup>
import { Management, Promotion, HomeFilled } from '@element-plus/icons-vue'

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

    <el-card class="aside">
      <el-aside width="200px">

        <el-menu :default-active="$route.path" text-color="#000000" router>
          <el-menu-item index="/creator/overview">
            <el-icon>
              <HomeFilled />
            </el-icon>
            总览
          </el-menu-item>
          <el-menu-item index="/creator/channel">
            <el-icon>
              <Management />
            </el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/creator/manage">
            <el-icon>
              <Promotion />
            </el-icon>
            <span>文章管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-card>

    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="bouncing-text">
        <span>创</span><span>作</span><span>中</span><span>心</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 90vh;
  text-align: center;
  width: 1350px;
  margin: 5rem auto 0;
  .el-aside-logo {
    height: 150px;
    background: url('@/assets/article.svg') no-repeat center / 120px auto;
  }

  .aside {
    height: 88vh;
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
    overflow-y: auto;
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}

.bouncing-text {
  display: inline-block;
  font-size: 16px;
  color: #1c81c7;
  animation: bounce 0.5s infinite alternate;
}

.bouncing-text span {
  display: inline-block;
  animation: bounce-sequence 1s infinite;
}

.bouncing-text span:nth-child(1) {
  animation-delay: 0s;
}

.bouncing-text span:nth-child(2) {
  animation-delay: 0.3s;
}

.bouncing-text span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce-sequence {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
