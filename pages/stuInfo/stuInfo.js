// pages/stuInfo/stuInfo.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceW: '',
    deviceH: '',
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
    listData:[{ "col1": "第一列1", "col2": "第二列1"},
    { "col1": "第一列2", "col2": "第二列2"},
    { "col1": "第一列3", "col2": "第二列3"},
    { "col1": "第一列4", "col2": "第二列4"},
    { "col1": "第一列5", "col2": "第二列5"},
    { "col1": "第一列6", "col2": "第二列6"},
    { "col1": "第一列7", "col2": "第二列7"},
    { "col1": "第一列8", "col2": "第二列8" }]
  },

  //获取设备信息
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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