import {
  getLoginInfo, code, getOrgNum
} from '../../network/login'
import {
  getPhonecode, updatePassWord
} from '../../network/phonecode'

var app = getApp()
Page({
  data: {
    account:"",//用户名
    password:"",//密码
    code: '',//验证码
    isflag: false,//是否修改密码
    modalShow: false,//是否显示修改密码框
    newpsword: '',//新密码
    phone: ''//手机号
  },

  //用户名输入框******************************************
  accountinput: function (e) {
    this.setData({
      account: e.detail.value
    });
  },

  //密码输入框******************************************
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  //新密码输入框******************************************
  newpsword(e){
    this.setData({
      newpsword: e.detail.value
    });
  },

  //验证码输入框******************************************
  inputcode(e){
    this.setData({
      code: e.detail.value
    });
  },

  //验证码输入框******************************************
  inputphone(e){
    this.setData({
      phone: e.detail.value
    });
  },

  //获取验证码******************************************
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

  //确认修改密码******************************************
  orgConfirm(){
    let data = {
        newPwd : this.data.newpsword,
        verifyCode : this.data.code,
        userInfo : this.data.phone
    }
    if(this.data.newpsword.length<6){
      setTimeout(() => {
        wx.showToast({
          title: '密码少于6位！',
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
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
    }
    
  },

  //隐藏修改密码信息框******************************************
  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },

  //找回密码信息框******************************************
  findpsword(){
    this.setData({
      modalShow: true
    })
  },

  //登录******************************************
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

  //跳转到注册页面******************************************
  regist() {
    wx.navigateTo({
      url: '../regist/regist'
    })
  },

  //消息推送，模板消息******************************************
  _message(){
    wx.requestSubscribeMessage({
      tmplIds: ["Ay8VcpCaY_bqB_uvjLntnShzPXcsv_0J4Ya3JuEwHEc","Db5GfNzzqozgQdnHfpZYyFRgFIRewm1omkQe-8lF9Zc","Db5GfNzzqozgQdnHfpZYyFRgFIRewm1omkQe-8lF9Zc",],
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
  
  //发送 res.code 到后台换取 openId, sessionKey, unionId******************************************
  _pushcode() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let data2 = {
          userid: wx.getStorageSync('loginInfo').userid,
          code: res.code
        }
        console.log("这就是我的code："+res.code);
        code(data2).then(res1 =>{
          if(res1.code==200){
            console.log("code发送成功！")
          }
        })
      }
    })
  },

  //获取登录信息******************************************
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
        if(app.globalData.isfollow){
          wx.redirectTo({
            url: '../detail/detail?orgid=' + wx.getStorageSync('show2code').content.orgId,
          })
        }
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
        }else if(res.data.defaultRole == 3){
          getOrgNum(res.data.userid).then(res1 =>{
            console.log(res1)
            if(res1.code==200){
              console.log("机构信息获取成功")
            }
            if(res1.data.length == 0){
              wx.reLaunch({
                url: '../my-stu/my-stu',
              });
            }
            else if(res1.data.length == 1){
              wx.reLaunch({
                url: '../detail/detail?orgid='+ res1.data[0].orgId,
              });
            }
            else {
              wx.reLaunch({
                url: '../mainpage/mainpage',
              });
            }
            // wx.reLaunch({
            //   url: '../my-stu/my-stu',
            // });
          })
          setTimeout(() => {
            wx.showToast({
              title: '登录成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }else if(res.data.defaultRole == 1){
          wx.reLaunch({
            url: '../my/my',
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

  navto_loginPhone() {
    wx.redirectTo({
      url: '../loginPhone/loginPhone'
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
