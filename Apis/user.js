import request from '@/utlis/request'
import store from '@/store'

/**
 *登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *发送验证码
 * @param {String} mobile // 手机号
 * @returns promise
 */
export const sendCode1 = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/**
 * 添加关注
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
/**
 * 取消关注
 */
export const getUserProfile = (target) => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
    data: {
      target
    }
  })
}
/**
 *更新昵称
 */
export const UpdateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
/**
 *更新头像
 */
export const UpdateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
