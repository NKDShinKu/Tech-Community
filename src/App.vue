<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <!-- 国际化处理 -->
  <el-config-provider :locale="zh">
    <router-view />
  </el-config-provider>

  <!-- <h3>{{ userStore.token }}</h3>
  <el-button @click="userStore.setToken('123131')" type="success"
    >登录</el-button
  >
  <el-button @click="userStore.removeToken()" type="info">退出</el-button> -->
</template>

<style scoped></style>
