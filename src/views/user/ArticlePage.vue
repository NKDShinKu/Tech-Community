<script setup>
import ArticleCard from '@/components/ArticleCard.vue'
import { ref } from 'vue'
const count = ref(10)
const load = () => {
  count.value += 2
  console.log('dasdasdas')
}
</script>

<template>
  <div v-infinite-scroll="load" class="container">
    <div class="loading" v-if="count.value === 0">加载中...</div>
    <ArticleCard v-for="i in count" :key="i" />
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
