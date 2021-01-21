import request from './request.js'

// 添加子用户
export function addChild(data) {
  return request({
    url: '/subuser/add',
    method: 'POST',
    data: data
  })
} 

// 获取所有子用户
export function getAllChild(data) {
  return request({
    url: '/subuser/find/'+data,
    method: 'GET',
  })
} 

// 使用子用户购买课程商品
export function childBuyCourse(data) {
  return request({
    url: '/subuser/buycourse',
    method: 'POST',
    data: data
  })
} 