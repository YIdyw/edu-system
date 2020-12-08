import {
  getLoginInfo, code, loginPhone
} from '../../network/login'
import {
  phone
} from '../../network/regist'
import {
  getPhonecode, updatePassWord
} from '../../network/phonecode'
import {
  getOrgNum
} from '../../network/login'

var app = getApp()
Page({
  data: {
    code: '',
    isflag: false,
    modalShow: false,
    phone: '',
    flagphone: false
  },

  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  findphone(){
    var that = this
    that._phone()
  },

  inputcode(e){
    this.setData({
      code: e.detail.value
    });
  },


  _phone(){
    let data = this.data.phone
    phone(data).then(res =>{
      if(res.code == 200){
        this.setData({
          flagphone: true
        })
      }else{
        this.setData({
          flagphone: false
        })
      }
    })
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
      console.log("登录验证码默认为123456")
      // getPhonecode(data).then(res => {
      //   console.log(res)
      //   if(res.code==200){
      //     setTimeout(() => {
      //       wx.showToast({
      //         title: '验证码发送成功！',
      //       });
      //       setTimeout(() => {
      //         wx.hideToast();
      //       }, 1500)
      //     }, 0);
      //   }else{
      //     setTimeout(() => {
      //       wx.showToast({
      //         title: '验证码发送失败！',
      //         icon: 'none'
      //       });
      //       setTimeout(() => {
      //         wx.hideToast();
      //       }, 1500)
      //     }, 0);
      //   }
      // })
    }
  },

  login(){
    var that = this;
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
    }else{
      that._getLoginInfo();
      that._message()
    }
      
    
  }, 

  regist() {
    wx.navigateTo({
      url: '../registPhone/registPhone'
    })
  },

  _message(){
    wx.requestSubscribeMessage({
      tmplIds: ["Ay8VcpCaY_bqB_uvjLntnShzPXcsv_0J4Ya3JuEwHEc","Db5GfNzzqozgQdnHfpZYyFRgFIRewm1omkQe-8lF9Zc"],
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
  
  account(){
    wx.navigateTo({
      url: '../login/login',
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
      phone: that.data.phone,
      verifyCode: that.data.code
    }
    loginPhone(data).then(res => {
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
          })
          
          // wx.reLaunch({
          //   url: '../my-stu/my-stu',
          // });
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
