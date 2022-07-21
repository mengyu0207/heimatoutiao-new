import request from '@/utlis/request'
import storage from '@/utlis/storage'
/**
 *获取我的频道列表
 * @returns Promise
 */
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelsToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)

export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels/',
    method: 'PATH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
