import request from './request.js'

// 获取全部机构
export function getAllOrganization() {
  return request({
    url: '/organizations/all',
    method: 'POST',
    data: {}
  });
}

//教师进行挂靠
export function relymgmt(data) {
  return request({
    url: '/teacher/organization/'+data.orgId+ '/' + data.teaId,
    method: 'GET',
  });
}

//挂靠进度查询
export function relyPorcess(data){
  return request({
    url: '/teacher/process?userId=' + data.userid,
    method: 'GET',
  });
}

//教师申请解除挂靠
export function deleterely(data){
  return request({
    url: '/teacher/organization/' + data,
    method: 'PUT',
  });
}

//教师确认驳回信息
export function confirmreturn(data){
  return request({
    url: '/teacher/organization/confirm/' + data,
    method: 'PUT',
  });
}