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

// 获取测试验证码
export function getPhonecodeTest(data) {
  return request({
    url: '/user/verifyCodeTest?phone=' + data.phone,
    method: 'GET',
  })
} 

//检验测试验证码
export function checkCodeTest(data) {
  return request({
    url: '/user/phoneVerificationTest',
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

//根据旧密码修改密码
export function updatePwd(data) {
  return request({
    url: '/user/updatePwd',
    method: 'PUT',
    data: data
  })
}

//为用户设置新密码（最开始无密码）
export function setPassword(data) {
  return request({
    url: '/user/setNewPassword',
    method: 'POST',
    data: data
  })
}