import '@/assets/main.scss'
import pinia from '@/stores/index'
import { Icon } from "@iconify/vue";
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册全局组件
// eslint-disable-next-line vue/multi-word-component-names
app.component('Icon', Icon)

app.use(pinia)
app.use(router)

app.mount('#app')
