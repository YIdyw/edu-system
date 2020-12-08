// pages/adver/adver.js
import {
  adver, info
} from '../../network/adver'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    codeurl: '',
    imageWidth:0,
    imageHeight:0 
  },

  imgload: function(e){
    console.log("图片加载完成="+e.detail);
    //用来计算高宽
    this.setData(this.wxAutoImageCal(e));
 },

  wxAutoImageCal(e){
    //获取图片的原始长宽
    var originalWidth = e.detail.width;
    var originalHeight = e.detail.height;
    var windowWidth = 0,windowHeight = 0;
    var imageWidth= 0,imageHeight= 0;
    var results= {};
   //获取屏幕信息
  wx.getSystemInfo({
      success: function(res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        //判断按照那种方式进行缩放
        if(originalWidth > windowWidth){//在图片width大于手机屏幕width时候
          imageWidth= windowWidth;
          imageHeight= (imageWidth*originalHeight)/originalWidth;
          results.imageWidth= imageWidth;
          results.imageHeight= imageHeight;
        }else{//否则展示原来的数据
          results.imageWidth= originalWidth;
          results.imageHeight= originalHeight;
        }
      }
    })
    return results;
  },

  _info(){
    let data = wx.getStorageSync('loginInfo').userid
    info(data).then(res =>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          info: res.data
        })
      }
    })
  },
  _adver(){
    let data = wx.getStorageSync('loginInfo').userid
    adver(data).then(res =>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          codeurl: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that._adver()
    that._info()
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

  onShareTimeline(res){
    console.log(res)
    return {
      title: '测试小程序分享至朋友圈',
      path: '../adver/adver',
      imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594374964481&di=3ceba827e91e126012c43de3887a58c7&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fpkm%2Fpk%2F13.jpg'
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    console.log("分享")
    return {
      title: "分享卡片",
      path: '../adver/adver',
      }
  }
})