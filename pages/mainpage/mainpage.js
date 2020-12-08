// pages/mainpage/mainpage.js
import {
   getOrgInfo
} from '../../network/search'
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
    beforeColor: "lightgray", //指示点颜色
    afterColor: "red", //当前选中的指示点颜色
    // 轮播数据 + 效果 E
    controls: false,
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