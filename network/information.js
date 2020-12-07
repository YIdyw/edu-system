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

//如果当前用户为学生或者家长的话，获取他所挂靠的机构
export function  getOrgNum(data) {
  return request({
    url: '/student/organizations/'+ data,
    method: 'GET',
  })
}