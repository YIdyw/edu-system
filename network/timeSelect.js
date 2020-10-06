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
    url: '/teacher/'+data.id+'/freetime',
    method: 'GET',
    data: data.flag
  })
} 

//根据教师id更新空闲时间
export function updateTime(data) {
  return request({
    url: '/teacher/'+data.id+'/freetime',
    method: 'POST',
    data: data.flag
  })
} 
