<template>
  <div class="comment-list">
    <el-tabs v-model="sortType" @tab-click="handleSortChange">
      <el-tab-pane label="最新" name="latest"></el-tab-pane>
      <el-tab-pane label="热度" name="hot"></el-tab-pane>
    </el-tabs>
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <p>{{ comment.content }}</p>
      <div class="comment-actions">
        <el-button type="text" @click="likeComment(comment.id)">
          <i class="el-icon-thumb"></i> {{ comment.likes }}
        </el-button>
        <el-button type="text">
          <i class="el-icon-chat-dot-round"></i> {{ comment.replies }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  comments: Array,
});

const emit = defineEmits(['like-comment']);

const sortType = ref('hot');

const handleSortChange = () => {

};

const likeComment = (commentId) => {
  emit('like-comment', commentId);
};
</script>

<style lang="scss">
.comment-list {
  .comment-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .comment-actions {
    display: flex;
    gap: 10px;
  }
}
</style>