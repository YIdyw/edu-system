import {
  scheduleQuery
} from '../../network/scheduleQuery'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: 0,
    tabTitle:[{id: 0, name: '月'}, {id: 1, name: '周'}, {id: 2, name: '日'}],
    currentYear: '',      // 当前年
    currentMonth: '',     // 当前月
    currentWeek: '',      // 当前周
    currentWeekNum: '',   // 当前周数
    currentDay: '',       // 当前日
    tabDay: false,        // 判断是否在tab周内选择天
    tabWeek: false,       // 判断是否在tab周内选择星期
    monthTitle: ['日', '一', '二', '三', '四', '五', '六'],
    monthPlan: [],        // tab月内日期表格
    weekPlan: [],         // tab周内日期流程
    thatWeek:[],          // tab周内选择周情况展示
    dayPlan:[],           // tab日当天情况展示
    thatDay: [],          // tab月/周内选择天情况展示
    showYear:'',          // tab月内月份选择（初始化为当前年）
    showMonth: '',        // tab月内月份选择（初始化为当前月）
    showWeek: '',         // tab周内周选择
  },
  lastMonth(){
    let month = this.data.showMonth-1;  // 前一月
    let year = this.data.showYear;      // 当前年
    let day = this.getMonthDays(year, month);    // 天数
    let firstMonthDate = new Date(year, month, 1);    // 当前月第一天
    let week = firstMonthDate.getDay()-1;             // 前一月最后一天星期
    if(month==0){
      month = 12;
       year -= 1;
    }
    let monthPlan = this.getMonthPlan(year, month, week, day);
    let sortPlan = this.sortMonthPlan(monthPlan);
    let data = {
      // id: wx.getStorageSync('loginInfo').userid,
      id: 46,
      limitTime: year + '-' + month,
      type: 'month',
      userType: 2
    }
    this.setData({
      showMonth: month,
      showYear: year,
      monthPlan: sortPlan
    });
    this._scheduelQuery(data);
  },
  nextMonth(){
    let month = this.data.showMonth+1;    // 后一月
    let year = this.data.showYear;        // 当前年
    let lastMonthDate = new Date(year, month-1, 1);     // 当前月第一天
    let week = lastMonthDate.getDay();                // 当前月第一天星期
    if(month == 13){
      month = 1;
       year += 1;
    }
    let monthPlan = this.getMonthPlan(year, month, week, 1);
    let sortPlan = this.sortMonthPlan(monthPlan);
    let data = {
      // id: wx.getStorageSync('loginInfo').userid,
      id: 46,
      limitTime: year + '-' + month,
      type: 'month',
      userType: 2
    }
    this.setData({
      showMonth: month,
      showYear: year,
      monthPlan: sortPlan
    });
    this._scheduelQuery(data);
  },
  getMonthDays(year, month){
    let thisDate = new Date(year, month, 0);
    return thisDate.getDate();
  },
  lastWeek(){
    let monthPlan = this.data.monthPlan
    let showWeek = this.data.showWeek - 1
    let thatWeek = []
    let tabWeek = showWeek == this.data.currentWeekNum? true : false
    if(showWeek > 0){
      for(let k=(showWeek-1)*7; k<showWeek*7; k++){
        if(monthPlan[k].name){
          thatWeek.push(monthPlan[k])
        }
      }
      this.setData({
        showWeek: showWeek,
        thatWeek: thatWeek,
        tabWeek: tabWeek
      });
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '已到本月第一周！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
  },
  nextWeek(){
    let monthPlan = this.data.monthPlan
    let showWeek = this.data.showWeek + 1
    let thatWeek = []
    let tabWeek = showWeek == this.data.currentWeekNum? true : false
    if(showWeek*7 <= monthPlan.length){
      for(let k=(showWeek-1)*7; k<showWeek*7; k++){
        thatWeek.push(monthPlan[k])
      }
      this.setData({
        showWeek: showWeek,
        thatWeek: thatWeek,
        tabWeek: tabWeek
      });
    }else if(showWeek*7 - monthPlan.length <= 7){
      for(let k=(showWeek-1)*7; k<monthPlan.length; k++){
        thatWeek.push(monthPlan[k])
      }
      this.setData({
        showWeek: showWeek,
        thatWeek: thatWeek,
        tabWeek: tabWeek
      });
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '已到本月最后一周！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
  },
  viewDayDetail(e){
    let exist = e.currentTarget.dataset.exist;
    let week = e.currentTarget.dataset.week;
    let courseInfo = e.currentTarget.dataset.info
    if(exist){
      this.setData({
        tabCur: 2,
        thatDay: {courseInfo: courseInfo, week: week}
      })
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '当前没有排课！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
  },
  hideModal(){
    this.setData({
      modalShow: false
    })
  },
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      tabDay: e.currentTarget.dataset.id==2?true:false,
      tabWeek: e.currentTarget.dataset.id==1?true:false
    })
  },
  dataLeftCompleting(value){
    return parseInt(value) < 10 ? "0" + value : value;
  },
  getMonthPlan(currentYear, currentMonth, currentWeek, currentDay){
    let monthPlan = []
    let num = this.getMonthDays(currentYear, currentMonth, 0);
    let m = [0, 1, 2, 3, 4, 5, 6];
    for(let i=currentDay, j=currentWeek+35; i>0; i--, j--){
      monthPlan.push({name: i, week: m[(j % 7)], exist: false, date: currentYear + '-' + this.dataLeftCompleting(currentMonth) + '-' + this.dataLeftCompleting(i), courseInfo: []})
    }
    for(let i=currentDay+1, j=currentWeek+1; i<=num; i++, j++){
      monthPlan.push({name: i, week: m[(j % 7)], exist: false, date: currentYear + '-' + this.dataLeftCompleting(currentMonth) + '-' + this.dataLeftCompleting(i), courseInfo: []})
    }
    return monthPlan;
  },
  sortMonthPlan(monthPlan){
    let sortPlan = []
    let temp = null
    let black = []
    for(let i=0; i<monthPlan.length; i++){
      for(let j=i; j<monthPlan.length; j++){
        if(monthPlan[i].name>monthPlan[j].name){
          temp = monthPlan[i]
          monthPlan[i]=monthPlan[j]
          monthPlan[j]=temp
        }
      }
      sortPlan.push(monthPlan[i]);
    }
    for(let i=0; i<sortPlan[0].week; i++){
      black.push({name: '', week: i, exist: false, date: '', courseInfo: []})
    }
    let newPlan = black.concat(sortPlan)
    return newPlan;
  },
  _scheduelQuery(data){
    let dayPlan = null;
    let currentWeekNum = null;
    let weekPlan = []
    scheduleQuery(data).then(res=>{
      let monthPlan = this.data.monthPlan
      for(let i=0; i<monthPlan.length; i++){
        for(let j=0; j<res.data.length; j++){
          if(monthPlan[i].date == res.data[j].courseTime.substring(0, 10)){
            monthPlan[i].exist = true;
            monthPlan[i].courseInfo.push({name: res.data[j].name, courseTime: res.data[j].courseTime, site: res.data[j].site})
          }
          if(monthPlan[i].name == this.data.currentDay){
            dayPlan = monthPlan[i]
            currentWeekNum = parseInt(i / 7) + 1
          }
          continue;
        }
      }
      for(let k=(currentWeekNum-1)*7; k<currentWeekNum*7; k++){
        weekPlan.push(monthPlan[k])
      }
      this.setData({
        monthPlan: monthPlan,
        dayPlan: dayPlan,
        currentWeekNum: currentWeekNum,
        showWeek: currentWeekNum,
        weekPlan: weekPlan
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentWeek = today.getDay();
    let currentDay = today.getDate();
    let monthPlan = this.getMonthPlan(currentYear, currentMonth, currentWeek, currentDay);
    let sortPlan = this.sortMonthPlan(monthPlan);
    this.setData({
      currentYear: currentYear,
      currentMonth: currentMonth,
      showYear: currentYear,
      showMonth: currentMonth,
      currentWeek: currentWeek,
      currentDay: currentDay,
      monthPlan: sortPlan
    });
    let data = {
      // id: wx.getStorageSync('loginInfo').userid,
      id: 46,
      limitTime: currentYear + '-' + currentMonth,
      type: 'month',
      userType: 2
    }
    this._scheduelQuery(data);
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