<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'

const dialogVisible = ref(false)
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({
  open
})

// 输入规则配置
const formModel = ref({
  categoryName: ''
})
const rules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ]
}

const formRef = ref()
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  formModel.value.categoryId ? await artEditChannelService(formModel.value) : await artAddChannelService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.categoryId ? '编辑成功' : '添加成功'
  })
  emit('success')
  dialogVisible.value = false
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.categoryId ? '编辑分类' : '添加分类'" width="30%">
    <el-form :model="formModel" :rules="rules" label-width="100px" style="padding-right: 30px" ref="formRef">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="formModel.categoryName" minlength="1" maxlength="10" placeholder="请输入分类名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit" type="primary"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
