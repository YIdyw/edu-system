import request from './request.js'

// 身份证认证
export function getAuthID(data) {
  return request({
    url: '/AuthenticatedUser/idCardPhoto',
    method: 'POST',
    data: data
  })
}

// 增加认证用户
export function addAuthUser(data){
  return request({
    url: '/AuthenticatedUser',
    method: 'POST',
    data: data
  })
}

// 用户信息更改
export function userAuthed(data){
  return request({
    url: '/user',
    method: 'PUT',
    data: data
  })
}