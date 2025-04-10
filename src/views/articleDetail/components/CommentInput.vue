<template>
  <div class="comment-input">
    <el-input
      v-model="newComment"
      type="textarea"
      :rows="3"
      placeholder="输入你的评论..."
    ></el-input>
    <el-button type="primary" @click="sendComment">发送</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newComment = ref('');

const emit = defineEmits(['send-comment']);

const sendComment = () => {
  if (newComment.value.trim()) {
    emit('send-comment', newComment.value);
    newComment.value = '';
  }
};
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