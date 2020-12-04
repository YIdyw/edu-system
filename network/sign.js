import request from './request.js'

export function signCourse(data) {
  return request({
    url: '/sign/'+data,
    method: 'GET',
  })
} 