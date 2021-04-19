// pages/teaCourse/teaCourse.js
import {
  teaCourse
} from '../../network/aboutclass'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceW: '',
    deviceH: '',
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
    listData:[], //课程学生的上课数、余课数
    userId: '',
    courseId: '',
  },

  //获取设备信息
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  //获取教师该课程下学生的上课数和余课数
  getCourseInfo(){
    let data = {
      userId: this.data.userId,
      courseId: this.data.courseId
    }
    let courseInfo = [];
    teaCourse(data).then(res =>{
      console.log(res)
      if(res.code == 200){
        for(let i = 0; i < res.data.length; i++){
          courseInfo.push({'col1':res.data[i].studentName, 'col2':res.data[i].consumedCourseTime,
          'col3': res.data[i].remainCourseTime});
        }
        console.log(courseInfo)
        this.setData({
          listData: courseInfo
        })
      } else{
        setTimeout(() => {
          wx.showToast({
            title: '查询失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      courseId: options.courseId,
      userId: wx.getStorageSync('loginInfo').userid
    })
    that.getCourseInfo();
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