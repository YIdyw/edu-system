import request from './request.js'

// 获取全部机构
export function getAllOrganization() {
  return request({
    url: '/organizations/all',
    method: 'GET'
  });
}

export function relymgmt(data) {
  return request({
    url: '/teacher/organization/' + data.teaId,
    method: 'POST',
    data: data
  });
}

export function relyPorcess(data){
  return request({
    url: '/teacher/process',
    method: 'GET',
    data: data
  });
}