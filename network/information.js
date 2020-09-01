import request from './request.js'

// 输入学生详细信息
export function infoIn(data) {
  return request({
    url: '/student/'+data.userid,
    method: 'POST',
    data: data
  })
} 

export function getStuInfo(data) {
  return request({
    url: '/student/'+data.userid,
    method: 'GET',
    data: data
  })
} 