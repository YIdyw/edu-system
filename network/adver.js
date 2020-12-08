import request from './request.js'

// 生成宣传二维码
export function adver(data){
  return request({
    url: '/appoint/'+data,
    method: 'GET',
  });
}

// 获取营销人员信息
export function info(data){
  return request({
    url: '/promote/userId?userId='+data,
    method: 'GET',
  });
}