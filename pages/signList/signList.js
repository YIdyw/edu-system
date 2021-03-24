// 教师在课程管理中课程查询里点击具体签到情况查询后，再查看某节课具体签到名单的页面
import {
  signList
} from '../../network/signList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseTime: '',
    courseId: '',
    signInRoster: [],
    unSignInRoster:[]
  },

  // 根据当前选中的某节课的 courseId 以及上课时间 courseTime 来获取当前课的签到的名单和未签到的名单
  _getSignList(){
    let data = {
      courseId: this.data.courseId,
      courseTime: this.data.courseTime
    }
    signList(data).then((res)=>{
      if(res.code==200){
        this.setData({
          signInRoster: res.data.signInRoster,
          unSignInRoster: res.data.unSignInRoster
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId,
      courseTime: options.courseTime
    });
    this._getSignList();
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