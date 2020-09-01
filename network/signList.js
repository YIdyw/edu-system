import request from './request.js'

export function signList(data) {
  return request({
    url: '/course/' + data.courseId + '/signIn/roster',
    method: 'GET',
    data: data
  })
}
