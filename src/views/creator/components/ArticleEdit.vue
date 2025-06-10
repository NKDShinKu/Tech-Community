<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { AddArticleService, GetArticleDetailService } from '@/api/article.js'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {  userUploadFileService } from '@/api/user.js'

// 默认数据
const defaultForm = {
  title: '',
  category: '',
  coverImage: '',
  content: '',
  description: ''
}
const visibleDrawer = ref(false)
const formModel = ref({ ...defaultForm })
const editorRef = ref()
function getDescriptionFromContent(content, length = 50) {
  // 去除 HTML 标签
  const text = content.replace(/<[^>]+>/g, '')
  // 截取前 length 个字符
  return text.slice(0, length)
}
// 菜单打开与判断
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑回显')
    const res = await GetArticleDetailService(row.id)
    formModel.value = res.data
    formModel.value.category = res.data.category.categoryId
  } else {
    console.log('添加功能')
    formModel.value = { ...defaultForm }
    await nextTick()
    editorRef.value.setHTML('')
  }
}

// 图片上传逻辑
const onUploadFile = async (uploadFile) => {
  try {
    const res = await userUploadFileService(uploadFile)
    formModel.value.coverImage = res.data.cdnUrl
    ElMessage({ type: 'success', message: '图片上传成功' })
  } catch (error) {
    ElMessage({ type: 'error', message: '图片上传失败' })
  }
}
defineExpose({
  open
})

// 发布文章
const emit = defineEmits(['success'])
const onPublish = async () => {

  if (formModel.value.id) {
    console.log('编辑操作')
    formModel.value.description = getDescriptionFromContent(formModel.value.content, 50)
    await AddArticleService(formModel.value)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加请求
    formModel.value.description = getDescriptionFromContent(formModel.value.content, 50)
    await AddArticleService(formModel.value)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

</script>

<template>
  <!-- 抽屉 -->
  <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="50%">
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <channel-select v-model="formModel.category" width="10vw"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onUploadFile">
          <img alt="封面" v-if="formModel.coverImage" :src="formModel.coverImage" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor theme="snow" v-model:content="formModel.content" contentType="html" ref="editorRef" toolbar="essential"> </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish" type="primary">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      min-width: 178px;
      height: 178px;
      display: block;
    }
    img {
      width: 100%;
      object-fit: cover;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
