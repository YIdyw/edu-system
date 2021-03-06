import {
  getAllorg,deleteListen
} from '../../network/orginout'
import {
  getMylisten,estimateClass,myListen
} from '../../network/aboutclass'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx:"",
    flag:0,
    esmessage:""
  },
  _myListen(){
    let that=this;
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    myListen(data).then(res=>{
      console.log(res)
      if(res.code==200){ 
        wx.setStorageSync('getmylisten',res.data);       
        this.setData({
          getmylisten: wx.getStorageSync('getmylisten')
        })
        this.setData({
          modalName: null
        })
    }
    });
  },
  // _getMylisten(){
  //   var that=this;
  //   var idx=that.data.idx;
  //   let data={
  //     orgid:wx.getStorageSync('getallorg')[idx].orgId,
  //     userid:wx.getStorageSync('loginInfo').userid
  //   }
  //   getMylisten(data).then(res=>{
  //     console.log(res)
  //     if(res.code==200){ 
  //       wx.setStorageSync('getmylisten',res.data);       
  //       this.setData({
  //         getmylisten: wx.getStorageSync('getmylisten')
  //       })
  //       this.setData({
  //         modalName: null
  //       })
  //   }
  //   });
  // },

  // _getAllorg(){
  //   getAllorg().then(res=>{
  //     console.log(res)
  //     if(res.code==200){ 
  //       wx.setStorageSync('getallorg',res.data);       
  //       this.setData({
  //         getallorg: wx.getStorageSync('getallorg')
  //       })
  //   }
  //   });
  // },

  _deleteListen(){
    var that=this
    var courseId=wx.getStorageSync('getmylisten')[0].courseId
    console.log(courseId)
    let data={
      userid:wx.getStorageSync('loginInfo').userid,
      courseId:courseId
    }
    console.log(data)
    deleteListen(data).then(res=>{
      console.log(res)
      if(res.code==200){ 
        that._myListen()
        wx.showToast({
          title: '取消成功',
        });
        this.setData({
          modalName3: null
        })
      }else{
        wx.showToast({
          title: '退选失败',
          icon: 'none'
        })
      }
    });
  },
  _estimateClass(){
    var that=this;
    let data={
      courseid:wx.getStorageSync('getmylisten')[0].courseId,
      remark:that.data.esmessage,
      star:that.data.flag,
      stuid:wx.getStorageSync('loginInfo').userid
    }
    estimateClass(data).then(res=>{
      console.log(res)
      this.setData({
        modalName4: null
      })
      if(res.code==200){ 
        wx.showToast({
          title: '评价成功',
        });
      }else{
        wx.showToast({
          title: '评价失败',
          icon: 'none'
        })
      }
    });
  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  },
  estimate(e){
    this.setData({
      modalName4: e.currentTarget.dataset.target
    })
  },
  choosedelete(e){
    this.setData({
      modalName3: e.currentTarget.dataset.target
    })
  },
  chooseorg(e){
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  cancel(e) {
    this.setData({
      modalName: null
    })
  },
  cancel2(e) {
    this.setData({
      modalName3: null
    })
  },
  chooseorg1(e){
    var that=this;
    that.data.idx=e.target.id;
  },
  chooseorg2(e){
    console.log(e)
    var that=this;
    that.data.idx=e.target.id;
  },
  message(e){
    this.setData({
      esmessage: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // getmylisten(e){
  //   var that=this;
  //   this.setData({
  //     modalName2: e.currentTarget.dataset.target
  //   })
  //   that._getMylisten()
  // },
  estimateClass1(){
    var that=this;
    that._estimateClass()
  },
  deleteListen1(){
    var that=this;
    that._deleteListen()
  },
  onLoad: function (options) {
    var that=this;
    // that._getAllorg()
    that._myListen()
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