import request from './request.js'

// 根据订单编号以及支付方式进行付款
export function payfor(data){
  return request({
    url: '/payment/',
    method: 'PUT',
    data: data
  });
}

// 根据orderid支付该订单
export function payForOrder(data){
  return request({
    url: '/transaction/order/'+data.orderId+'/'+data.userId,
    method: 'POST',
  });
}