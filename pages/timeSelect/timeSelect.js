// pages/timeSelect/timeSelect.js
// 当前页面已弃用
import {
  timeSelect, getFreeTime, updateTime
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
    week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    modalShow: false,
    errorIdx: [],
    isSure: false,
  },
  timeAdd(){
    let timeSave = this.data.timeSave;
    timeSave.push([0, '00:00', '00:00'])
    this.setData({
      timeSave: timeSave
    });
  },
  timeReselect(){
    const that = this;
    if(that.checkTime()) {
      let timeSave = this.data.timeSave
      let freeTime = [
        { dayOfWeek: 1, timeInterval:[] },
        { dayOfWeek: 2, timeInterval:[] },
        { dayOfWeek: 3, timeInterval:[] },
        { dayOfWeek: 4, timeInterval:[] },
        { dayOfWeek: 5, timeInterval:[] },
        { dayOfWeek: 6, timeInterval:[] },
        { dayOfWeek: 7, timeInterval:[] },
      ]
      for(let i=0; i<timeSave.length; i++){
        freeTime[timeSave[i][0]].timeInterval.push({
          beginTime: timeSave[i][1],
          endTime: timeSave[i][2]
        })
      }
      const freeTimes = freeTime.filter(item => item.timeInterval.length > 0)
      let data={
        teaId: wx.getStorageSync('loginInfo').userid,
        freeTimes: freeTimes
      }
      updateTime(data).then(res => {
        if(res.code == 200) {
          setTimeout(() => {
            wx.showToast({
              title: '修改成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        } else {
          setTimeout(() => {
            wx.showToast({
              title: '修改失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
      })
    }
  },
  pickerChange(e){
    let idx = e.currentTarget.dataset.idx
    let timeSave = this.data.timeSave
    let type = e.currentTarget.dataset.type
    if(type=='week'){
      timeSave[idx][0] = e.detail.value
    }else if(type=='beginTime'){
      timeSave[idx][1] = e.detail.value
    }else if(type=='endTime'){
      timeSave[idx][2] = e.detail.value
    }
    this.setData({
      timeSave: timeSave
    });
  },
  delTime(e){
    let idx = e.currentTarget.dataset.idx
    let timeSave = this.data.timeSave
    timeSave.splice(idx, 1)
    this.setData({
      timeSave: timeSave
    })
  },
  timeConfirm(){
    const that = this;
    var auth = wx.getStorageSync('loginInfo').authenticated
    if(auth){
      if(that.checkTime()) {
        that._timeSelect();
      }
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '尚未实名认证！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
  },
  checkTime() {
    let timeSave = this.data.timeSave
    let errorIdx = []
    if(timeSave.length){
      for(let i=0; i<timeSave.length; i++){
        let timeBgein = timeSave[i][1].split(':')
        let timeEnd = timeSave[i][2].split(':')
        let timeDelta = timeEnd[1] - timeBgein[1] + (timeEnd[0] - timeBgein[0]) * 60
        if(timeDelta<60){
          errorIdx.push(i+1)
        }
      }
      if(errorIdx.length){
        this.setData({
          errorIdx: errorIdx,
          modalShow: true
        });
      }else{
        return true;
      }
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '请至少添加一个时间段！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
    return false;
  },
  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },
  _timeSelect(){
    let timeSave = this.data.timeSave
    let freeTime = [
      { dayOfWeek: 1, timeInterval:[] },
      { dayOfWeek: 2, timeInterval:[] },
      { dayOfWeek: 3, timeInterval:[] },
      { dayOfWeek: 4, timeInterval:[] },
      { dayOfWeek: 5, timeInterval:[] },
      { dayOfWeek: 6, timeInterval:[] },
      { dayOfWeek: 7, timeInterval:[] },
    ]
    for(let i=0; i<timeSave.length; i++){
      freeTime[timeSave[i][0]].timeInterval.push({
        beginTime: timeSave[i][1],
        endTime: timeSave[i][2]
      })
    }
    const freeTimes = freeTime.filter(item => item.timeInterval.length > 0)
    let data={
      teaId: wx.getStorageSync('loginInfo').userid,
      freeTimes: freeTimes
    }
    timeSelect(data).then(res => {
      if(res.data==200){
        setTimeout(() => {
          wx.showToast({
            title: '时间添加成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    });
  },
  _getFreeTime(){
    let teaId = wx.getStorageSync('loginInfo').userid
    getFreeTime(teaId).then(res => {
      if(res.code==200){
        let timeSave = []
        for(let i=0; i<res.data.length; i++){
          for(let j=0; j<res.data[i].timeInterval.length; j++){
            timeSave.push([(res.data[i].dayOfWeek-1), res.data[i].timeInterval[j].beginTime, res.data[i].timeInterval[j].endTime])
          }
        }
        this.setData({
          timeSave: timeSave,
          isSure: true
        })
      }else{
        this.timeAdd();
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getFreeTime();
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