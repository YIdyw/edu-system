import {
  scheduleQuery
} from '../../network/scheduleQuery'
import {
  updateInfo
} from '../../network/regist'
var app = getApp()
Page({
  data: {
    current:0,
    islogin: false,
    isflag: false,
    iconList: [{
      icon: 'addressbook',
      color: 'red',
      id:0,
      name:'信息登记' 
    }, {
      icon: 'edit',
      color: 'orange',
      id:1,
      name: '课程相关'
    }, {
      icon: 'qrcode',
      color: 'yellow',
      id:2,
      name: '扫一扫'
    }, {
      icon: 'write',
      color: 'olive',
      id:3,
      name: '我的试听'
    }, {
      icon: 'cart',
      color: 'cyan',
      id:4,
      name: '购课车'
    }, {
      icon: 'order',
      color: 'blue',
      id:5,
      name: '订单'
    } ],
    isFaceChecked: 0,
    userInfo: {},
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
      id: wx.getStorageSync('loginInfo').userid,      
      limitTime: year + '-' + month,
      type: 'month',
      userType: wx.getStorageSync('loginInfo').defaultRole,
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
      id: wx.getStorageSync('loginInfo').userid, 
      limitTime: year + '-' + month,
      type: 'month',
      userType: wx.getStorageSync('loginInfo').defaultRole,
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
      wx.showToast({
        title: '已到本月第一周',
        icon: 'none'
      });
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
    }else if(showWeek*7 - monthPlan.length < 7){
      for(let k=(showWeek-1)*7; k<monthPlan.length; k++){
        thatWeek.push(monthPlan[k])
      }
      this.setData({
        showWeek: showWeek,
        thatWeek: thatWeek,
        tabWeek: tabWeek
      });
    }else{
      wx.showToast({
        title: '已到本月最后一周',
        icon: 'none'
      });
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
      wx.showToast({
        title: '当前没有排课',
        icon: 'none'
      })
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
    let today = new Date()
    let monthcheck = this.data.monthPlan
    
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var monthday = new Date(year,month,0)
    let currentWeekNum = parseInt((monthcheck.length - monthday.getDate() + day)/7) + 1;
    console.log(currentWeekNum)
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

  facehandler(e){
    var that=this;
    var id = e.currentTarget.id;
    console.log(id)
    this.setData({
      isFaceChecked: id,
      
    })
   if(that.data.isFaceChecked==0){
    wx.navigateTo({
      url: '../information/information',
    })
   }else if (that.data.isFaceChecked==1){
     var that=this;
      wx.navigateTo({
        url: '../aboutclass/aboutclass',
      })
    }else if(that.data.isFaceChecked==2){
      this.picture2()
    }else if(that.data.isFaceChecked==3){
      wx.navigateTo({
        url: '../trylisten/trylisten',
      })
    }else  if(that.data.isFaceChecked==4){
      wx.navigateTo({
        url: '../carts/carts',
      })
    }else  if(that.data.isFaceChecked==5){
      wx.navigateTo({
        url: '../order/order',
      })
    }
  },
handleChangeScroll ({ detail }) {
  this.setData({
      current_scroll: detail.key
  });
},
isout(){
  wx.navigateTo({
    url: '../my/my'
  })
  wx.clearStorage()
},

//查看授权情况
my_setting() {
  wx.getSetting({
    withSubscriptions: true,
    success (res) {
      console.log(res.authSetting)
      // res.authSetting = {
      //   "scope.userInfo": true,
      //   "scope.userLocation": true
      // }
      console.log(res.subscriptionsSetting)
      // res.subscriptionsSetting = {
      //   mainSwitch: true, // 订阅消息总开关
      //   itemSettings: {   // 每一项开关
      //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
      //     SYS_MSG_TYPE_RANK: 'accept'
      //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
      //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
      //   }
      // }
    }
  })
},

picture2(){
  wx.scanCode({
    success: (res) => {
      var show2code=res.result;
      wx.setStorageSync('show2code',show2code);
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '../code2msg/code2msg',
      })
      },
      fail: (res) => {
      wx.showToast({
        title: '失败',
        icon: 'none',
        duration: 2000
      })
      },
      complete: (res) => {} 
  })
},

  update() {
    let data = {
      defaultRole: 2,
      userid: this.data.loginInfo.userid
    }
    updateInfo(data).then(res =>{
      if(res.code == 200){
        wx.showToast({
          title: '切换成功！',
        })
        var logininfo = this.data.loginInfo
        logininfo.defaultRole = 2
        console.log(logininfo)
        wx.setStorageSync('loginInfo', logininfo)
        wx.redirectTo({
          url: '../my-tch/my-tch',
        })
      }
    })
  },

  tobe(){
    const that = this
    var logininfo = this.data.loginInfo
    if(logininfo.role1 == 2 || logininfo.role2 == 2 || logininfo.role3 == 2){
      wx.showModal({
        title: '您当前身份为学生',
        content: '确定将身份切换为教师吗',
        success(res) {
          if (res.confirm) {
  　　　　　console.log('用户点确定了');
            that.update();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
    })
    }else {
      wx.showToast({
        title: '该账号只有一个身份!',
        icon: 'none'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current: "mine"
  });
    //this.my_setting()

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
      id: wx.getStorageSync('loginInfo').userid,      
      limitTime: currentYear + '-' + currentMonth,
      type: 'month',
      userType: wx.getStorageSync('loginInfo').defaultRole,
    }
    this._scheduelQuery(data);
    
    let loginInfo = wx.getStorageSync('loginInfo');
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
      });
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