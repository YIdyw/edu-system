// pages/notify/notify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notify:[]
  },
  signToRead(e){
    let notify = this.data.notify
    let idx = e.currentTarget.dataset.idx
    notify[idx].isRead = true
    this.setData({
      notify: notify
    });
    wx.setStorageSync('notify', notify)
  },
  signToUnread(e){
    let notify = this.data.notify
    let idx = e.currentTarget.dataset.idx
    notify[idx].isRead = false
    this.setData({
      notify: notify
    });
    wx.setStorageSync('notify', notify)
  },
  deleteThis(e){
    let idx = e.currentTarget.dataset.idx
    let notify = this.data.notify
    notify.splice(idx, 1)
    this.setData({
      notify: notify
    });
    wx.setStorageSync('notify', notify)
  },
  sortDateFunc(a, b){
    return Date.parse(b.date) - Date.parse(a.date);
  },
  sortDate(date){
    return date.sort(this.sortDateFunc)
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let notify = wx.getStorageSync('notify')
    let readNotify = []
    let unreadNotify = []
    for(let i=notify.length-1; i>=0; i--){
      if(!notify[i].isRead){
        unreadNotify.push(notify[i])
      }else{
        readNotify.push(notify[i])
      }
    }
    readNotify = this.sortDate(readNotify);
    unreadNotify = this.sortDate(unreadNotify);
    let notifys = unreadNotify.concat(readNotify);
    this.setData({
      notify: notifys
    });
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