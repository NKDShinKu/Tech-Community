import request from '@/utils/request'

// 注册请求
export const userRegisterService = ({ username, email, password }) =>
  request.post('/auth/signup', { username, email, password })

// 登录请求
export const userLoginService = ({ username, password }) =>
  request.post('/auth/signin', { username, password })

// 获取用户信息
export const userGetInfoService = (id) => request.get(`/user/info/${id}`)


// 更新个人信息
export const userUpdateInfoService = ({ avatar, email, password, id }) =>
  request.post(`/user/update-info/?id=${id}`, { avatar, email, password })

// 上传文件
// user.js
export const userUploadFileService = (file) => {
  const formData = new FormData()
  formData.append('file', file.raw) // file.raw 是 el-upload 组件的原始文件对象
  return request.post('/storage/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
