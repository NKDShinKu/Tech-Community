import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => request.get('/cate')
// 添加文章分类
export const artAddChannelService = (data) => request.post('/cate', data)
// 编辑文章分类
export const artEditChannelService = ({categoryId, categoryName}) => request.put(`/cate/${categoryId}`, { categoryName })
// 删除文章分类
export const artDelChannelService = (id) =>
  request.delete(`/cate/${id}`)

// 新增文章
export const AddArticleService = (data) =>
  request.post('/posts', data)

// 获取个人文章列表
export const GetArticlesService = () =>
  request.get('/posts/my')

// 删除文章
export const DelArticleService = (id) =>
  request.delete(`/posts/${id}`)

// 获取文章列表
export const GetArticleListService = ({ page, limit }) =>
  request.get('/posts/list/approved', { params: { page, limit } })

// 查看文章详情
export const GetArticleDetailService = (id) =>
  request.get(`/posts/${id}`)

// 添加收藏 /user-favorites/toggle
export const AddFavoriteService = (data) =>
  request.post(`/user-favorites/toggle`, data)

// 获取收藏/user-favorites/detailed
export const GetFavoriteService = () =>
  request.get('/user-favorites/detailed')

// 获取浏览历史/user-history/detailed
export const GetHistoryService = () =>
  request.get('/user-history/detailed')

// 清空浏览历史/user-history/clear post
export const ClearHistoryService = () =>
  request.post('/user-history/clear')
