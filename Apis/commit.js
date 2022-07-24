import request from '@/utlis/request'
// 获取评论或评论回复
export const getCommit = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 评论点赞
export const addCommentLiking = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export const DeleteCommentLiking = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 发布评论
export const PushComment = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
