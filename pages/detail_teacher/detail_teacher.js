// pages/detail_teacher/detail_teacher.js
import {
  getDetail, getTeacherCourse
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
    teacher : {},//老师个人信息
    name : {},//老师姓名
    screen : {
      minHeight : 'auto'
    },
    degs: 0, 
    teacher_course: {},
    flag : false  //控制图片显示（能查询到该老师信息就为真）

  },

  rotateAnim: function(){
    let deg = this.data.degs
    deg = deg == 0 ? 90 : 0
    this.setData({
      degs: deg,
    })
  },

  //获取老师信息******************************************
    getTeacherDetail: function(id){
    var url ='/teacher/' + id
    getDetail(url).then(res =>{
      this.setData({
        teacher : res,
        flag : true
      });
      this._getTeacherCourse(res.data.userid)
    });
  },

  _getTeacherCourse:function(id) {
    getTeacherCourse(id).then(res => {
      console.log(res)
      this.setData({
        teacher_course: res.data
      })
    })
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