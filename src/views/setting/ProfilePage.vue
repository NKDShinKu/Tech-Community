<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService, userUploadFileService } from '@/api/user'
import { Plus, Upload } from '@element-plus/icons-vue'
const {
  userInfo,
  getUser
} = useUserStore()

const loading = ref(false)
const user = ref({
  username: userInfo.username,
  email: userInfo.email,
  avatar: userInfo.avatar
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '用户名必须是3-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const formRef = ref()
const onSubmit = async () => {
  loading.value = true
  try {
    const valid = await formRef.value.validate()
    if (valid) {
      await userUpdateInfoService(user.value)
      await getUser(userStore.userId)
      ElMessage.success('修改成功')
    }
  } catch (error) {
    ElMessage.error('修改失败，请检查输入')
  } finally {
    loading.value = false
  }
}


const userStore = useUserStore()

const uploadRef = ref()
const imgUrl = ref(userStore.userInfo.avatar || '')
const nowFile = ref(null)
const onUploadFile = (file) => {
  const reader = new FileReader()
  nowFile.value = file
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
// 上传头像
const onUpdateAvatar = async () => {
  loading.value = true
  try {
    const res = await userUploadFileService(nowFile.value)
    user.value = {
      ...user.value,
      avatar: res.data.cdnUrl,
      id: userStore.userId
    }
    await userUpdateInfoService(user.value)
    await userStore.getUser(userStore.userId)
    ElMessage({ type: 'success', message: '更换头像成功' })
  } catch (error) {
    ElMessage({ type: 'error', message: '更换头像失败' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <page-container v-loading="loading" title="个人信息">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="user"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="avatar-area" :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="150" />
        </el-upload>

        <div class="btn">
          <el-button
            @click="uploadRef.$el.querySelector('input').click()"
            type="primary"
            :icon="Plus"
          >
            选择图片
          </el-button>
          <el-button
            @click="onUpdateAvatar"
            type="success"
            :icon="Upload"
          >
            上传头像
          </el-button>
        </div>

      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn {
    margin-top: 20px;
  }
}

.avatar-uploader {


  :deep() {
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      text-align: center;
    }
  }
}
</style>