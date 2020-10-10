import request from './request.js'

// 获取用户信息
export function getCode(data) {
  return request({
    url: '/user/verifyCode',
    method: 'GET',
    data: data
  })
} 