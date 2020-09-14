// pages/detail_teacher/detail_teacher.js
import {
  getDetail
} from '../../network/search'

// Page({

//   /**
//    * 页面的初始数据
//    */




//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     console.log("ddddddd")
//     wx.getSystemInfo({
//       success: (res)=> {
//         this.setData({
//           minHeight: res.windowHeight
//         });
//       }
//     });
//     this.setData({
//      name: options.name
//    });
//     this.getTeacherDetail(options.current)
//     console.log('teachers:', this.data.teacher)
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
    
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//    console.log(this.data.teacher)
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
Page({

  data: {
    teacher : {},
    name : {},
    screen : {
      minHeight : 'auto'
    },
    flag : false

  },

    getTeacherDetail: function(id){
    var url ='/teacher/' + id
    getDetail(url).then(res =>{
      this.setData({
        teacher : res,
        flag : true
      });
    });
  },

  onLoad: function(options){
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          minHeight: res.windowHeight
        });
      }
    });
    this.setData({
     name: options.name
   });
   this.getTeacherDetail(options.current)
  }
})