// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },
  movetologin(){
    wx.navigateTo({
      url: '../login/login',
    });
  },

  isout(){
    wx.navigateTo({
      url: '../my/my'
    })
    wx.clearStorage()
  },

  choose(){
    wx.navigateTo({
      url: '../registNext/registNext',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.getStorageSync('loginInfo')){
      
    }else if(wx.getStorageSync('loginInfo').defaultRole==2){
      wx.redirectTo({
        url: '../my-tch/my-tch',
      })
    }else if(wx.getStorageSync('loginInfo').defaultRole==3){
      wx.redirectTo({
        url: '../my-stu/my-stu',
      })
    }else{
      this.setData({
        isLogin: true
      })
    }
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