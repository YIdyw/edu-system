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

// 获取学生计时课包的具体时间信息
export function cpinfo(data) {
  return request({
    url: '/coursepac/query-coursePac-time/'+data.userId,
    method: 'GET',
  })
}

// 计时课包学生约定上课时间
export function classTime(data) {
  return request({
    url: '/coursepac/time-student-teacher',
    method: 'POST',
    data: data
  })
}

// 教师获取学生的约课记录
export function queryAppointment(data) {
  return request({
    url: '/coursepac/query-appointment-teaId/'+data,
    method: 'GET',
  })
}

// 教师拒绝学生的约课请求
export function appointmentAgree1(data) {
  return request({
    url: '/coursepac/appointment/agree?isAgree='+data.isAgree+'&recordId='+data.recordId+'&remark='+data.remark,
    method: 'PUT',
  })
}

// 教师通过学生的约课请求
export function appointmentAgree2(data) {
  return request({
    url: '/coursepac/appointment/agree?isAgree='+data.isAgree+'&recordId='+data.recordId,
    method: 'PUT',
  })
}