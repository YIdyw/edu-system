import {
  getLoginInfo, code
} from '../../network/login'

Page({
  data: {
    account:"",
    password:"",
    code: ''
  },
  accountinput: function (e) {
    this.setData({
      account: e.detail.value
    });
  },
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  login(){
    var that = this;
    that._message()
    if (that.data.account == "") {
      wx.showToast({
        title: '用户名不能为空！',
        icon: 'none'
      })
    }else if (that.data.password == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    }else{
      that._getLoginInfo();
    }
  }, 
  regist() {
    wx.navigateTo({
      url: '../regist/regist'
    })
  },

  _message(){
    wx.requestSubscribeMessage({
      tmplIds: ['7BcxJPhRmjyDlIMHHqzXY3aDaICHOwdvVR6uHw8EvCk'],
      success (res) {
        console.log("可以进行推送")
       },
       fail (res) {
        console.log("code:",res.errCode)
        console.log("Mes",res.errMsg)
       }
    })
  },
  
  _pushcode() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let data2 = {
          userid: wx.getStorageSync('loginInfo').userid,
          code: res.code
        }
        console.log("这就是我的code："+res.code)
        code(data2).then(res1 =>{
          console.log(res1)
          if(res1.code==200){
            console.log("code发送成功！")
          }
        })
      }
    })
  },

  _getLoginInfo() {
    const that = this;
    
    let data = {
      account: that.data.account,
      password: that.data.password
    }
    getLoginInfo(data).then(res => {
      console.log(res)
      wx.setStorageSync('loginInfo', res.data)
      if(res.code==200){
        that._pushcode()
        if(res.data.defaultRole == 2){
          wx.reLaunch({
            url: '../my-tch/my-tch',
          });
          wx.showToast({
            title: '登录成功',
          });
        }else if(res.data.defaultRole == 3||res.data.defaultRole==1){
          wx.reLaunch({
            url: '../my-stu/my-stu',
          });
          wx.showToast({
            title: '登录成功',
          });
        }
      }else{
        wx.showToast({
          title: '请输入正确信息',
          icon: 'none'
        })
      }
      
      
    });
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
