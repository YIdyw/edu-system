// pages/order/order.js
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

  pay() {
    let data = {
      orderid : this.data.orderid
    }
    var list = ['支付宝', '微信', '银行卡']
    wx.showActionSheet({
      itemList: list,
      success (res) {
        data['type'] = list[res.tapIndex]
        console.log("data:",data)
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
              }, 1000)
            }, 0);
          }
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
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