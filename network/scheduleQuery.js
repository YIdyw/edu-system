import request from './request.js'

export function scheduleQuery(data) {
  return request({
    url: '/course/wxSyllabus',
    method: 'POST',
    data: data
  })
} 