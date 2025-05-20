<script setup>

import { EditPen, User } from '@element-plus/icons-vue'
</script>

<template>
  <el-container>

    <el-card>
      <el-aside width="200px">
        <router-link style="margin-left: 20px" to="/user/article">
          <el-button plain>返回个人主页</el-button>
        </router-link>

        <el-menu :default-active="$route.path"  router>
          <el-menu-item index="/user/setting/profile">
            <el-icon>
              <User />
            </el-icon>
            个人信息
          </el-menu-item>
          <el-menu-item index="/user/setting/password">
            <el-icon>
              <EditPen />
            </el-icon>
            修改密码
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-card>


      <el-main>
        <router-view></router-view>
      </el-main>

  </el-container>
</template>

<style scoped lang="scss">
.el-container{
  overflow: hidden;
  padding: 20px;
  width: 1300px;
  height: 90vh;
  margin: 5rem auto 0;
  .el-aside {
    .el-menu {
      margin-top: 20px;
      width: 200px;
      border-right: none;
      .el-menu-item {
        text-align: center;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }

  .el-main {
    padding: 0;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin-left: 10px;
  }
}
</style>