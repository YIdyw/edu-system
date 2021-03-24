// pages/my/my.js
// 入口页面
var app = getApp();
import {
  getOrgNum
} from '../../network/login'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    
  },

  // 跳转到使用手机登陆页面
  movetologin(){
    wx.navigateTo({
      url: '../loginPhone/loginPhone',
    });
  },

  // 扫一扫，扫码成功后根据二维码的类型进行跳转
  // type = 1(跳转到机构页面), type = 2(跳转到签到页面), type = 3(跳转到课程预约页面) 
  picture2(){
    wx.scanCode({
      success: (res) => {
        var show2code=res.result;
        let show = JSON.parse(show2code);
        wx.setStorageSync('show2code',show);

        setTimeout(() => {
          wx.showToast({
            title: '查询成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        if(show.type == 1){
          wx.navigateTo({
            url: '../detail/detail?orgid='+show.content.orgId,
          })
        }else if(show.type == 2){
          wx.navigateTo({
            url: '../sign/sign',
          })     
        }else if(show.type == 3){
          app.globalData.marketers = show.content.id
          wx.navigateTo({
            url: '../propaganda/propaganda',
          })     
        }
        },
        fail: (res) => {
        setTimeout(() => {
          wx.showToast({
            title: '查询失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        },
        complete: (res) => {} 
    })
  },
  
  // 登出，清空缓存
  isout(){
    wx.navigateTo({
      url: '../my/my'
    })
    wx.clearStorage()
  },

  // 点击选择身份，跳转到详细信息注册页面
  choose(){
    wx.navigateTo({
      url: '../registNext/registNext',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 权限获取请求，以及根据内存信息跳转到相应的教师页面或学生页面
  onLoad: function (options) {
    var that = this
    if(!wx.getStorageSync('loginInfo')){
    wx.showModal({
      cancelColor: 'cancelColor',
      confirmText: '同意',
      cancelText: '拒绝',
      title: '账号登录请求',
      content: '小程序用于培训教师与学生/家长进行交流，用户需要在注册（老师或者学生/家长）账号，才能正常使用',
      success(res){
        if(res.confirm){
          if(wx.getStorageSync('loginInfo').defaultRole==2){
            wx.redirectTo({
              url: '../my-tch/my-tch',
            })
          }else if(wx.getStorageSync('loginInfo').defaultRole==3){
            getOrgNum(wx.getStorageSync('loginInfo').userid).then(res1 =>{
              if(res1.data.length == 0){
                wx.reLaunch({
                  url: '../my-stu/my-stu',
                });
              }
              else if(res1.data.length == 1){
                wx.reLaunch({
                  url: '../detail/detail?orgid='+res1.data[0].orgId,
                });
              }
              else {
                wx.reLaunch({
                  url: '../mainpage/mainpage',
                });
              }
            })
            // wx.redirectTo({
            //   url: '../my-stu/my-stu',
            // })
          }
        }else if(res.cancel){
          wx.redirectTo({
            url: '../beforeindex/beforeindex',
          })
        }
      }
    })
  }else if(wx.getStorageSync('loginInfo').defaultRole==2){
    wx.redirectTo({
      url: '../my-tch/my-tch',
    })
  }else if(wx.getStorageSync('loginInfo').defaultRole==3){
    getOrgNum(wx.getStorageSync('loginInfo').userid).then(res1 =>{
      if(res1.data.length == 0){
        wx.reLaunch({
          url: '../my-stu/my-stu',
        });
      }
      else if(res1.data.length == 1){
        wx.reLaunch({
          url: '../detail/detail?orgid='+res1.data[0].orgId,
        });
      }
      else {
        wx.reLaunch({
          url: '../mainpage/mainpage',
        });
      }
    })
    // wx.redirectTo({
    //   url: '../my-stu/my-stu',
    // })
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