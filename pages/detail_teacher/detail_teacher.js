// pages/detail_teacher/detail_teacher.js
import {
  getDetail
} from '../../network/search'

URL = {
  teacherUrl : '/teacher/'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher : {},
    name : {},
    screen : {
      minHeight : 'auto'
    },
    flag : false

  },

  getTeacherDetail: function(id){
    var url =URL.teacherUrl + id
    //console.log(url)
    getDetail(url).then(res =>{
      console.log(res)
      this.setData({
        teacher : res,
        flag : true
      });
    });
    //console.log(this.teacher)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.getSystemInfo({
      success: function( info ) {
         self.setData({
           'screen.minHeight' : info.windowHeight + 'px',
           'name' : options.name
         });
       }
     })
    this.getTeacherDetail(options.current)
    //console.log('teachers:', this.data.teacher)
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