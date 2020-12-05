// pages/detail/detail.js
import {
  getDetail, getOrgAct,checkOrg
} from '../../network/search'
import {
  orgInter
} from '../../network/orginout'
var URL;
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
    screen : {
      minHeight : 'auto'
    },
    common : {},
    degs: 0,
    degss: 0,
    degsss: 0,
    orgid: 0,
    islogin: false,
    activity: {}
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
    wx.requestSubscribeMessage({
      tmplIds: ['7BcxJPhRmjyDlIMHHqzXY3aDaICHOwdvVR6uHw8EvCk'],
      success (res) {
        console.log("可以进行推送")
       },
       fail (res) {
        console.log("code:",res.errCode)
        console.log("Mes",res.errMsg)
       }
    })
    let logininfo = wx.getStorageSync('loginInfo')
    if(!logininfo.userid){
      setTimeout(() => {
        wx.showToast({
          title: '还未登陆！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    } else{
      this._orgInter(logininfo.userid);
    }
  },
  movehome(){
    wx.redirectTo({
      url: '../my-stu/my-stu',
    })
  },

  pushMsg(userid){
    wx.request({
    url: config.service.sendMsgUrl,
    data: { 
      code: app.globalData.code, 
      template_id: '7BcxJPhRmjyDlIMHHqzXY3aDaICHOwdvVR6uHw8EvCk',
      userid: userid,
      orgid: this.data.orgid
    },
    method: 'POST',
    success: function (res) {
    console.log("push msg");
    console.log(res);
    },
    fail: function (err) { 
    console.log("push err")
    console.log(err);
    }
    });
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
          islogin:true
        })
      }
    })
  },



  onShareTimeline(res){
        console.log(res)
        return {
          title: '测试小程序分享至朋友圈',
          path: '../adver/adver',
          imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
        }
    
      },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //console.log(option.judge);
    console.log(option)
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


