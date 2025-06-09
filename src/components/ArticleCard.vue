<script setup>
import cardImg from '@/assets/card.jpg'

defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        title: '渐进式框架',
        time: '2024-07-21',
        desc: 'Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是很 diverse 的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：',
        img: cardImg,
        author: '二阶堂真红',
        views: '1000',
        likes: '100',
      }
    }
  }
})
</script>
<template>
  <div class="card">
<!--    打开新页面-->
    <RouterLink to="/detail/231">

      <div class="content">
        <h3 class="title">{{ data.title }}</h3>
        <div class="article">
          Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是很 diverse 的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：
        </div>
        <div class="information">
          <span class="time">
            <Icon icon="material-symbols-light:date-range-outline-sharp" />
            {{ data.date }}
          </span>
          <span class="author">
            <Icon icon="material-symbols:person-outline" />
            {{ data.author.username }}
          </span>
          <span class="views">
            <Icon icon="fluent-mdl2:view" />
            {{ data.views }}
          </span>
          <span class="likes">
            <Icon icon="prime:thumbs-up" />
            {{ data.likes }}
          </span>
        </div>
      </div>

      <div class="image">
        <img :src="cardImg" alt="" />
      </div>

    </RouterLink>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  backdrop-filter: blur(12px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;


  a {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .image {
    width: 170px;
    height: 170px;
    overflow: hidden;
    border-radius: 10px;


    img {
      transition: all 0.5s ease;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .content {
    flex: 1;
    color: #858a94;
    padding: 5px 15px;

    .information {
      display: flex;
      font-size: 13px;
      margin-top: 15px;

      span {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }

      svg {
        width: 16px;
        height: 16px;
        margin-right: 2px;
      }
    }

    .title {
      font-size: 18px;
      margin-bottom: 8px;
      color: #1f7ede;
      text-align: center;
    }

    .article {
      margin-top: 6px;
      font-size: 14px;
      line-height: 26px;
      overflow: hidden;
      max-height: 80px;
    }
  }
}

.card:hover {
  transform: translateY(-3px) translateZ(3px);
  box-shadow: 0px 0px 15px -5px rgba(38, 120, 213);

  .image img {
    transform: scale(1.05);
  }
}
</style>
