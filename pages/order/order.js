// pages/order/order.js
// 全部订单的查询页面
import {
  cancelledOrder, paidOrder, tobepaidOrder
} from '../../network/order'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
    currtab: 0,
    paidOrder: '',
    tobepaidOrder: '',
    mercourse:[],
    cancelOrder: '',
    item: '',
    swipertab: [{ name: '已完成', index: 0 }, { name: '待付款', index: 1 }, { name: '已取消', index: 2 }],
    deviceH: 0
  },

  // 时间字符串拼接
  add_time(res) {
    console.log("1")
    for(var data of res) {
      data.orderTime = ' ' + data.orderTime.substring(0, 10) + ' ' + data.orderTime.substring(11, 19) 
    }
    return res;
  },

  //查询已完成订单
  _paidOrder(){
    var userid = wx.getStorageSync('loginInfo').userid
    paidOrder(userid).then(res =>{
      if(res.code==200){
        console.log("查询已完成订单成功！",res.data)
        this.add_time(res.data.orderListVOS)
        this.setData({
          paidOrder: res.data.orderListVOS
        })
      }
    })
  },
  

  //进入订单详情页面
  settledetail(e) {
    var index = e.currentTarget.dataset.menuindex
    console.log(index)
    wx.redirectTo({
      url: '../settledetail/settledetail?orderid='+this.data.cancelOrder[index].orderId,
    })
  },
  settledetail2(e) {
    var index = e.currentTarget.dataset.menuindex
    console.log(index)
    wx.redirectTo({
      url: '../settledetail/settledetail?orderid='+this.data.paidOrder[index].orderId,
    })
  },
  //进入订单结算页面
  settlement(e) {
    var index = e.currentTarget.dataset.menuindex
    console.log(index)
    wx.redirectTo({
      url: '../settlement/settlement?orderid='+this.data.tobepaidOrder[index].orderId,
    })
  },
  //查询未支付订单
    _tobepaidOrder(){
      var userid = wx.getStorageSync('loginInfo').userid
      tobepaidOrder(userid).then(res =>{
        if(res.code==200){
          console.log("查询未支付订单成功！",res.data)
          this.add_time(res.data.orderListVOS)
          this.setData({
            tobepaidOrder: res.data.orderListVOS,
          })
        }
      })
    },
//查询已取消订单
  _cancelOrder(){
    var userid = wx.getStorageSync('loginInfo').userid
    cancelledOrder(userid).then(res =>{
      if(res.code==200){
        console.log("查询已取消订单成功！",res.data)
        this.add_time(res.data.orderListVOS)
        this.setData({
          cancelOrder: res.data.orderListVOS
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
    success: function (res) {
    that.setData({
    deviceW: res.windowWidth,
    deviceH: res.windowHeight
    })
    }
    })
    },
    
/**
* @Explain：选项卡点击切换
*/
tabSwitch: function (e) {
  var that = this
  if (this.data.currtab === e.target.dataset.current) {
  return false
  } else {
  that.setData({
  currtab: e.target.dataset.current
  })
  }
  },
   
  tabChange: function (e) {
  this.setData({ currtab: e.detail.current })
  this.orderShow()
  },
   
  orderShow: function () {
  let that = this
  switch (this.data.currtab) {
  case 0:
  that._paidOrder()
  break
  case 1:
  that._tobepaidOrder()
  break
  case 2:
  that._cancelOrder()
  break
  }
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