import request from './request.js'

// 获取用户信息
export function getLoginInfo(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: data
  })
} 

// 向后端发送code
export function code(data) {
  return request({
    url: '/weixin/'+data.userid+'/'+data.code,
    method: 'GET',
  })
} 

// 使用手机验证码登录
export function loginPhone(data) {
  return request({
    url: '/user/loginBySms',
    method: 'POST',
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