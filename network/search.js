import request from './request.js'

export function getSearch(data) {
  return request({
    url: '/organization?orgName='+data.getsearch,
    method: 'GET',
   
  })
} 

//第一次测试：调用机构接口来访问数据
export function getInstitute(){
  return request({
    url: '/organizations/all',
    method: 'GET',
  })
}

export function getDetail(url){
  return request({
    url: url,
    method: 'GET',
  })
}