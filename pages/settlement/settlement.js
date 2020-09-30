// pages/order/order.js
import {
  tobepaidOrder
} from '../../network/order'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    order: ''
  },

  pay() {
    console.log("getmoney")
  },
  _getorder(orderid){
    var userid = wx.getStorageSync('loginInfo').userid
    tobepaidOrder(userid).then(res =>{
      if(res.code==200){
        for(let i=0;i<res.data.orderItemVOList.length;i++){
          if(orderid==res.data.orderItemVOList[i].orderId){
            this.setData({
              order: res.data.orderItemVOList[i]
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