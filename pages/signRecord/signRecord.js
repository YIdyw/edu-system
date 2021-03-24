// 教师在课程管理中的课程查询中查看某个课程已上课的签到情况（签到人数/总人数）
import {
  signRecord
} from '../../network/signRecord'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: '',
    courseInfo : []
  },

  // 点击跳转到当前选择的某节具体课程中的详细签到情况页面
  // 查看具体的每个学生在这节课的签到情况
  signList(e){
    let courseTime = e.currentTarget.dataset.time
    let courseId = this.data.courseId
    wx.navigateTo({
      url: '../signList/signList?courseId=' + courseId + '&courseTime=' + courseTime.substring(0, 16),
    });
  },
  
  //根据当前老师的 id 查询当前老师的某门具体课程中已经上过的课的签到情况
  _getSignRecord(){
    let data = {
      id: this.data.courseId
    }
    signRecord(data).then(res=>{
      if(res.code == 200){
        this.setData({
          courseInfo: res.data.rows.reverse()
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    });
    this._getSignRecord();
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