//app.js
App({
  onLaunch: function () {

    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.time = res
      }
    })
    //获取胶囊信息
    this.nav = wx.getMenuButtonBoundingClientRect()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //回调函数
  getInfoCallback: function(p){
    if (this.getInfoCallback()) {
      this.getInfoCallback(data)
    }
    console.log('回调函数-->', p)
  },

  globalData: {
    userInfo: null,
    isfollow: false,
    marketers: ''
  }
})