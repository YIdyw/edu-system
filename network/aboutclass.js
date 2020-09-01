import request from './request.js'

// 查询我的机构
export function getMyorg(data) {
  return request({
    url: '/student/organizations/'+data.userid,
    method: 'GET',
  })
} 

//查询我的全部课程
export function getMyclass(data) {
  return request({
    url: '/student/'+data.userid+'/courses',
    method: 'GET',
  })
} 

//取消报名某机构
export function deleteOrg(data) {
  return request({
    url: '/student/organization/'+data.orgid+'/'+data.userid,
    method: 'DELETE',
  })
} 

//对课程进行签到
export function signIn(data) {
  return request({
    url: '/student/'+data.userid+'/course/'+data.courseid+'/sign',
    method: 'POST',
  })
} 

//获取已经开始且该学生尚未选修过的所有课程
export function getMyorgclass(data) {
  return request({
    url: '/student/'+data.id+'/'+data.userid+'/course/option',
    method: 'GET',
  })
} 

//提交选课申请
export function chooseClass(data) {
  return request({
    url: '/student/'+data.userid+'/course/'+data.courseid+'/application',
    method: 'POST',
  })
} 

//学生提交取消选修课程申请
export function deleteClass(data) {
  return request({
    url: '/student/'+data.userid+'/course/'+data.courseid,
    method: 'DELETE',
  })
} 

//获取某一机构学生的试听课程
export function getMylisten(data) {
  return request({
    url: '/student/'+data.orgid+'/'+data.userid+'/coursetrial',
    method: 'GET',
  })
} 

//学生对课程进行评价
export function estimateClass(data) {
  return request({
    url: '/添加课程评价',
    method: 'POST',
    data:data
  })
} 
//获取学生的试听课程
export function myListen(data) {
  return request({
    url: '/student/'+data.userid+'/coursetrial',
    method: 'GET',
  })
} 