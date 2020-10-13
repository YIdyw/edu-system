import request from './request.js'

export function signList(data) {
  return request({
    url: '/course/' + data.courseId + '/signIn/roster',
    method: 'GET',
    data: data
  })
}

//学生根据学生id和courseid进行签到
export function sign(data) {
  return request({
    url: '/student/' + data.userId + '/course/' + data.courseId +'/sign',
    method: 'POST',
  })
}