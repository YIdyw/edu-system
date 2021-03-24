// pages/settledetail/settledetail.js
// 单个订单的详细信息
import {
  getorderdetail
} from '../../network/order'
Page({

 /**
  * 页面的初始数据
  */
 data: {
   orderid:'',
   orderdetail:''

 },

 // 此页面同支付订单页面，可以查看某个点击的订单详细信息
 // 支付订单页面增加了选择支付的功能
 _orderdetail:function(){
   var orderid = this.data.orderid
   getorderdetail(orderid).then(res =>{
     if(res.code==200){
       console.log("查询订单信息成功！",res.data)
       this.setData({
         orderdetail: res.data,
       })
     }
   })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   this.setData({
     orderid:options.orderid
   })
   this._orderdetail()

 },

 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {

 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {

 },

 /**
  * 生命周期函数--监听页面隐藏
  */
 onHide: function () {

 },

 /**
  * 生命周期函数--监听页面卸载
  */
 onUnload: function () {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh: function () {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom: function () {

 },

 /**
  * 用户点击右上角分享
  */
 onShareAppMessage: function () {

 }
}) 