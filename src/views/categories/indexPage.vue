<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from '../../components/ArticleCard.vue'
import { artGetChannelsService, GetArticleListService } from '@/api/article.js'

const route = useRoute()

const categoryList = ref([])
const articleList = ref([])

const getCategoryList = async () => {
  const res = await artGetChannelsService()
  categoryList.value = res.data.categories
}

const getArticleList = async (params) => {
  const res = await GetArticleListService(params)
  articleList.value = res.data.items
  console.log('文章列表:', res.data)
}

getArticleList({ page: 1, limit: 10 }) // 初始加载文章列表

getCategoryList()

// 从路由中获取 id（比如 /article/2）
const categoryId = computed(() => String(route.params.id))
// 根据 id 查找对应的分类名称
const categoryName = computed(() => {
  const category = categoryList.value.find((item) => String(item.categoryId) === categoryId.value)
  return category ? category.categoryName : '全部'
})
</script>

<template>
  <div class="container">
    <!-- 标题 -->
    <h2 class="title">{{ categoryName }}</h2>
    <div class="loading" v-if="loading">加载中...</div>
    <ArticleCard v-for="i in articleList" :data = i  :key="i"></ArticleCard>
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
