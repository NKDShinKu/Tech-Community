<script setup>
import { ref, onMounted } from 'vue'
import { GetHistoryService} from '@/api/article.js'
import ArticleCard from '@/components/ArticleCard.vue'

const favoriteList = ref([])
const getFavoriteList = async () => {
  const res = await GetHistoryService()
  console.log('收藏列表:', res.data)
  favoriteList.value = res.data
}

onMounted(() => {
  getFavoriteList()
})
</script>

<template>
  <div class="container">
    <ArticleCard v-for="i in favoriteList" :data = i :key="i" />
<!--    空状态-->
    <div v-if="!favoriteList.length" class="loading">
      <p>暂无浏览记录</p>
    </div>
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