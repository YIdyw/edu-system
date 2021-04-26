// pages/stuInfo/stuInfo.js
import{
  myCourse
} from '../../network/aboutclass'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceW: '',
    deviceH: '',
    courseId: '',
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
    listData:[]
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


  _myCourse(){
    let courseInfo = [];
    let data = {
      stuId: wx.getStorageSync('loginInfo').userid
    }
    myCourse(data).then(res=>{
      if(res.code == 200){
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].courseId == this.data.courseId){
            courseInfo = [{'col1': "类型", 'col2': res.data[i].courseType},
            {'col1': "机构名称", 'col2': res.data[i].orgName},
            {'col1': "教师姓名", 'col2': res.data[i].teaName},
            {'col1': "剩余课时", 'col2': res.data[i].remainCourseTime},
            {'col1': "剩余补课", 'col2': res.data[i].remainMakeUpTime},
            {'col1': "总课时", 'col2': res.data[i].totalCourseTime},
            {'col1': "累计已上", 'col2': res.data[i].consumedCourseTime},
            {'col1': "累计已补", 'col2': res.data[i].consumedMakeupTime}];
          }
        }
        this.setData({
          listData: courseInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this._myCourse()
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