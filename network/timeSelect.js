import request from './request.js'

export function timeSelect(data) {
  return request({
    url: '/teacher/' + data.teaId + '/freetime',
    method: 'POST',
    data: data.freeTimes
  })
}

//根据教师id查询空闲时间
export function getFreeTime(data) {
  return request({
    url: '/teacher/'+data+'/freetime',
    method: 'GET',
  })
} 

//根据教师id添加空闲时间
export function addTime(data) {
  return request({
    url: '/teacher/'+data.teaid+'/freetime',
    method: 'POST',
    data: data
  })
} 

//根据教师id更新空闲时间
export function updateTime(data) {
  return request({
    url: '/teacher/update/freetime',
    method: 'PUT',
    data: data
  })
} 

//根据教师id初始化空闲时间
export function cancelTime(data) {
  return request({
    url: '/teacher/'+data+'/freeTime',
    method: 'POST',
  })
} 
