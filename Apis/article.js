import request from '@/utlis/request'
export const getArticleById = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
// 添加收藏列表
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}
// 取消收藏列表
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 * 点赞
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: target
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
