import {
  getTeacherInfo
} from '../../network/checkin'
import {
  scheduleQuery
} from '../../network/scheduleQuery'
import {
  updateInfo
} from '../../network/regist'

Page({
  data: {
    loginInfo:[],
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
      name: '课程管理'
    }, {
      icon: 'profile',
      color: 'yellow',
      id:2,
      name: '个人中心'
    }, {
      icon: 'friendfill',
      color: 'olive',
      id:3,
      name: '增加权限'
    }, {
      icon: 'cascades',
      color: 'cyan',
      id:4,
      name: '挂靠管理'
    }, {
      icon: 'upstagefill',
      color: 'blue',
      id:5,
      name: '排行'
    } ],
    isFaceChecked: 0,
    notifyNum: 0,
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
      id: wx.getStorageSync('loginInfo').userid,
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
          icon: "none",
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
      setTimeout(() => {
        wx.showToast({
          title: '已到本月最后一周！',
          icon: "none",
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
          icon: "none",
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
            monthPlan[i].courseInfo.push({name: res.data[j].name,courId: res.data[j].courseId, courseTime: res.data[j].courseTime, site: res.data[j].site})
          }
          
          continue;
        }
        if(monthPlan[i].name == this.data.currentDay){
          dayPlan = monthPlan[i]
          currentWeekNum = parseInt(i / 7) + 1
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
    var id = e.currentTarget.dataset.id;
    this.setData({
      isFaceChecked: id
    });
   if(that.data.isFaceChecked==0){
    wx.navigateTo({
      url: '../info-t/info-t',
    })
   }else if(that.data.isFaceChecked==1){
     if(this.data.isflag){
      wx.navigateTo({
        url: '../classmgmt/classmgmt',
      })
     }else{
       setTimeout(() => {
        wx.showToast({
          title: '请先实名认证、信息登记！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
     }
    }else if(that.data.isFaceChecked==2){
      wx.navigateTo({
        url: '../mancentral/mancentral',
      })
    }else if(that.data.isFaceChecked==3){
      wx.showModal({
        cancelColor: 'cancelColor',
        content : "请选择是否需要增加学生权限（选课、购课...）",
        title : "增加学生权限",
        success(res){
          if(res.confirm){
            that.addStatus()
          }
        }
      })
    }else if(that.data.isFaceChecked==4){
      if(this.data.isflag){
        wx.navigateTo({
          url: '../relymgmt/relymgmt',
        })
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '请先实名认证、信息登记！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    }
  },
  isout(){
    wx.reLaunch({
      url: '../my/my'
    });
    wx.clearStorage();
  },

  addStatus() {
    let l1 = wx.getStorageSync('loginInfo').role1
    let l2 = wx.getStorageSync('loginInfo').role2
    let l3 = wx.getStorageSync('loginInfo').role3
    var flag = 0
    if(l1 == 2 || l1 == 3){
      flag = flag + 1
    }
    if(l2 == 2 || l2 == 3){
      flag = flag + 1
    }
    if(l3 == 2 || l3 == 3){
      flag = flag + 1
    }
    if(flag >= 2){
      setTimeout(() => {
        wx.showToast({
          title: '您已有学生权限，请点击头像！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else{
      let data = {
        role1 : 2,
        role2 : 3,
        userid: this.data.loginInfo.userid
      }
      updateInfo(data).then(res => {
        console.log(res)
        if(res.code == 200){
          setTimeout(() => {
            wx.showToast({
              title: '增加学生权限成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '增加学生权限失败！',
              icon : 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }
      })
      var logininfo = this.data.loginInfo
      logininfo.role1 = 2
      logininfo.role2 = 3
      console.log(logininfo)
      wx.setStorageSync('loginInfo', logininfo)
    }
    
  },

  update() {
    let data = {
      defaultRole: 3,
      userid: this.data.loginInfo.userid
    }
    updateInfo(data).then(res =>{
      if(res.code == 200){
        setTimeout(() => {
          wx.showToast({
            title: '切换成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        var logininfo = this.data.loginInfo
        logininfo.defaultRole = 3
        console.log(logininfo)
        wx.setStorageSync('loginInfo', logininfo)
        wx.redirectTo({
          url: '../my-stu/my-stu',
        })
      }
    })
  },

  tobe(){
    const that = this
    var logininfo = this.data.loginInfo
    if(logininfo.role1 == 3 || logininfo.role2 == 3 || logininfo.role3 == 3){
      wx.showModal({
        title: '您当前身份为教师',
        content: '确定将身份切换为学生吗',
        success(res) {
          if (res.confirm) {
  　　　　　console.log('用户点确定了')
            that.update()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
    })
    }else {
      setTimeout(() => {
        wx.showToast({
          title: '该账号只有一个身份！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      current: "mine"
  });
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
      userType: 2
    }
    this._scheduelQuery(data);
    let loginInfo = wx.getStorageSync('loginInfo');
    let notify = wx.getStorageSync('notify');
    let notifyNum = 0
    getTeacherInfo(loginInfo.userid).then((res) => {
      if (res.code == 200) {
        this.setData({
          isflag: true,
        });
      }
    })
    for(let i=0; i<notify.length; i++){
      if(!notify[i].isRead){
        notifyNum++;
      }
    }
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
        notifyNum: notifyNum
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
    let loginInfo = wx.getStorageSync('loginInfo');
    let notify = wx.getStorageSync('notify');
    let notifyNum = 0
    getTeacherInfo(loginInfo.userid).then((res) => {
      if (res.code == 200) {
        this.setData({
          isflag: true,
        });
      }
    })
    for(let i=0; i<notify.length; i++){
      if(!notify[i].isRead){
        notifyNum++;
      }
    }
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
        notifyNum: notifyNum
      });
    }
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