// pages/detail/detail.js
import {
  getDetail, getOrgAct,checkOrg,getRelation
} from '../../network/search'
import {
  orgInter
} from '../../network/orginout'
import {
  scheduleQuery
} from '../../network/scheduleQuery'
var URL;
var app = getApp();
//baseURL
URL = {
    //机构的统一地址
    instituteDetil : '/organization/' ,
    institute_teacherDetail : '/teacher?orgId=' ,
    teacherDetail : '/teacher/',
    course: '/course/'
    //其他接口暂未开放
  }
//暴露出来的接口


//网络请求方法


Page({

  /**
   * 页面的初始数据
   */
  data: {
    institute : {},
    institute_teachers : {},
    teacher : [],
    course : {},
    flag: false,
    isstu: false,
    isplay: false, //视频是否自动播放
    screen : {
      minHeight : 'auto'
    },
    common : {},
    degs: 0,
    degss: 0,
    degsss: 0,
    degs_course: 0,
    orgid: 0,
    islogin: false,
    activity: {},
    stuflag: false, //判断学生是否已经登记个人信息,
    issignup: false, //判断学生是否已经报名
    indicatorDots: true,
    autoplay: false, // 自动播放
    interval: 5000, //轮播时间
    duration: 300, // 滑动速度越大越慢
    circular: true, //是否循环
    beforeColor: "lightgray", //指示点颜色
    afterColor: "red", //当前选中的指示点颜色
    // 轮播数据 + 效果 E
    controls: false,
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

  //自动播放视频
  play: function ready(){
/** 监控视频是否需要播放 */
let screenHeight = wx.getSystemInfoSync().windowHeight   //获取屏幕高度
let topBottomPadding = (screenHeight - 80)/2 //取屏幕中间80的高度作为播放触发区域，然后计算上下视窗的高度 topBottomPadding
// 80这个高度可以根据UI样式调整，我这边基本两个视频间隔高度在100左右，超过了两个视频之间的间隔，就会冲突，两个视频会同时播放，不建议过大

const videoObserve = this.createIntersectionObserver()
videoObserve.relativeToViewport({bottom: -topBottomPadding, top: -topBottomPadding})
    .observe(`#emotion${this.data.randomId}`, (res) => {
        let {intersectionRatio} = res
        if(intersectionRatio === 0) {
            //离开视界，因为视窗占比为0，停止播放
            this.setData({
                isplay: false
            })
        }else{
            //进入视界，开始播放
            this.setData({
                isplay: true
            })
        }

    })
  },

  //课程表内容
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
    let currentWeekNum = parseInt((monthcheck.length - monthday.getDate() + day - 1)/7) + 1;
    console.log(currentWeekNum)
    let weekPlan = []
    scheduleQuery(data).then(res=>{
      let monthPlan = this.data.monthPlan
      for(let i=0; i<monthPlan.length; i++){
        for(let j=0; j<res.data.length; j++){
          if(monthPlan[i].date == res.data[j].courseTime.substring(0, 10)){
            monthPlan[i].exist = true;
            monthPlan[i].courseInfo.push({name: res.data[j].name,courseId: res.data[j].courseId, courseTime: res.data[j].courseTime, site: res.data[j].site})
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
  
  teacher(e){
    let index = e.currentTarget.dataset.menuindex
    wx.navigateTo({
      url: '../detail_teacher/detail_teacher?current='+this.data.institute_teachers.data[index].baseInfo.userid+'&name='+this.data.institute_teachers.data[index].authInfo.name,
    })
},

 course(e){
    let index = e.currentTarget.dataset.menuindex
    wx.navigateTo({
      url: '../courseinfo/courseinfo?index='+this.data.course.data[index].courseId+'&orgid='+this.data.orgid,
    })
 },
  getInstituteDetail (id) {
    console.log(id)
    var url = URL.instituteDetil + id;
    
    console.log(url);
    getDetail(url).then(res => {
      console.log(res);
      
      //console.log(res);
      var url1 = URL.institute_teacherDetail + res.data.orgInfo.orgId;
      //console.log(url1);
      getDetail(url1).then(res1 => {
      //console.log(res1);
      
     /* var list = [];
      for(var i=0; i<res1.data.length;i++){
        var url2 = URL.teacherDetail + res1.data[i].baseInfo.userid;
        
        getDetail(url2).then(res2 => {
          console.log(res2);
          list[i] = res2.data.adverPhoto
        })
        
      }*/
      
      
      
      
      //console.log('teacher:',this.data.teacher);
      this.setData({
        institute : res,
        institute_teachers : res1,
        //teacher : list
      })
      //console.log(this.data.institute)
    });
    });
    
    
  },

  _orgInter(userid){
    
    let data={
      orgId: this.data.orgid,
      userid:userid
    }
    orgInter(data).then(res=>{
      console.log(res)
      if(res.code==200){
        this.pushMsg(userid) 
        this.setData({
          issignup: true
        })       
        setTimeout(() => {
          wx.showToast({
            title: '报名成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '报名失败！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    } 
    });
    
  },

   //机构报名*************************************************************
   orgIn(e){
    if(!this.data.islogin){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '您还未登录，请您选择登录或者注册',
        title: '关注提示',
        confirmText: '登录',
        cancelText: '注册',
        success(res) {
          if(res.confirm){
            app.globalData.isfollow = true;
            wx.navigateTo({
              url: '../loginPhone/loginPhone',
            })
          }
          if(res.cancel){
            app.globalData.isfollow = true;
            wx.navigateTo({
              url: '../registPhone/registPhone',
            })
          }
        }
      })
    }else if(this.data.issignup){
      setTimeout(() => {
        wx.showToast({
          title: '您已经报名了！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    } else{
      this._orgInter(wx.getStorageSync('loginInfo').userid);
    }
  },

  movehome(){
    if(!this.data.islogin){
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '您还未登录，请您选择登录或者注册',
        title: '关注提示',
        confirmText: '登录',
        cancelText: '注册',
        success(res) {
          if(res.confirm){
            app.globalData.isfollow = true;
            wx.navigateTo({
              url: '../loginPhone/loginPhone',
            })
          }
          if(res.cancel){
            app.globalData.isfollow = true;
            wx.navigateTo({
              url: '../registPhone/registPhone',
            })
          }
        }
      })
    } else{
      wx.redirectTo({
        url: '../my-stu/my-stu',
      })
    }
    
  },

  pushMsg(userid){
    wx.requestSubscribeMessage({
      tmplIds: ["Ay8VcpCaY_bqB_uvjLntnShzPXcsv_0J4Ya3JuEwHEc","Db5GfNzzqozgQdnHfpZYyFRgFIRewm1omkQe-8lF9Zc","K-ydX0jPEK45csXyNtmqKCg-mSDyK7VLebN94IGtoBM"],
      success (res) {
        console.log("可以进行推送")
        console.log(res)
       },
       fail (res) {
        console.log("code:",res.errCode)
        console.log("Mes",res.errMsg)
       }
    })
    // wx.request({
    // url: config.service.sendMsgUrl,
    // data: { 
    //   code: app.globalData.code, 
    //   template_id: '7BcxJPhRmjyDlIMHHqzXY3aDaICHOwdvVR6uHw8EvCk',
    //   userid: userid,
    //   orgid: this.data.orgid
    // },
    // method: 'POST',
    // success: function (res) {
    // console.log("push msg");
    // console.log(res);
    // },
    // fail: function (err) { 
    // console.log("push err")
    // console.log(err);
    // }
    // });
   },

  getCourse : function(id){
    var url = URL.course + id
    //console.log(url)
    getDetail(url).then(res =>{
      this.setData({
        course : res
      })
    });
  },

  rotateAnim: function(){
    let deg = this.data.degs
    deg = deg == 0 ? 90 : 0
    this.setData({
      degs: deg,
    })
  },
  
  rotateAnim1: function(){
    let deg1 = this.data.degss
    deg1 = deg1 == 0 ? 90 : 0
    this.setData({
      degss: deg1
    })
  },

  rotateAnim2: function(){
    let deg2 = this.data.degsss
    deg2 = deg2 == 0 ? 90 : 0
    this.setData({
      degsss: deg2
    })
  },

  //初始化是否展示课表
  Init_showCT:function(){
    let data = {
      orgid: this.data.orgid,
      userid: wx.getStorageSync('loginInfo').userid
    }
    getRelation(data).then(res => {
      // console.log(res)
      this.setData({
        degs_course: 90
      })
      var _this = this
      if(res.data.course.length == 0){
        setTimeout(function(){
          _this.setData({
            degs_course:0
          })
        },5000)
      }
    })
  },

  showCT:function(){
    let degs_course = this.data.degs_course
    degs_course = degs_course == 0 ? 90 : 0
    this.setData({
      degs_course: degs_course 
    })
  },

  // videoPlay: function() {
  //   console.log("开始播放")
  //   var videoplay = wx.createVideoContext("video");
  //   videoplay.play()
  //   this.setData({
  //     controls: true,
  //   })
  // },
  
  //获取当前机构的近期活动
  _getOrgAct:function(data){
    getOrgAct(data).then(res =>{
      // console.log(res)
      this.setData({
        activity: res
      })
      if(this.getInfoCallback){
        this.getInfoCallback(res)
      }
    })
    // console.log(this.data.activity)
  },

  _checkOrg:function (data) {
    checkOrg(data).then(res => {
      console.log(res)
      if(res.data.isCheck == 1){
        this.setData({
          issignup :true
        })
      }
    })
  },

course_reserve(){
  if(!this.data.islogin){
    wx.showModal({
      cancelColor: 'cancelColor',
      content: '您还未登录，请您选择登录或者注册',
      title: '关注提示',
      confirmText: '登录',
      cancelText: '注册',
      success(res) {
        if(res.confirm){
          app.globalData.isfollow = true;
          wx.navigateTo({
            url: '../loginPhone/loginPhone',
          })
        }
        if(res.cancel){
          app.globalData.isfollow = true;
          wx.navigateTo({
            url: '../registPhone/registPhone',
          })
        }
      }
    })
  }else{
    wx.redirectTo({
      url: '../propaganda/propaganda?orgid=' + this.data.orgid ,
    })
  }
  
},


  onShareTimeline(res){
        console.log(res)
        return {
          title: '测试小程序分享至朋友圈',
          path: '../detail/detail?orgid='+this.data.orgid,
          imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
        }
    
      },

  //测试功能
  test(){
    wx.redirectTo({
      url: '../test/test',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    if(wx.getStorageSync('getstuinfo')){
      this.setData({
        stuflag:true
      })
    }
    if(wx.getStorageSync('loginInfo')){
      this.setData({
        islogin: true
      })
    }
    if(wx.getStorageSync('loginInfo')&&wx.getStorageSync('loginInfo').defaultRole == 3){
      this.setData({
        isstu: true,
        orgid: option.orgid
      })
      let data = {
        userid: wx.getStorageSync('loginInfo').userid,
        orgid: option.orgid
      }
      this._checkOrg(data)
    }
    var self = this;
      wx.getSystemInfo({
       success: function( info ) {
          self.setData({
            'screen.minHeight' : info.windowHeight + 'px'
          });
        }
      })
    //获取数据
      self.getInstituteDetail(option.orgid) ;
      self.getCourse(option.orgid)
      self._getOrgAct(option.orgid)
    // this._getOrgInfo()
    this.getInfoCallback = res =>{
      // console.log("以下")
      // console.log(res)
      
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
    if(this.data.isstu){
      this.Init_showCT()
      this._scheduelQuery(data);
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


