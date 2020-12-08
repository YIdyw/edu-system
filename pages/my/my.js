// pages/my/my.js

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

  
  movetologin(){
    wx.navigateTo({
      url: '../loginPhone/loginPhone',
    });
  },

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
      // getOrgNum(wx.getStorageSync('loginInfo').userid).then(res1 =>{
      //   if(res1.data.length == 0){
      //     wx.reLaunch({
      //       url: '../my-stu/my-stu',
      //     });
      //   }
      //   else if(res1.data.length == 1){
      //     wx.reLaunch({
      //       url: '../detail/detail?orgid='+res1.data[0].orgId,
      //     });
      //   }
      //   else {
      //     wx.reLaunch({
      //       url: '../mainpage/mainpage',
      //     });
      //   }
      // })
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