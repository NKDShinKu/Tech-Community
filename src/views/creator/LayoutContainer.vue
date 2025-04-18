<script setup>
import { Management, Promotion, UserFilled, User, Crop, EditPen, SwitchButton, CaretBottom } from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'

// 获取用户信息
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

// 右上角用户菜单点击事件
const router = useRouter()
const onCommand = async (command) => {
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

// 退出登录
const onLogout = async () => {
  await ElMessageBox.confirm('你确认退出登录吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  userStore.removeToken()
  userStore.setUser({})
  router.push(`/login`)
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <router-link class="back-to-home" to="/">
        <el-button  type="primary">返回主页</el-button>
      </router-link>

      <el-menu :default-active="$route.path" text-color="#000000" router>
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="name">
          用户：<strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
        </div>
        <!-- 注册点击事件 -->
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>文章管理系统</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  text-align: center;

  .back-to-home{
    display: block;
    margin: 23px auto;
  }

  .el-aside-logo {
    height: 150px;
    background: url('@/assets/article.svg') no-repeat center / 120px auto;
  }

  .el-aside {
    background-color: #ffffff;

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

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
