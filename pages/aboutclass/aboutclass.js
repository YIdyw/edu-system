import {
  getMyorg,getMyclass,deleteOrg,signIn,getMyorgclass,chooseClass,deleteClass
} from '../../network/aboutclass'
Page({

  data: {
    currentTab:0,
    loginInfo:"",
    getmyorg:"",
    getmyorgclass:"",
    getmyclass:"",
    index: null,
    index1:null,
    idx:"",
    idxx:"",
    begintime:[],
    endtime:[],
    status:[],
    currentTab:0,
    current_scroll: 'tab1',
  },

  onLoad: function (options) {
    this._getMyorg()
    this._getMyclass()
    this.setData({     
      getmyorgclass:wx.getStorageSync('getmyorgclass'),  
    })
    
  },
  swiperChange: function (e) {   
    console.log(e);     
    this.setData({     
      currentTab: e.detail.current,     
    })
     
  },
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
        begintime[j]=res.data[j].startTime.substring(0,10),
        endtime[j]=res.data[j].endTime.substring(0,10)
        if(res.data[j].status=="success"){
          status[j]="审核通过"
        }else{
          status[j]="审核中"
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
  _signIn(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },

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
    //选课功能**************************************************************************************
  chooseorg(e) {
    var that=this;
    this.setData({
      index: e.detail.value
    })       
    that._getMyorgclass()
    },    
  chooseclass(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    }) 
  },
  chooseclass1(){
    wx.navigateTo({
      url: '../courseinfo/courseinfo?index='+this.data.getmyorgclass[this.data.index1].courseId+'&orgid='+this.data.getmyorg[this.data.index].orgId,
    })
  },

  deleteclass(e){
    var that=this;
    that.data.idxx=e.currentTarget.id;
    that._deleteClass()
  },
  deleteorg(e){
    var that=this;
    that.data.idx=e.currentTarget.id;
    that._deleteOrg()
  },
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