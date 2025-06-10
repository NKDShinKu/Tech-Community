<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import { GetArticlesService } from '@/api/article.js'
import { ref } from 'vue'

const articleList = ref([])

const getArticleList = async () => {
  const res = await GetArticlesService()
  console.log('文章列表:', res.data)
  articleList.value = res.data
}
getArticleList()
</script>

<template>
  <div class="container">
    <ArticleCard v-for="i in articleList" :data = i :key="i" />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill);
  gap: 15px;
  height: 62vh;
  overflow: auto;
  .loading {
    text-align: center;
    font-size: 20px;
    margin-top: 30%;
  }
}
</style>
