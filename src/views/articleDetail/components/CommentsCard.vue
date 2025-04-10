<script setup>

import { ref, computed } from 'vue';
import CommentInput from './CommentInput.vue';

const visibleDrawer = ref(false)

// 菜单打开与判断
const open = async () => {
  visibleDrawer.value = true
}
defineExpose({
  open
})



// 模拟评论数据
const comments = ref([
  {
    id: 1,
    content: '这是一个很棒的文章！',
    likes: 10,
    replies: 2,
    timestamp: new Date('2023-01-01').getTime(),
  },
  {
    id: 2,
    content: '感谢分享，1学到了很多。',
    likes: 5,
    replies: 0,
    timestamp: new Date('2023-01-02').getTime(),
  },
  {
    id: 3,
    content: '期待更多类似的内容。',
    likes: 15,
    replies: 3,
    timestamp: new Date('2023-01-03').getTime(),
  },
]);

// 当前排序方式
const sortType = ref('latest'); // 'latest' 或 'hot'

// 根据排序方式计算排序后的评论列表
const sortedComments = computed(() => {
  if (sortType.value === 'hot') {
    return [...comments.value].sort((a, b) => b.likes - a.likes);
  } else {
    return [...comments.value].sort((a, b) => b.timestamp - a.timestamp);
  }
});

// 发送新评论
const handleSendComment = (newComment) => {
  comments.value.unshift({
    id: comments.value.length + 1,
    content: newComment,
    likes: 0,
    replies: 0,
    timestamp: Date.now(),
  });
};

// 点赞评论
const handleLikeComment = (commentId) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    comment.likes += 1;
  }
};
</script>

<template>
  <!-- 抽屉 -->
  <el-drawer v-model="visibleDrawer" :title="`评论 ${721}`" direction="rtl" size="40%">
    <div class="comment-section">
      <!-- 评论输入区 -->
      <CommentInput @send-comment="handleSendComment" />

      <!-- 评论列表 -->
      <div class="comment-list">
        <el-tabs v-model="sortType" @tab-click="handleSortChange">
          <el-tab-pane label="最新" name="latest"></el-tab-pane>
          <el-tab-pane label="热度" name="hot"></el-tab-pane>
        </el-tabs>
        <div v-for="comment in sortedComments" :key="comment.id" class="comment-item">
          <p>{{ comment.content }}</p>
          <div class="comment-actions">
            <el-button type="text" @click="handleLikeComment(comment.id)">
              <Icon icon="prime:thumbs-up-fill" /> {{ comment.likes }}
            </el-button>
            <el-button type="text">
              <Icon icon="mdi-light:comment-text" /> {{ comment.replies }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.comment-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

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