import request from './request.js'

// 获取验证码
export function getPhonecode(data) {
  return request({
    url: '/user/verifyCode?phone=' + data.phone,
    method: 'GET',
  })
} 
//检验验证码
export function checkCode(data) {
  return request({
    url: '/user/phoneVerification',
    method: 'POST',
    data: data
  })
}

//根据验证码修改密码
export function updatePassWord(data) {
  return request({
    url: '/user/findPwdBySms',
    method: 'POST',
    data: data
  })
}