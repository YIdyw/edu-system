import request from './request.js'

export function signRecord(data) {
  return request({
    url: '/course/history',
    method: 'POST',
    data: data
  })
}
