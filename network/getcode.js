import request from './request.js'

// 获取用户信息
export function getCode(data) {
  return request({
    url: '/user/verifyCode',
    method: 'GET',
    data: data
  })
} 

// 获取用户是否有密码
export function getPassword(data) {
  return request({
    url: '/user/hasPassword',
    method: 'GET',
    data: data
  })
} 