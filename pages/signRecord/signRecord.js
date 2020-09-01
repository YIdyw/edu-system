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
  signList(e){
    let courseTime = e.currentTarget.dataset.time
    let courseId = this.data.courseId
    wx.navigateTo({
      url: '../signList/signList?courseId=' + courseId + '&courseTime=' + courseTime,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
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