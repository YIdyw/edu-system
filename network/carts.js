import request from './request.js'

// 根据userid获取该用户全部商品
export function getAll(data){
  return request({
    url: '/shoppingCart',
    method: 'POST',
    data: {
      userId: data
    }
  });
}

// 根据userid和商品id修改状态
export function updateMer(data){
  return request({
    url: '/shoppingCart',
    method: 'PUT',
    data: {
      cartState: data.cartState,
      userId: data.userid,
      merId: data.merid
    }
  });
}

// 根据userid和商品id删除指定商品
export function deleteMer(data){
  return request({
    url: '/shoppingCart',
    method: 'DELETE',
    data:{
      userId: data.userid,
      merId: [data.merid]
    }
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


// 根据userid将选择的商品生成订单
export function makeOrder(data){
  return request({
    url: '/shoppingCart/order/'+data.userid,
    method: 'POST',
  });
}

// 根据userid选择的merid加入购物车
export function addCart(data){
  return request({
    url: '/shoppingCart/'+data.userid+'/'+data.merid,
    method: 'POST',
  });
}

// 根据courseid找到merid
export function findmerid(data){
  return request({
    url: '/courseMer/find/courseId/'+data,
    method: 'GET',
  });
}

// 子用户购买课程（生成订单）
export function childMakeOrder(data){
  return request({
    url: '/subuser/buycourse',
    method: 'POST',
    data: data
  });
}