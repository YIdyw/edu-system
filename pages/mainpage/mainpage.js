// pages/mainpage/mainpage.js
// 用户关注的机构列表，如果用户关注多个机构的时候，该页面即为初始页面
import {
   getOrgInfo
} from '../../network/search'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    org:{},
    indicatorDots: true,
    autoplay: false, // 自动播放
    interval: 5000, //轮播时间
    duration: 300, // 滑动速度越大越慢
    circular: true, //是否循环
    beforeColor: "blue", //指示点颜色
    afterColor: "white", //当前选中的指示点颜色
    // 轮播数据 + 效果 E
    controls: false,
    statusBarHeight: app.time.statusBarHeight,
    navigationBarHeight: (app.time.statusBarHeight + 44),
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
  },

  prevent_loop() {
    console.log("阻止冒泡")
  },

  back_self() {
    wx.redirectTo({
      url: '../my-stu/my-stu',
    })
  },
  //获取当前学生已经报名的唯一一个机构的信息
  _getOrgInfo(){
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    getOrgInfo(data.userid).then(res=>{
      if(res.code==200){  
        this.setData({
          org: res.data
        })
      }
      if (this.getInfoCallback) {
        this.getInfoCallback(res)     //这里为了防止网络获取延迟，设置回调函数
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getOrgInfo()
    this.getInfoCallback = res =>{
      console.log("以下")
      console.log(res)
      
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