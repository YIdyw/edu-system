import request from './request.js'

export function reservation(data) {
  return request({
    url: '/appoint/add',
    method: 'POST',
    data: data
  })
} 