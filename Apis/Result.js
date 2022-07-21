import request from '@/utlis/request'
export const getSearchResult = (params) => {
  return request({
    url: '/v1_0/search',
    params // 将对象全部传过来
  })
}
