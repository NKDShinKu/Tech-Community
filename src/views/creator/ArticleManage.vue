<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import ChannelSelect from '@/views/creator/components/ChannelSelect.vue'
import { GetArticlesService,  DelArticleService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from '@/views/creator/components/ArticleEdit.vue'
import { getTravelNoteStatus } from '@/utils/quickTag.js'

// 编辑、删除方法
const articleEditRef = ref()
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await DelArticleService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

const params = ref({
  pagenum: 1,
  pagesize: 5,
  categoryId: '',
  state: ''
})


// 获取数据
const articleList = ref([])
// 加载
const loading = ref(false)

const getArticleList = async () => {
  loading.value = true
  const res = await GetArticlesService()
  articleList.value = res.data
  total.value = res.data.length
  loading.value = false
}
getArticleList()

// 分页逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 根据params.categoryId对文章列表进行筛选
// 假设 articleList.value 是后端返回的全部数据
const filteredArticleList = computed(() => {
  // 先做筛选（如分类、状态），再分页
  let list = articleList.value.filter(article => {
    return (!params.value.categoryId || article.category.categoryId === params.value.categoryId) &&
      (!params.value.state || getTravelNoteStatus(Number(article.quickTag)) === params.value.state)
  })
  // 分页
  const start = (params.value.pagenum - 1) * params.value.pagesize
  const end = start + params.value.pagesize
  return list.slice(start, end)
})

const total = computed(() => {
  // 这里用筛选后的总数
  return articleList.value.filter(article => {
    return (!params.value.categoryId || article.category.categoryId === params.value.categoryId) &&
      (!params.value.state || getTravelNoteStatus(Number(article.quickTag)) === params.value.state)
  }).length
})
// 搜索和重置
// const onSearch = () => {
//   params.value.pagenum = 1
//   getArticleList()
// }

const onReset = () => {
  params.value.pagenum = 1
  params.value.categoryId = ''
  params.value.state = ''
  getArticleList()
}

// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}


</script>
<template>
  <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle()">发布文章</el-button>
    </template>
    <!-- 头部 -->
    <el-form style="display: flex; " inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.categoryId"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" style="width: 10vw" placeholder="请选择">
          <el-option label="已发布" value="approved"></el-option>
          <el-option label="待审核" value="pending"></el-option>
          <el-option label="未通过" value="rejected"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
<!--        <el-button @click="onSearch" type="primary">搜索</el-button>-->
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="filteredArticleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template #default="{ row }">
          {{ row.category?.categoryName || '未分类' }}
        </template>
      </el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag :type="getTravelNoteStatus(Number(row.quickTag)) === 'pending'? 'primary' : getTravelNoteStatus(Number(row.quickTag)) === 'approved' ? 'success' : 'danger'">{{ getTravelNoteStatus(Number(row.quickTag)) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 7]"
      layout="jumper,
      s total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>
