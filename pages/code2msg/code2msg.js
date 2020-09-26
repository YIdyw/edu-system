import {
  getOrgAllInfo,orgInter,listenClass
} from '../../network/orginout'
import {
  getMyorgclass
} from '../../network/aboutclass'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:"",
    getorgallinfo:"",
    loginInfo:"",
    code: ''
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:JSON.parse(wx.getStorageSync('show2code')),
      loginInfo:wx.getStorageSync('loginInfo')
    })
  },

  _getOrgAllInfo(){
    let that=this;
    let data={
      orgid:that.data.show.orgId
    }
    getOrgAllInfo(data).then(res=>{
      console.log(res)
      wx.setStorageSync('getorgallinfo',res.data.orgInfo);
      this.setData({
        getorgallinfo: res.data.orgInfo,
      })
    });
  },

  _orgInter(userid){
    let that=this;
    let data={
      orgId:that.data.getorgallinfo.orgId,
      userid:userid
    }
    orgInter(data).then(res=>{
      console.log(res)
      if(res.code==200){
    
        wx.showToast({
          title: '报名成功',
        });
      
    }else{
      wx.showToast({
        title: '报名失败',
        icon: 'none'
      })
    } 
    });
    
  },
  //获取该机构学生尚未选修的课程
  _getMyorgclass(){
    let that=this;
    let data={
      id:that.data.getorgallinfo.orgId,
      userid:that.data.loginInfo.userid
    }
    getMyorgclass(data).then(res=>{
      console.log(res)
      if(res){
        wx.setStorageSync('getlistenclass',res.data);
        this.setData({
          getlistenclass: wx.getStorageSync('getlistenclass')
        })
      }
    });
  },
  _listenClass(){
    let that=this;
    var idxx=that.data.idxx;
    let getclass=wx.getStorageSync('getlistenclass')
    let data={      
      courseId:getclass[idxx].courseId,
      studentId:that.data.loginInfo.userid,
      trialTime:that.data.dateinput
    }
    console.log(data)
    listenClass(data).then(res=>{
      console.log(res)
      if(res.code==200){        
        wx.showToast({
          title: '试听成功',
        });
      
    }else{
      wx.showToast({
        title: '现在无法试听该课程',
        icon: 'none'
      }) 
    } 
    });
  },
  showmsg(e){
    var that=this;
    this.setData({
      modalName2: e.currentTarget.dataset.target
    })
    that._getOrgAllInfo()
  },
  //机构报名*************************************************************
  orgIn(e){
    
    
    let logininfo = wx.getStorageSync('loginInfo')
    if(!logininfo.userid){
      wx.showToast({
        title: '还未登陆！',
        icon: 'none'
      })
    } else{
      this._orgInter(logininfo.userid);
    }

  },

  trylisten(e){
    var that=this;
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    that._getMyorgclass()
  },
  cancel(e) {
    this.setData({
      modalName: null
    })
  },
  chooseLsclass(e){
    var that=this;
    that.data.idxx=e.target.id;
  },
  dateInput(e){
    this.setData({
      dateinput: e.detail.value
    })
  },
  chooseLsclass1(e){
    console.log(e)
    var that=this;
    that.data.idxx=e.target.id;
  },
  trylistenIn(e){
    var that=this;
    that._listenClass()
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