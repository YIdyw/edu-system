import request from './request.js'

export function scheduleQuery(data) {
  return request({
    url: '/course/syllabus',
    method: 'POST',
    data: data
  })
} 