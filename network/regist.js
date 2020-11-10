import request from './request.js'

export function registInfo(data) {
  return request({
    url: '/user',
    method: 'POST',
    data: data
  })
} 

export function updateInfo(data) {
  return request({
    url: '/user',
    method: 'PUT',
    data: data
  })
}

//校验用户名是否已被使用
export function account(data) {
  return request({
    url: '/user/account/repetition?account='+data,
    method: 'GET',
  })
}

//校验电话是否已被使用
export function phone(data) {
  return request({
    url: '/user/phone/repetition?phone='+data,
    method: 'GET',
  })
}