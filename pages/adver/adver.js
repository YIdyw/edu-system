// pages/adver/adver.js
import {
  adver
} from '../../network/adver'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },

  _adver(){
    //let data = wx.getStorageSync('loginInfo').userid
    let data = 2
    adver(data).then(res =>{
      console.log(res)
      if(res.code == 200){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that._adver()
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

  onShareTimeline(res){
    console.log(res)
    return {
      title: '测试小程序分享至朋友圈',
      path: '../adver/adver',
      imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    console.log("分享")
    return {
      title: "分享卡片",
      path: '../adver/adver',
      }
  }
})