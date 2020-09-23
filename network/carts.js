import request from './request.js'

// 根据userid获取该用户全部商品
export function getNotpaidOrder(data){
  return request({
    url: '/shoppingCart/'+data,
    method: 'GET',
  });
}

// 根据userid和商品id选中指定商品
export function selectMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/'+data.merid+'/select',
    method: 'PUT',
  });
}

// 根据userid和商品id删除指定商品
export function deleteMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/'+data.merid,
    method: 'DELETE',
  });
}

// 根据userid和商品id取消选中指定商品
export function unselectMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/'+data.merid+'/unSelect',
    method: 'PUT',
  });
}

// 根据userid全选
export function selectAllMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/selectAll',
    method: 'PUT',
  });
}

// 根据userid取消全选
export function unselectAllMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/unSelectAll',
    method: 'PUT',
  });
}

// 根据userid取消全选
export function unselectAllMer(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/unSelectAll',
    method: 'PUT',
  });
}

// 根据userid将选择的商品生成订单
export function makeOrder(data){
  return request({
    url: '/shoppingCart/order/'+data.userid,
    method: 'POST',
  });
}