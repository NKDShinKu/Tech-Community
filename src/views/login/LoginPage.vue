<script setup>
import { User, Lock, Folder } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
// 默认是否是注册页面
const isRegister = ref(false)
// 表单对象
const formModel = ref({
  username: '',
  email: '',
  password: '',
  repassword: ''
})
// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名必须是3-10位的字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱格式',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 注册前校验
const form = ref()
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  // 切换到登录
  isRegister.value = false
}

// 切换重置输入内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    email: '',
    password: '',
    repassword: ''
  }
})

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  console.log(res.data.data)
  userStore.setToken(res.data.data.token, res.data.data.refreshToken, res.data.data.userInfo.id)
  userStore.getUser(res.data.data.userInfo.id)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <!-- 【需求】注册页面基本校验

1. 用户名非空，长度校验5-10位
2. 密码非空，长度校验6-15位
3. 再次输入密码，非空，长度校验6-15位

再次输入密码需要自定义校验规则，和密码框值一致 -->
  <el-row class="login-page">
    <!--  返回主页  -->
    <el-col :span="8" class="form">
      <!-- 注册模块 -->
      <el-form :model="formModel" ref="form" size="large" autocomplete="off" v-if="isRegister" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
<!--        邮箱-->
        <el-form-item prop="email">
          <el-input v-model="formModel.email" :prefix-icon="Folder" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space> 注册 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="router.push('/')" class="button">返回主页</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> 登录 → </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录模块 -->
      <el-form :rules="rules" :model="formModel" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formModel.password" name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="router.push('/')" class="button">返回主页</el-button>
        </el-form-item>        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  //渐变色背景
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    margin: auto auto;
    background-color: #fff;
    padding: 20px 100px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);

    border-radius: 10px;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
