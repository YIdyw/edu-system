import {
  getMyorg,getMyclass,deleteOrg,signIn,getMyorgclass,chooseClass,deleteClass
} from '../../network/aboutclass'

var app = getApp()
Page({

  data: {
    currentTab:0,  //头部标签，机构、课程、查找课程
    loginInfo:"",  //个人登录信息
    getmyorg:"",   //已报名机构
    getmyorgclass:"", //在某机构下报名的课程
    getmyclass:"",    //全部课程
    index: null,      //获取机构信息机构列表下标
    index1:null,      //获取某机构课程列表的下标
    idx:"",          //取消某个机构报名的下标
    idxx:"",         //退选某个课程时的下标（已废弃该功能）
    begintime:[],    //所有课程的开始时间
    endtime:[],      //所有课程的结束时间
    status:[],        //所有课程的状态
    current_scroll: 'tab1',  //查找课程时的标签
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
  },

  onLoad: function (options) {
    this._getMyorg()
    this._getMyclass()
    this.setData({     
      getmyorgclass:wx.getStorageSync('getmyorgclass'),  
    })
    
  },

  //顶部标签选择函数**********************************************
  swiperChange: function (e) {   
    console.log(e);     
    this.setData({     
      currentTab: e.detail.current,     
    })
     
  },

  //获取已报名的机构列表**********************************************
  _getMyorg(){
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    getMyorg(data).then(res=>{
      console.log(res)
      wx.setStorageSync('getmyorg',res.data);
      this.setData({
        getmyorg: res.data,
      })
    });
  },

  //取消课程报名（已弃用）**********************************************
  _deleteClass(){
    var that=this;
    var idxx=that.data.idxx;
    var getmyclass=wx.getStorageSync('getmyclass');
    let data={
      userid:wx.getStorageSync('loginInfo').userid,
      courseid:getmyclass[idxx].courseId
    }
    deleteClass(data).then(res=>{
      console.log(res)
      if(res.code==200){   
        that._getMyclass()
        setTimeout(() => {
          wx.showToast({
            title: '退选成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '退选失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }       
    });
  },

  //获取已报名的课程**********************************************
  _getMyclass(){
    var that=this;
    var begintime=that.data.begintime;
    var endtime=that.data.endtime;
    var status=that.data.status
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    getMyclass(data).then(res=>{
      console.log(res)
      wx.setStorageSync('getmyclass',res.data);
      for(let j=0; j<res.data.length; j++){
        if(res.data[j].startTime != null){
          begintime[j]=res.data[j].startTime.substring(0,10)
        }
        if(res.data[j].endTime != null){
          endtime[j]=res.data[j].endTime.substring(0,10)
        }  
        
        //审核通过，决定状态和课程记录
        if(res.data[j].status=="success"){
          status[j]= true
        }else{
          status[j]= false
        }
      }
      this.setData({
        getmyclass: res.data,
        begintime:begintime,
        endtime:endtime,
        status:status
      })
    });
  },

  //“查找课程”中查找某个已报名机构下的课程**********************************************
  _getMyorgclass(){
    var that=this;
    var index=that.data.index;
    var getmyorg=wx.getStorageSync('getmyorg');
    let data={
      id:getmyorg[index].orgId,
      userid:wx.getStorageSync('loginInfo').userid
    }
    getMyorgclass(data).then(res=>{
      console.log(res)
      wx.setStorageSync('getmyorgclass',res.data);
      this.setData({
        getmyorgclass: res.data,
      })
    });
  },

  //报名课程（已弃用）**********************************************
  _chooseClass(){
    var that=this;
    var index1=that.data.index1;
    var getmyorgclass=wx.getStorageSync('getmyorgclass');
    let data={
      userid:wx.getStorageSync('loginInfo').userid,
      courseid:getmyorgclass[index1].courseId
    }
    chooseClass(data).then(res=>{
      console.log(res)
      if(res.code==200){        
        setTimeout(() => {
          wx.showToast({
            title: '选修成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '选修失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }       
    });
  },

  //取消报名机构**********************************************
  _deleteOrg(){
    var that=this;
    var idx=that.data.idx;
    var getmyorg=wx.getStorageSync('getmyorg');
    let data={
      orgid:getmyorg[idx].orgId,
      userid:wx.getStorageSync('loginInfo').userid
    }
    deleteOrg(data).then(res=>{
      console.log(res)
      if(res.code==200){ 
        that._getMyorg()       
        setTimeout(() => {
          wx.showToast({
            title: '已取消！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '操作失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }       
    });
  },

  //进入签到页面**********************************************
  _signIn(){
    wx.navigateTo({
      url: '../stuInfo/stuInfo?courseId='+this.data.getmyclass[this.data.idxx].courseId,
    })
  },

  //进入机构信息页面**********************************************
  getinorg(e){
    console.log(e)
    wx.redirectTo({
      url: '../detail/detail?orgid='+this.data.getmyorg[e.currentTarget.id].orgId,
    })
  },
    //tab栏选择**********************************************
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {     
      return false;     
    } else {     
    that.setData({     
      currentTab: e.target.dataset.current,     
    })
     
    }
     //查询机构******************************************************
    if(that.data.currentTab==0){
      that._getMyorg()
    }
    //查询课程****************************************************
    else if(that.data.currentTab==1){
      that._getMyclass()
    }
    else if(that.data.currentTab==2){
  
    }
    },
    //查找课程中选择机构******************************************
  chooseorg(e) {
    var that=this;
    this.setData({
      index: e.detail.value
    })       
    that._getMyorgclass()
    },

  //查找课程中选择课程**********************************************
  chooseclass(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    }) 
  },

  //查找课程中查看课程按钮**********************************************
  chooseclass1(){
    wx.navigateTo({
      url: '../courseinfo/courseinfo?index='+this.data.getmyorgclass[this.data.index1].courseId+'&orgid='+this.data.getmyorg[this.data.index].orgId,
    })
  },

  //调用deleteclass取消报名课程（已弃用）**********************************************
  deleteclass(e){
    var that=this;
    that.data.idxx=e.currentTarget.id;
    that._deleteClass()
  },

  //调用deleteorg取消报名机构**********************************************
  deleteorg(e){
    var that=this;
    that.data.idx=e.currentTarget.id;
    that._deleteOrg()
  },

  //调用signin进入签到页面**********************************************
  signin(e){
    var that=this;
    that.data.idxx=e.currentTarget.id;
    that._signIn()
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