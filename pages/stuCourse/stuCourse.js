// pages/stuCourse/stuCourse.js
import{
  teaCourseInfo
} from '../../network/aboutclass'


var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    col1: [],   //学生编号
    col2: [],   //学生姓名
    col3: [],   //余课课时
    col4: [],   //已结课时
    col5: [],   //余补课时
    col6: [],   //待补课时
    col7: [],   //试听约课时间
    col8: [],   //初次购课日期
    col9: [],   //金额
    col10: [],   //累计课时
    button_index: '',  //  按钮下标值
    pro_date: null,   //预约日期
    buy_date: null,   //购买日期
    money: null,    //金额
    time: '',   //总课时
    showModal: true,
    deviceW: '',
    deviceH: '',
    courseId: '',
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
    content_col: ["预约日期", "购课日期", "金额", "累计课时"],
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

  cancel: function(){
    this.setData({
      showModal: true
    });
  },

  confirm: function(){
    this.setData({
         showModal: true
    });    
  },

  //查看当前学生“更多”信息
  moreInfo(e) {
    let index = e.currentTarget.dataset.index
    var that = this
    console.log(this.data.col7)
    setTimeout(() => {
      console.log(that.data.col7[index])
    }, 1000)
    let data = {
      button_index: index,
      stuInfo: this.data.col2[index]+"的额外信息",
      userName: this.data.col2[index],
      pro_date: this.data.col7[index],
      buy_date: this.data.col8[index],
      money: this.data.col9[index],
      time: this.data.col10[index]
    }
    console.log(data)
    this.cards.show_up(data)
  },


  _teaCourseInfo(){
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let col4 = [];
    let col5 = [];
    let col6 = [];
    let col7 = [];
    let col8 = [];
    let col9 = [];
    let col10 = [];
    let data = {
      teaId: wx.getStorageSync('loginInfo').userid
    }
    teaCourseInfo(data).then(res=>{
      console.log(res.data)
      if(res.code == 200){
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].courseId == this.data.courseId){
            col1.push(res.data[i].stuId);
            col2.push(res.data[i].stuName);
            col3.push(res.data[i].remainCourseTime);
            col4.push(res.data[i].consumedCourseTime);
            col5.push(res.data[i].remainMakeUpTime);
            col6.push(res.data[i].consumedMakeupTime);
            col7.push(res.data[i].detail.trialLessonDate);
            col8.push(res.data[i].detail.firstBuyDate);
            col9.push(res.data[i].detail.amount);
            col10.push(res.data[i].consumedCourseTime);
          }
        }
        this.setData({
          col1: col1,
          col2: col2,
          col3: col3,
          col4: col4,
          col5: col5,
          col6: col6,
          col7: col7,
          col8: col8,
          col9: col9,
          col10: col10,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      courseId: options.courseId
    })
    that.getDeviceInfo()
    that._teaCourseInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.cards = this.selectComponent("#cards")
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