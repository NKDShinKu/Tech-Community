<template>
  <div class="comment-list">
    <el-tabs v-model="sortType" @tab-click="handleSortChange">
      <el-tab-pane label="最新" name="latest"></el-tab-pane>
      <el-tab-pane label="热度" name="hot"></el-tab-pane>
    </el-tabs>
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <div class="comment-main">
        <span class="comment-user">{{ comment.user?.username || '匿名' }}</span>
        <span class="comment-content">{{ comment.content }}</span>
        <span class="comment-time">{{ formatTime(comment.createdAt) }}</span>
      </div>
      <div class="comment-actions">
        <el-button type="text" @click="$emit('like-comment', comment.id)">
          <i class="el-icon-thumb"></i> {{ comment.likeCount || 0 }}
        </el-button>
        <el-button type="text" @click="$emit('reply', comment)">
          <i class="el-icon-chat-dot-round"></i> 回复
        </el-button>
      </div>
      <!-- 二级评论 -->
      <div v-if="comment.children && comment.children.length" class="comment-children">
        <div v-for="child in comment.children" :key="child.id" class="comment-item child" :class="{ flat: child.isFlat }">
          <span class="comment-user">{{ child.user?.username || '匿名' }}</span>
          <span class="comment-content">{{ child.content }}</span>
          <span class="comment-time">{{ formatTime(child.createdAt) }}</span>
          <el-button type="text" @click="$emit('reply', child)">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatTime } from '@/utils/format';

const props = defineProps({
  comments: Array,
});

const sortType = computed(() => 'hot'); // 由父组件控制
const handleSortChange = () => {};
</script>

<style lang="scss">
.comment-list {
  .comment-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    &.child {
      margin-left: 32px;
      background: #fafbfc;
      &.flat {
        margin-left: 32px;
        background: #f5f7fa;
      }
    }
    .comment-main {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .comment-user {
      font-weight: bold;
      color: #409eff;
    }
    .comment-content {
      margin-left: 8px;
    }
    .comment-time {
      margin-left: auto;
      color: #aaa;
      font-size: 12px;
    }
    .comment-actions {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }
  }
  .comment-children {
    margin-left: 32px;
  }
}
</style>
