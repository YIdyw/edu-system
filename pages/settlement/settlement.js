// pages/order/order.js
// 订单支付页面
import {
  tobepaidOrder
} from '../../network/order'
import {
  payfor
} from '../../network/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    order: ''
  },

  // 确认支付页面，并在用户点击确定后，调用支付接口(暂未测试)
  pay() {
    let data = {
      orderId : this.data.orderid,
      payType : '微信'
    }
    wx.showModal({
      cancelColor: 'cancelColor',
      content : '请您选择是否进行支付？',
      title : "确认是否支付",
      success(res) {
        if(res.confirm){
          payfor(data).then(res => {
            console.log(res.data)
            if(res.code==200){
              setTimeout(() => {
                wx.showToast({
                  title: '支付成功！',
                  icon: "success",
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 3000)
              }, 0);
            }
          })
        }
      }
    })
  },

  // 根据当前用户的尚未支付订单列表以及所点击的订单 id 获取当前点击的订单的具体信息
  // 注：此处的订单 id 来自于订单列表页面的点击跳转传参
  _getorder(orderid){
    var userid = wx.getStorageSync('loginInfo').userid
    tobepaidOrder(userid).then(res =>{
      if(res.code==200){
        console.log(res.data)
        for(let i=0;i<res.data.orderListVOS.length;i++){
          if(orderid==res.data.orderListVOS[i].orderId){
            this.setData({
              order: res.data.orderListVOS[i]
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      orderid: options.orderid
    })
    that._getorder(options.orderid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
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