import request from './request.js'

// 获取用户信息
export function classPage(data) {
  return request({
    url: '/course/syllabus',
    method: 'POST',
    data: data
  })
} 