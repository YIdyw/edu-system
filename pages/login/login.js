import {
  getLoginInfo, code
} from '../../network/login'
import {
  getPhonecode, updatePassWord
} from '../../network/phonecode'
Page({
  data: {
    account:"",
    password:"",
    code: '',
    isflag: false,
    modalShow: false,
    code: '',
    newpsword: '',
    phone: ''
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

  newpsword(e){
    this.setData({
      newpsword: e.detail.value
    });
  },

  inputcode(e){
    this.setData({
      code: e.detail.value
    });
  },

  inputphone(e){
    this.setData({
      phone: e.detail.value
    });
  },

  getcode(){
    let data={
      phone: this.data.phone
    }
    if(!(/^1[3-9]\d{9}$/.test(this.data.phone))){
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    } else {
      getPhonecode(data).then(res => {
        console.log(res)
        if(res.code==200){
          setTimeout(() => {
            wx.showToast({
              title: '验证码发送成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '验证码发送失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
      })
    }
  },

  orgConfirm(){
    let data = {
        newPwd : this.data.newpsword,
        verifyCode : this.data.code,
        userInfo : this.data.phone
    }
    updatePassWord(data).then(res => {
      console.log(res)
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '密码修改成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        this.setData({
          modalShow: false
        })
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '密码修改失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        this.setData({
          modalShow: false
        })
      }
    })
  },

  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },

  findpsword(){
    this.setData({
      modalShow: true
    })
  },
  login(){
    var that = this;
    if (that.data.account == "") {
      setTimeout(() => {
        wx.showToast({
          title: '用户名不能为空！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if (that.data.password == "") {
      setTimeout(() => {
        wx.showToast({
          title: '密码不能为空！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      that._getLoginInfo();
      that._message()
    }
  }, 
  regist() {
    wx.navigateTo({
      url: '../regist/regist'
    })
  },

  _message(){
    wx.requestSubscribeMessage({
      tmplIds: ["d3qSH7KhMe9G56IHrLpnEbHNFmhebSHkSae7Z0oroyk","7BcxJPhRmjyDlIMHHqzXY3aDaICHOwdvVR6uHw8EvCk"],
      success (res) {
        console.log("可以进行推送")
        console.log(res)
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
          setTimeout(() => {
            wx.showToast({
              title: '登录成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }else if(res.data.defaultRole == 3||res.data.defaultRole==1){
          wx.reLaunch({
            url: '../my-stu/my-stu',
          });
          setTimeout(() => {
            wx.showToast({
              title: '登录成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }
      }else{
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 5000)
        }, 0);
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
