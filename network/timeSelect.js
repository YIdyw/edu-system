import request from './request.js'

export function timeSelect(data) {
  return request({
    url: '/teacher/' + data.teaId + '/freetime',
    method: 'POST',
    data: data.freeTimes
  })
}

export function getFreeTime(teaId){
  return request({
    url: '/teacher/' + teaId + '/freetime',
    method: 'GET'
  })
}

export function updateTime(data) {
  return request({
    url: '/teacher/' + data.teaId + '/freetime',
    method: 'PUT',
    data: data.freeTimes
  })
}