import {
  scheduleQuery
} from '../../network/scheduleQuery'
import {
  updateInfo
} from '../../network/regist'
import {
  sign
} from '../../network/signList'
import {
  getStuInfo , getOrgNum
} from '../../network/information'
import {
  askForLeave, query_org, stuMakeUp, is_checkout
} from '/../../network/courseMakeup'

var dateTimePicker = require('../../utils/test1.js');
var app = getApp();

Page({
  data: {
    modalName: '',                             //补课时间选择器，值为DialogModal1时显示
    color: 'bg-olive solid shadow',            //课表颜色                                         
    islogin: false,                             //是否已登录
    isflag: false,                              
    orgid: 0,
    islayout: true,
    leaveoutinfo:{},
    causeinfo:'' ,
    leaveStartTime:'',
    leaveEndTime:'',
    layoutcause_id:'',
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
    imgList: [{
      id: 0,
      // url: '../../colorui/icon/icon_sign_in@2x.png',
      url: 'colorui/icon/icon_sign_in@2x.png',
      name: '信息登记'
    }, {
      id: 1,
      // url: '../../colorui/icon/icon_about_course@2x.png',
      url: 'colorui/icon/icon_about_course@2x.png',
      name: '课程相关'
    }, {
      id: 2,
      // url: '../../colorui/icon/icon_扫一扫@2x.png',
      url: 'colorui/icon/icon_scan@2x.png',
      name: '扫一扫'
    }, {
      id: 3,
      // url: '../../colorui/icon/icon_我的试听@2x.png',
      url: 'colorui/icon/icon_try_listen@2x.png',
      name: '我的试听'
    }, {
      id: 4,
      // url: '../../colorui/icon/icon_购物车@2x.png',
      url: 'colorui/icon/icon_carts@2x.png',
      name: '购物车'
    }, {
      id: 5,
      // url: '../../colorui/icon/icon_订单@2x.png',
      url: 'colorui/icon/icon_order@2x.png',
      name: '订单'
    }],
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
    deftime: '',          //课程时间，以毫秒为单位
    stime: null,          //补课开始时间
    etime: null,          //补课结束时间
    isshow: false,
    exitApp: false,
    date: '2021-01-01',
    time: '12:00',
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2050
  },

  //时间差
  _deftime(currentTime, completeTime){
    var stime = Date.parse(new Date(currentTime))
    var etime = Date.parse(new Date(completeTime))
    // console.log(stime)
    // console.log(etime)
    var usedTime = etime - stime

    var days = Math.floor(usedTime / (24 *3600 *1000));
    var leave1 = usedTime % (24 *3600 *1000)
    var hours = Math.floor(leave1 /(3600 * 1000))

    var leave2 = leave1 % (3600 * 1000)
    var minute = Math.floor(leave2 / (60 * 1000))

    var dayStr = days == 0 ? "" : days + "天"
    var hoursStr = hours == 0 ? "" : hours + "时"
    var time = dayStr + hoursStr + minute + "分"
    if(days > 0 || hours >= 4){
      var timeF = time + "可请假"
      console.log(timeF)
      return true
    }
    
    // return timeF

  },

  cancelM:function(e){
    this.setData({
      islayout: true
    })
  },

  confirmM:function(e){
    var that = this
    let data = {
      orgId: this.data.orgid ,
      courseId: this.data.layoutcause_id,
      leaveReason: this.data.causeinfo,
      userId:this.data.loginInfo.userid,
      leaveStartTime:this.data.leaveStartTime,
      leaveEndTime:this.data.leaveEndTime
    }
    console.log(data)
    askForLeave(data).then(res => {
      if(res.code == 200){
        this.setData({
          islayout:true
        })
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '补课',
          content: '确定是否申请补课？',
          success(res){
            if(res.confirm){
              that.makeup();
            }
          }
        })
      }

    })

  },

  _endtime(){
    var that = this
    var stime = this.data.dateTimeArray1[0][this.data.dateTime1[0]]+'-'+this.data.dateTimeArray1[1][this.data.dateTime1[1]]+'-'+this.data.dateTimeArray1[2][this.data.dateTime1[2]]+' '+this.data.dateTimeArray1[3][this.data.dateTime1[3]]+':'+this.data.dateTimeArray1[4][this.data.dateTime1[4]]
    var s = new Date(stime)
    var e = new Date()
    e.setTime(s.getTime() + this.data.deftime)
    this.setData({
      stime: stime + ':00',
      etime: this.data.dateTimeArray1[0][this.data.dateTime1[0]]+'-'+this.data.dateTimeArray1[1][this.data.dateTime1[1]]+'-'+this.data.dateTimeArray1[2][this.data.dateTime1[2]]+' '+e.getHours()+':'+e.getMinutes()+':00'
    })
  },
  //补课接口
  _makeup(){
    var that = this
    let data = {
      courseId: that.data.thatDay.courseInfo[0].courseId,
      orgId: that.data.orgid,
      userId: wx.getStorageSync('loginInfo').userid,
      originEndTime: that.data.leaveEndTime,
      originStartTime: that.data.leaveStartTime,
      makeupStartTime: that.data.stime,
      makeupEndTime: that.data.etime
    }
    console.log(data)
    stuMakeUp(data).then(res =>{
      that.setData({
        modalName: ''
      })
      if(res.code == 200){
        setTimeout(() => {
          wx.showToast({
            title: '补课申请成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '补课申请失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    })
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    this._endtime()
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },

  cancel(){
    this.setData({
      modalName: ''
    })
  },

  confirm(){
    var that = this
    that._makeup()
  },


  //补课
  makeup(){
    var that = this
    
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    this._endtime()
    wx.showModal({
      cancelColor: 'cancelColor',
      confirmText: '已协商',
      cancelText: '联系老师',
      title: '补课申请',
      content: '请先与授课老师进行协商沟通补课时间',
      success(res){
        if(res.confirm){
          //选择日期和时间
          that.setData({
            modalName: 'DialogModal1'
          })

        }else if(res.cancel){
          //退出小程序
          wx.getSystemInfo({
            success: function(res) {
              if(res.SDKVersion>="2.1.0"){
                that.setData({
                  exitApp:true//data中的初始化变量
                })
              }
            }
          })
        }
      }
    })
  },

  _Cause:function(e){
    this.setData({
      causeinfo:e.detail.value
    })
  },

  //点击课程签到，请假，补课判断
  _judgechose(e){
    // askForLeave()
    console.log(e)
    var time = e.currentTarget.dataset.data.courseTime.substring(0,16)
    var starttime = e.currentTarget.dataset.data.courseTime.substring(0,16) + ':00'
    var endtime = e.currentTarget.dataset.data.courseTime.substring(0,11) + e.currentTarget.dataset.data.courseTime.substring(17,23) + ':00'
    // console.log(endtime)
    this.setData({
      leaveStartTime:starttime,
      leaveEndTime:endtime,
      layoutcause_id:e.currentTarget.dataset.data.courseId
    })
    var dateTimes = Date.parse(new Date())
    var stime = Date.parse(this.data.leaveStartTime)
    var etime = Date.parse(this.data.leaveEndTime)
    this.setData({
      deftime: etime - stime
    })
    var checkout = {
      courseId:e.currentTarget.dataset.data.courseId,
      userId: this.data.loginInfo.userid
    }
    is_checkout(checkout).then(res => {
      if(res.code == 200){
        console.log(res)
        this.setData({
          leaveoutinfo:res
        })
      }
      if (this.getInfoCallback) {
        this.getInfoCallback(res)     //这里为了防止网络获取延迟，设置回调函数
      }
    })
    
    // console.log(dateTimes)
    // console.log(time)
    query_org(e.currentTarget.dataset.data.courseId).then(res => {
      if(res.code == 200){
        console.log(res.data.organizationId)
        this.setData({
          orgid:res.data.organizationId
        })
      }
    })
    console.log(e.currentTarget)
    //四小时以上并且正常课序并没有请假的
    
    if(this._deftime(dateTimes,time) && e.currentTarget.dataset.data.coursetype > 0){
      
      this.getInfoCallback = res =>{
        let check_out = false
  
        let data = this.data.leaveoutinfo.data
        console.log(data)
        for(var i=0;i<data.length;i++){
          if(data[i].leaveStartTime.substring(0,16) == time  && data[i].isChecked == 10) {
            check_out = true
          }
        }
          if(check_out == false){
            this.setData({
              islayout: false
            })
          }
          else{
            var that = this
            wx.showModal({
              cancelColor: 'cancelColor',
              title: '请假审核中',
              content: '确定是否申请补课？',
              success(res){
                if(res.confirm){
                  that.makeup();
                }
              }
            })
          }
      }
    }
    //已经请了假但是还没有申请补课的
    else if(e.currentTarget.dataset.data.courseNo == -3){
      this.makeup()
    }
    //已经申请了补课但是还没有通过的
    else if(e.currentTarget.dataset.data.courseNo == -1){
      wx.showToast({
        title: '已申请补课，请留意通知',
      })
    }
    //已经申请了补课并且已经通过了的
    else if(e.currentTarget.dataset.data.courseNo == -2){
      wx.showToast({
        title: '补课请求已通过，请查询新课程',
      })
    }
    //跳转到签到页面
    else{
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '签到',
        content: '确定是否签到？',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../sign/sign',
            })
          }
        }
      })
    }
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
    let today = new Date()
    let monthcheck = this.data.monthPlan
    var color = ''     //正常上课，补课颜色区分
    var year = today.getFullYear()
    var month = today.getMonth() + 1
    var day = today.getDate()
    var monthday = new Date(year,month,0)
    let currentWeekNum = parseInt((monthcheck.length - monthday.getDate() + day - 1)/7) + 1;
    console.log(currentWeekNum)
    let weekPlan = []
    scheduleQuery(data).then(res=>{
      console.log(res)
      let monthPlan = this.data.monthPlan
      for(let i=0; i<monthPlan.length; i++){
        for(let j=0; j<res.data.length; j++){
          if(monthPlan[i].date == res.data[j].courseTime.substring(0, 10)){
            if(res.data[j].courseNo == -1){
              color = 'bg-red solid shadow'
              monthPlan[i].courseNo = -1;
            }else if(res.data[j].courseNo == -2){
              color = 'bg-green solid shadow'
              monthPlan[i].courseNo = -2;
            }else if(res.data[j].courseNo == -3){
              color = 'bg-blue solid shadow'
              monthPlan[i].courseNo = -3;
            }else if(res.data[j].courseNo == -4){
              color = 'bg-red solid shadow'
              monthPlan[i].courseNo = -4;
            }else{
              color = 'bg-olive solid shadow'
              monthPlan[i].courseNo = 0;
            }
            monthPlan[i].exist = true;
            monthPlan[i].color = color;
            monthPlan[i].courseInfo.push({name: res.data[j].name,courseId: res.data[j].courseId, courseTime: res.data[j].courseTime, site: res.data[j].site , courseNo:res.data[j].courseNo, color: color})
            
          }
          
          continue;
        }
        let len = monthPlan[i].courseInfo.length
        for(var k=0;k<len;k++){
          for(var v=k+1;v<len;v++){
            if(monthPlan[i].courseInfo[k].courseTime==monthPlan[i].courseInfo[v].courseTime){
              monthPlan[i].courseInfo[k].courseNo = monthPlan[i].courseInfo[v].courseNo
              monthPlan[i].courseInfo[v].courseNo = -999
            }
          }
        }
        for(var l=0;l<len;l++){
          if(monthPlan[i].courseInfo[l]){
            if(monthPlan[i].courseInfo[l].courseNo==-999){
              monthPlan[i].courseInfo.splice(l,1)
              l = 0;
              len = monthPlan[i].courseInfo.length
            }
          } 
        }
        // let index = monthPlan[i].courseInfo.indexOf('needToDelete')
        // while(index>0){
        //   monthPlan[i].courseInfo.splice(index,1)
        //   index = monthPlan[i].courseInfo.indexOf({})
        // }
        if(monthPlan[i].name == this.data.currentDay){
          dayPlan = monthPlan[i]
          currentWeekNum = parseInt(i / 7) + 1
        }
      }
      for(let k=(currentWeekNum-1)*7; k<currentWeekNum*7; k++){
        weekPlan.push(monthPlan[k])
      }
      wx.setStorageSync('dayPlan', dayPlan)
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
        let show = JSON.parse(show2code);
        console.log(show)
        wx.setStorageSync('show2code',show);

        setTimeout(() => {
          wx.showToast({
            title: '查询成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
        if(show.type == 1){
          wx.navigateTo({
            url: '../detail/detail?orgid='+show.content.orgId,
          })
          //this._judgepage(wx.getStorageSync('loginInfo').userid)
        }else if(show.type == 2){
          wx.navigateTo({
            url: '../sign/sign',
          })     
        }else if(show.type == 3){
          if(show.content){
            app.globalData.marketers = show.content.id
          }
          wx.navigateTo({
            url: '../propaganda/propaganda',
          })     
        } 
      },
      fail: (res) => {
      setTimeout(() => {
        wx.showToast({
          title: '查询失败！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
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
        setTimeout(() => {
          wx.showToast({
            title: '切换成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
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
      setTimeout(() => {
        wx.showToast({
          title: '该账户只有一个身份！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }
    
  },

  //获取用户的个人信息
  _getStuInfo(){
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    getStuInfo(data).then(res=>{
      if(res.code==200){  
        wx.setStorageSync('getstuinfo', res.data)
      }
    });
  },

  _judgepage:function(data){
    console.log(data)
    getOrgNum(data).then(res => {
      console.log(res)
      if(res.code==200){
        console.log("机构信息获取成功")
      }
      if(res.data.length == 1){
        wx.navigateTo({
          url: '../detail/detail?orgid='+ res.data[0].orgId,
        });
      }
      else if(res.data.length > 1){
        wx.navigateTo({
          url: '../mainpage/mainpage',
        });
      }
      else{
        console.log("当前用户还没有报名机构")
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  //console.log(wx.getStorageSync('loginInfo'.userid))
  //this._judgepage(wx.getStorageSync('loginInfo').userid)
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
    this._getStuInfo();
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