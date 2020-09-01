import request from './request.js'
//机构报名
export function orgInter(data) {
  return request({
    url: '/student/organization/'+data.orgId+'/'+data.userid,
    method: 'GET',
    
  })
} 

//发起试听请求
export function listenClass(data) {
  return request({
    url: '/student/'+data.studentId+'/coursetrial/'+data.courseId,
    method: 'POST',
    data:data
  })
}

//获取全部机构信息
export function getAllorg() {
  return request({
    url: '/organizations/all',
    method: 'GET'
  })
}

//取消试听
export function deleteListen(data) {
  return request({
    url: '/student/'+data.userid+'/coursetrial/'+data.courseId,
    method: 'DELETE',
    data:data
  })
}

//根据机构id获取机构详细信息
export function getOrgAllInfo(data) {
  return request({
    url: '/organization/'+data.orgid,
    method: 'GET'
  })
}

//根据机构id获取机构详细课程信息
export function getOrgCourse(data) {
  return request({
    url: '/course/' + data.orgId,
    method: 'GET'
  })
}

//根据机构id获取机构详细课程信息
export function idGetOrgCourse(data) {
  return request({
    url: '/course/' + data,
    method: 'GET'
  })
}