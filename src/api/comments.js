import request from '@/utils/request'

// 获取评论列表
export const getCommentsService = (postId) =>
  request.get('/comments', { params: { postId } })

// 新增评论/回复
export const createCommentService = (data) =>
  request.post('/comments', data)

