// pages/timeSelect/timeSelect.js
import {
  getFreeTime, addTime, updateTime
} from '../../network/timeSelect'

Page({
  data: {
    day1: '0000000&00000000&000000',
    day2: '0000000&00000000&000000',
    day3: '0000000&00000000&000000',
    day4: '0000000&00000000&000000',
    day5: '0000000&00000000&000000',
    day6: '0000000&00000000&000000',
    day7: '0000000&00000000&000000',
    timeSave: [],
    timeInfo: [],
    monthTitle: ['  ', '一', '二', '三', '四', '五', '六','日'],
    timeTitle: ['8:30  --  9:00', '9:00  --  9:30', '9:30  -- 10:00', '10:00 -- 10:30', '10:30 -- 11:00', '11:00 -- 11:30', '11:30 -- 12:00','下午',
                '14:00 -- 14:30','14:30 -- 15:00', '15:00 -- 15:30', '15:30 -- 16:00', '16:00 -- 16:30', '16:30 -- 17:00','17:00 -- 17:30','17:30 -- 18:00','晚上',
                '19:00 -- 19:30','19:30 -- 20:00', '20:00 -- 20:30', '20:30 -- 21:00', '21:00 -- 21:30', '21:30 -- 22:00',],
    isSure: false,
  },

  //选择时间段
  choose(e) {
    let index = e.currentTarget.dataset.index
    switch (this.data.timeInfo[index]){
      case '0':
        this.setData({
          ['timeInfo['+index+']']: '1',
        })
        break
      case '1':
        this.setData({
          ['timeInfo['+index+']']: '0',
        })
        break
      case '2':
        setTimeout(() => {
          wx.showToast({
            title: '该时间段已排课！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
    }
    this._split()
  },
  //数组合并
  _merge() {
    let day1 = this.data.day1
    let day2 = this.data.day2
    let day3 = this.data.day3
    let day4 = this.data.day4
    let day5 = this.data.day5
    let day6 = this.data.day6
    let day7 = this.data.day7
    let val = new Array()
    for(let i = 0; i < 23; i++){
      val[i * 8] = this.data.timeTitle[i]
      val[i * 8 + 1] = day1[i]
      val[i * 8 + 2] = day2[i]
      val[i * 8 + 3] = day3[i]
      val[i * 8 + 4] = day4[i]
      val[i * 8 + 5] = day5[i]
      val[i * 8 + 6] = day6[i]
      val[i * 8 + 7] = day7[i]
    }
    // val[0] = this.data.timeTitle
    // val[1] = day1
    // val[2] = day2
    // val[3] = day3
    // val[4] = day4
    // val[5] = day5
    // val[6] = day6
    // val[7] = day7
    this.setData({
      timeInfo: val
    })
  },
  
  //数组拆分
  _split() {
    var val = this.data.timeInfo
    var day1  = new Array()
    var day2  = new Array()
    var day3  = new Array()
    var day4  = new Array()
    var day5  = new Array()
    var day6  = new Array()
    var day7  = new Array()
    for(let i = 0; i < 23; i++){
      day1[i] = val[i * 8 + 1]
      day2[i] = val[i * 8 + 2]
      day3[i] = val[i * 8 + 3]
      day4[i] = val[i * 8 + 4]
      day5[i] = val[i * 8 + 5]
      day6[i] = val[i * 8 + 6]
      day7[i] = val[i * 8 + 7]
    }
    this.setData({
      day1: day1.join(''),
      day2: day2.join(''),
      day3: day3.join(''),
      day4: day4.join(''),
      day5: day5.join(''),
      day6: day6.join(''),
      day7: day7.join(''),
    })
  },

  //获取教师的空闲时间信息
  _getfreetime() {
    let userid = wx.getStorageSync('loginInfo').userid
    getFreeTime(userid).then(res =>{
      if(res.data.timeInterval1.freeTimeFlag){
        this.setData({
          day1: res.data.timeInterval1.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval2.freeTimeFlag){
        this.setData({
          day2: res.data.timeInterval2.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval3.freeTimeFlag){
        this.setData({
          day3: res.data.timeInterval3.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval4.freeTimeFlag){
        this.setData({
          day4: res.data.timeInterval4.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval5.freeTimeFlag){
        this.setData({
          day5: res.data.timeInterval5.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval6.freeTimeFlag){
        this.setData({
          day6: res.data.timeInterval6.freeTimeFlag,
          isSure: true
        })
      }
      if(res.data.timeInterval7.freeTimeFlag){
        this.setData({
          day7: res.data.timeInterval7.freeTimeFlag,
          isSure: true
        })
      }
      this._merge()
    })
  },

  add() {
    let data = {
      id: wx.getStorageSync('loginInfo').userid,
      timeInterval1: this.data.day1,
      timeInterval2: this.data.day2,
      timeInterval3: this.data.day3,
      timeInterval4: this.data.day4,
      timeInterval5: this.data.day5,
      timeInterval6: this.data.day6,
      timeInterval7: this.data.day7,
    }
    addTime(data).then(res =>{
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '添加空闲时间段成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    })
  },

  update() {
    let data = {
      teaid: wx.getStorageSync('loginInfo').userid,
      timeInterval1: this.data.day1,
      timeInterval2: this.data.day2,
      timeInterval3: this.data.day3,
      timeInterval4: this.data.day4,
      timeInterval5: this.data.day5,
      timeInterval6: this.data.day6,
      timeInterval7: this.data.day7,
      
    }
    updateTime(data).then(res =>{
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '更新空闲时间段成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getfreetime();
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