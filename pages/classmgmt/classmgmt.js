import {
  getTeacherInfo
} from '../../network/checkin'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //标签跳转选择（时间登记、课表查询、课程查询）**********************************************
  operations(e){
    let operation = e.currentTarget.dataset.operations
    wx.navigateTo({
      url: '../' + operation + '/' + operation,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

   //获取当前登录状态**********************************************
  _getTeacherInfo(){
    let data = wx.getStorageSync('loginInfo').userid
    getTeacherInfo(data).then((res)=>{
      if(res.code == 200){
        return true;
      }
    })
  },
  onLoad: function (options) {
    if(!this._getTeacherInfo){
      wx.redirectTo({
        url: '../my-t/my-t',
      });
      setTimeout(() => {
        wx.showToast({
          title: '请先登记信息！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
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