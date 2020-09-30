import request from './request.js'

// 根据userid获取该用户全部订单
export function getAllOrder(data){
  return request({
    url: '/order/'+data,
    method: 'GET',
  });
}

// 根据userid和订单id取消订单
export function cancelOrder(data){
  return request({
    url: '/order/'+data.userid+'/cancel'+data.orderid,
    method: 'PUT',
  });
}

// 根据userid查询已取消的订单
export function cancelledOrder(data){
  return request({
    url: '/order/'+data+'/cancelled',
    method: 'GET',
  });
}

// 根据userid查询已支付的订单
export function paidOrder(data){
  return request({
    url: '/order/'+data+'/paid',
    method: 'GET',
  });
}

// 根据userid查询未支付的订单
export function tobepaidOrder(data){
  return request({
    url: '/order/'+data+'/toBePaid',
    method: 'GET',
  });
}