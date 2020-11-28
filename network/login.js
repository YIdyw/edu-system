import request from './request.js'

// 获取用户信息
export function getLoginInfo(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: data
  })
} 

// 向后端发送code
export function code(data) {
  return request({
    url: '/weixin/'+data.userid+'/'+data.code,
    method: 'GET',
  })
} 

// 使用手机验证码登录
export function loginPhone(data) {
  return request({
    url: '/user/loginBySms',
    method: 'POST',
    data: data
  })
}