<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from './components/ArticleCard.vue'

const route = useRoute()

const categoryList = [
  { id: '', name: '全部' },
  { id: '1', name: '生活相关' },
  { id: '2', name: '后端' },
  { id: '3', name: '网络' },
  { id: '4', name: '前端' },
  { id: '5', name: '算法' },
  { id: '6', name: '计算机' },
  { id: '7', name: '数据库' }
]

// 从路由中获取 id（比如 /article/2）
const categoryId = computed(() => String(route.params.id))
// 根据 id 查找对应的分类名称
const categoryName = computed(() => {
  const category = categoryList.find((item) => item.id === categoryId.value)
  return category ? category.name : '未知分类'
})
</script>

<template>
  <div class="container">
    <!-- 标题 -->
    <h2 class="title">{{ categoryName }}</h2>
    <div class="loading" v-if="loading">加载中...</div>
    <ArticleCard v-for="i in 10"   :key="i"></ArticleCard>
  </div>
</template>
<style scoped>
.container {
  margin: 30px 30px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;

  .loading{
    text-align: center;
    font-size: 20px;
    margin-top: 30%;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2280de;
    text-align: center;
    font-size: 24px;
    margin: 20px 0;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 2px;
      background: #2280de;
      margin: 0 15px;
    }
  }
}
</style>
