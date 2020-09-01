import request from './request.js'

// 获取课程信息
export function getCourseQuery(data) {
  return request({
    url: '/course/teacher/' + data.id,
    method: 'POST',
    data: data.info
  })
} 