import {
  getOrgAllInfo,orgInter
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
    code: '',
    index: '',
    flag: false //判断学生是否已经登记个人信息
  },

  follow(){
    var that = this;
    if(wx.getStorageSync('loginInfo')){
      that.orgIn();
    }else{
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:JSON.parse(wx.getStorageSync('show2code')),
      loginInfo:wx.getStorageSync('loginInfo')
    })
    if(wx.getStorageSync('getstuinfo')){
      this.setData({
        flag:true
      })
    }
    this.showmsg()
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
          title: '已报名，请勿重复报名！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
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
  showmsg(){
    var that=this;
    that._getOrgAllInfo()
  },
  //机构报名*************************************************************
  orgIn(e){
    
    
    let logininfo = wx.getStorageSync('loginInfo')
    if(!this.data.flag){
      setTimeout(() => {
        wx.showToast({
          title: '请先登记个人信息！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    } else{
      this._orgInter(logininfo.userid);
    }

  },

  watchAllClass(e){
    if(!this.data.flag){
      setTimeout(() => {
        wx.showToast({
          title: '请先登记个人信息！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else{
      var that = this
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
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if(app.globalData.isfollow)(
      app.globalData.isfollow = false,
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '是否关注？',
        content: '请您选择是否关注该机构？',
        confirmText: '关注',
        success (res) {
          if(res.confirm){
            that.follow()
          }
        }
      })
    )
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