import request from './request.js'

// 生成宣传二维码
export function adver(data){
  return request({
    url: '/appoint/'+data,
    method: 'GET',
  });
}