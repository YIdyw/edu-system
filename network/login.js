import request from './request.js'

// 获取用户信息
export function getLoginInfo(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: data
  })
} 