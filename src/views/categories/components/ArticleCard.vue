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
        img: cardImg
      }
    }
  }
})
</script>
<template>
  <div class="card">
<!--    打开新页面-->
    <RouterLink to="/detail/231">
      <div class="image">
        <img :src="cardImg" alt="" />
      </div>
      <div class="content">
        <div class="information">
          <span class="time">
            <svg
              t="1733314575100"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6763"
              width="200"
              height="200"
            >
              <path
                d="M128 358.8h768.1v50H128zM320.1 256c-13.8 0-25-11.2-25-25V123.2c0-13.8 11.2-25 25-25s25 11.2 25 25V231c0 13.8-11.2 25-25 25zM703.3 256c-13.8 0-25-11.2-25-25V123.2c0-13.8 11.2-25 25-25s25 11.2 25 25V231c0 13.8-11.2 25-25 25zM359.1 576.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM551.1 576.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM744.1 576.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM359.1 753.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM551.1 753.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM744.1 753.8h-78c-13.8 0-25-11.2-25-25s11.2-25 25-25h78c13.8 0 25 11.2 25 25s-11.2 25-25 25zM384.1 155h257v50h-257z"
                fill="#8a8a8a"
                p-id="6764"
              ></path>
              <path
                d="M876.8 155H769v50h107.7c0.6 0 1.2 0.7 1.2 1.2V877c0 0.6-0.7 1.2-1.2 1.2H149.2c-0.6 0-1.2-0.7-1.2-1.2V206.2c0-0.6 0.7-1.2 1.2-1.2H256v-50H149.2C121 155 98 178.1 98 206.2V877c0 28.2 23.1 51.2 51.2 51.2h727.5c28.2 0 51.2-23.1 51.2-51.2V206.2c0.1-28.1-23-51.2-51.1-51.2z"
                fill="#8a8a8a"
                p-id="6765"
              ></path>
            </svg>
            {{ data.time }}
          </span>
        </div>
        <h3 class="title">{{ data.title }}</h3>
        <div class="article">
          {{ data.desc }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 100%;
  height: 190px;
  background-color: #ffffff;
  backdrop-filter: blur(12px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  a {
    display: flex;
  }

  .image {
    width: 50%;
    height: 100%;
    overflow: hidden;

    img {
      transition: all 0.5s ease;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .content {
    width: 50%;
    color: #0c0c0c;
    padding: 10px 15px;

    .information {
      display: flex;
      justify-content: end;
      font-size: 13px;

      span {
        margin: 0 5px;
        display: flex;
        align-items: center;
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
      margin-top: 8px;
      text-align: center;
    }

    .article {
      margin-top: 6px;
      font-size: 14px;
      line-height: 26px;
      overflow: hidden;
      max-height: 104px;
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
