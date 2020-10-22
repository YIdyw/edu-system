import request from './request.js'

// 根据订单编号以及支付方式进行付款
export function payfor(data){
  return request({
    url: '/payment/',
    method: 'PUT',
    data: data
  });
}