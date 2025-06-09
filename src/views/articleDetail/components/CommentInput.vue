<template>
  <div class="comment-input">
    <el-input
      v-model="inputValue"
      type="textarea"
      :rows="3"
      :placeholder="replyTarget ? `回复 @${replyTarget.replyToUserName}...` : '输入你的评论...'"
    ></el-input>
    <el-button type="primary" @click="sendComment">发送</el-button>
    <el-button v-if="replyTarget" @click="cancelReply" type="text">取消回复</el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  replyTarget: Object
})
const emit = defineEmits(['send-comment'])

const inputValue = ref('')

watch(() => props.replyTarget, () => {
  inputValue.value = ''
})

const sendComment = () => {
  if (inputValue.value.trim()) {
    emit('send-comment', inputValue.value)
    inputValue.value = ''
  }
}
const cancelReply = () => {
  emit('send-comment', '') // 发送空内容，父组件可重置 replyTarget
  inputValue.value = ''
}
</script>

<style lang="scss">
.comment-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  .el-input {
    width: 100%;
  }
}
</style>
