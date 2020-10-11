import {
  orgInter,listenClass
} from '../../network/orginout'
import {
  getMyorgclass
} from '../../network/aboutclass'
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:"",
    idxx:"",
    count:"",
    time: "",
    orgmessage:"",
    dateinput:"",
    loginInfo:"",
    isstu: false
  },

  tolistenclass(e){
    let index = e.currentTarget.dataset.menuindex
    let idindex = this.data.idx
    let getlistenclass = wx.getStorageSync('getlistenclass')
    wx.navigateTo({
      url: '../courseinfo/courseinfo?index='+getlistenclass[index].courseId+'&orgid='+this.data.orgmessage[idindex].orgId,
    })
  },
  _orgInter(){
    var that=this;
    var idx=that.data.idx;
    let data={
      orgId:that.data.orgmessage[idx].orgId,
      userid:that.data.loginInfo.userid
    }
    orgInter(data).then(res=>{
      console.log(res)
      if(res.code==200){        
        setTimeout(() => {
          wx.showToast({
            title: '报名成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '已报名，请勿重复报名！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    } 
    });
  },
  
  //获取该机构学生尚未选修的课程
  _getMyorgclass(){
    var that=this;
    var idx=that.data.idx;
    let data={
      id:that.data.orgmessage[idx].orgId,
      userid:that.data.loginInfo.userid
    }
    console.log(data)
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
    var that=this;
    var idxx=that.data.idxx;
    console.log(idxx.length )
    if (idxx.length == 0){
      setTimeout(() => {
        wx.showToast({
          title: '需要刷新数据！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    } else {
      var getclass=wx.getStorageSync('getlistenclass')
      let data={      
        courseId:getclass[idxx].courseId,
        studentId:that.data.loginInfo.userid,
        trialTime:that.data.dateinput
      }
      console.log(data)
      listenClass(data).then(res=>{
        console.log(res)
        if(res.code==200){        
          setTimeout(() => {
            wx.showToast({
              title: '试听成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '现在无法试听该课程！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      } 
      });
    }  
  },
  //机构报名*************************************************************
  orgIn(e){
    var that = this;
    that.data.idx=e.currentTarget.id;
    if(!that.data.loginInfo.userid){
      setTimeout(() => {
        wx.showToast({
          title: '还未登录！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    } else{
      that._orgInter();
    }
  },

  trylisten(e){
    var that=this;
    that.data.idx=e.currentTarget.id;
    if(!that.data.loginInfo.userid){
      setTimeout(() => {
        wx.showToast({
          title: '还未登录！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    } else{
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
      that._getMyorgclass()
    }
  },
  cancel(e) {
    this.setData({
      modalName: null
    })
  },
  chooseLsclass(e){
    this.setData({
      idxx: e.target.id
    })
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
    if(wx.getStorageSync('getlistenclass').length > 0){
      that._listenClass()
    } else {
      setTimeout(() => {
        wx.showToast({
          title: '现在无可选择课程！',
          icon: 'none'
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
  onLoad: function (options) {
    var time = util.formatTime(new Date());  
    this.setData({
      orgmessage: wx.getStorageSync('orgmessage'),
      time: time,
      loginInfo: wx.getStorageSync('loginInfo'),
    })
    if(wx.getStorageSync('loginInfo')&&wx.getStorageSync('loginInfo').defaultRole == 3){
      this.setData({
        isstu: true
      })
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