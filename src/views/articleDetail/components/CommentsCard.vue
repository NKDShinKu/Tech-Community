<script setup>

import { ref, computed, watch } from 'vue';
import CommentInput from './CommentInput.vue';
import CommentList from './CommentList.vue';
import { getCommentsService, createCommentService } from '@/api/comments.js';
import { useUserStore } from '@/stores/index.js'

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
});

const visibleDrawer = ref(false)
const comments = ref([])
const loading = ref(false)
const sortType = ref('latest') // 'latest' 或 'hot'
const replyTarget = ref(null) // 当前回复对象

const userStore = useUserStore()

// 打开抽屉时加载评论
const open = async () => {
  visibleDrawer.value = true
  await fetchComments()
}
defineExpose({ open })

// 获取并处理评论数据
const fetchComments = async () => {
  loading.value = true
  try {
    const res = await getCommentsService(props.postId)
    comments.value = flattenComments(res.data.list || [])
  } finally {
    loading.value = false
  }
}

// 二级扁平化处理
function flattenComments(list) {
  return list.map(top => {
    const children = []
    function collect(child, parentUser) {
      if (!child) return
      // 只允许一层嵌套，超出部分平铺到children
      if (child.children && child.children.length > 0) {
        child.children.forEach(grand => {
          // 超过2层的回复，内容前加@用户名
          if (grand.parentId !== top.id) {
            children.push({
              ...grand,
              content: `@${grand.replyToUser?.username || ''} ${grand.content}`,
              isFlat: true
            })
            // 递归收集更深层
            if (grand.children && grand.children.length > 0) {
              grand.children.forEach(g => collect(g, grand.user))
            }
          } else {
            children.push({ ...grand, isFlat: false })
            if (grand.children && grand.children.length > 0) {
              grand.children.forEach(g => collect(g, grand.user))
            }
          }
        })
      }
    }
    // 只保留第一层和第二层
    if (top.children && top.children.length > 0) {
      top.children.forEach(child => {
        children.push({ ...child, isFlat: false })
        if (child.children && child.children.length > 0) {
          child.children.forEach(grand => collect(grand, child.user))
        }
      })
    }
    return { ...top, children }
  })
}

// 排序
const sortedComments = computed(() => {
  const arr = [...comments.value]
  if (sortType.value === 'hot') {
    arr.sort((a, b) => b.likeCount - a.likeCount)
  } else {
    arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  return arr
})

// 发送评论/回复
const handleSendComment = async (content) => {
  if (!content) return
  const data = {
    postId: props.postId,
    content,
    userId: userStore.userId
  }
  if (replyTarget.value) {
    data.parentId = replyTarget.value.parentId
    data.replyToUserId = replyTarget.value.replyToUserId
  }
  await createCommentService(data)
  replyTarget.value = null
  await fetchComments()
}

// 回复按钮
const handleReply = (comment) => {
  replyTarget.value = {
    parentId: comment.parentId || comment.id,
    replyToUserId: comment.user?.id,
    replyToUserName: comment.user?.username
  }
}

// 监听postId变化自动刷新
watch(() => props.postId, fetchComments)
</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="`评论`" direction="rtl" size="40%">
    <div class="comment-section">
      <CommentInput @send-comment="handleSendComment" :replyTarget="replyTarget" />
      <CommentList
        :comments="sortedComments"
        @reply="handleReply"
        @like-comment="handleLikeComment"
      />
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
