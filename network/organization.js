import request from './request.js'

// 获取全部机构
export function getAllOrganization() {
  return request({
    url: '/organizations/all',
    method: 'GET'
  });
}

//教师进行挂靠
export function relymgmt(data) {
  return request({
    url: '/teacher/organization/'+data.orgId+ '?teaId=' + data.teaId,
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

//教师取消挂靠
export function deleterely(data){
  return request({
    url: '/teacher/organization/' + data,
    method: 'DELETE',
  });
}