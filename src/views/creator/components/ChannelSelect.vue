<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String,
    default: '10vw'
  }
})

const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.categories
}
getChannelList()
</script>
<template>
  <el-select :style="{ width }" placeholder="请选择" :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)">
    <el-option v-for="channel in channelList" :key="channel.id" :label="channel.categoryName"
      :value="channel.categoryId"></el-option>
  </el-select>
</template>
