<script setup>
import { ref } from 'vue'
import commentsCard from './components/CommentsCard.vue'

const commentsCardRef = ref(null)
const liked = ref(false)
const favorited = ref(false)
const toggleLike = () => {
  liked.value = !liked.value
}
const toggleFavorite = () => {
  favorited.value = !favorited.value
}

const OpenComments = () => {
  commentsCardRef.value.open()
}





// 置顶功能
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }) // 平滑滚动到顶部
}
</script>
<template>

  <div class="main-container">
    <commentsCard ref="commentsCardRef"  />
    <!-- 左侧栏：点赞、评论、收藏按钮 -->
    <div class="left-column">
      <!-- 点赞 -->
      <div class="icon"><Icon icon="prime:thumbs-up-fill" class="icon-btn" :class="{ active: liked }" @click="toggleLike" /></div>

      <!-- 收藏 -->
      <div class="icon"><Icon icon="uim:favorite" class="icon-btn" :class="{ active: favorited }" @click="toggleFavorite" /></div>

      <!-- 评论 -->
      <div class="icon" @click="OpenComments" ><Icon icon="mdi-light:comment-text" class="icon-btn" /></div>

    </div>

    <!-- 中间栏：文章内容 -->
    <div class="middle-column">
      <h1>文章标题</h1>
      <p>这里是文章的主要内容区域，可以容纳任意长度的文本。左右两栏会随着滚动保持粘性定位。</p>
      <!-- 测试滚动效果的占位内容 -->
      <p v-for="i in 30" :key="i">占位段落 {{ i }}，模拟长文章内容。</p>
    </div>

    <!-- 右侧栏：作者信息 -->
    <div class="right-column">
      <el-card style="min-height: 300px">
        <h2>作者</h2>
        <p>作者姓名</p>
        <p>作者简介或相关信息。</p>
      </el-card>
    </div>

    <!-- 置顶按钮 -->
    <el-button class="back-to-top" @click="scrollToTop" circle>
      <Icon icon="emojione:top-arrow" style="font-size: 28px" />
    </el-button>
  </div>
</template>

<style lang="scss">
.main-container {
  display: flex; /* 使用 flexbox 实现三栏布局 */
  gap: 20px;
  min-height: 100vh; /* 确保容器高度足够支持粘性定位 */
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  .left-column {
    width: 100px; /* 左侧栏宽度，可调整 */
    position: sticky; /* 粘性定位 */
    top: 100px; /* 距离顶部 20px */
    display: flex;
    flex-direction: column; /* 按钮垂直排列 */
    gap: 30px; /* 按钮间距 */
    align-self: flex-start; /* 防止拉伸 */
    margin-top: 50px;
    .icon {
      width: 42px;
      height: 42px;
      background: #ffffff;
      box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        transform 0.2s ease,
        color 0.2s ease;
      &:hover {
        box-shadow: 0px 0px 15px -5px rgba(38, 120, 213);
      }
    }
    .icon-btn {
      font-size: 28px;
      color: #aaa;
      cursor: pointer;
      transition:
        transform 0.5s ease,
        color 0.5s ease;

      &:hover {
        transform: scale(1.2);
      }

      &:active {
        transform: scale(1.1);
      }

      &.active {
        color: #409eff; // 浅蓝色
      }
    }
  }

  .middle-column {
    flex: 1; /* 中间栏占据剩余空间 */
    padding: 20px; /* 内边距 */
    background: #ffffff;
    box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .right-column {
    width: 270px; /* 右侧栏宽度，可调整 */
    position: sticky; /* 粘性定位 */
    top: 70px; /* 距离顶部 20px */
    align-self: flex-start; /* 防止拉伸 */
  }

  .back-to-top {
    position: fixed; /* 固定定位 */
    padding: 20px;
    bottom: 30px; /* 距离底部 20px */
    right: 30px; /* 距离右侧 20px */
  }
}
</style>
