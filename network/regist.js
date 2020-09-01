import request from './request.js'

export function registInfo(data) {
  return request({
    url: '/user',
    method: 'POST',
    data: data
  })
} 