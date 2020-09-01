// pages/courseinfo/courseinfo.js
import {
 idGetOrgCourse
} from '../../network/orginout'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseinfo:'',
    flag: false,
    teacherid: [],
    screen : {
      minHeight : 'auto'
    },
  },

  teacher(e){
    let index = e.currentTarget.dataset.menuindex
    let temp = this.data.courseinfo.teacherList[index]
    let teacher = this.data.teacherid[index]
    wx.redirectTo({
      url: '../detail_teacher/detail_teacher?current='+temp[teacher]+'&name='+this.data.courseinfo.teacherList[index].name,
    })
  },
  _getOrgCourse(data,index){
    idGetOrgCourse(data).then(res => {
      if (this.getInfoCallback) {
        this.getInfoCallback(res)
      }
      for(let i=0;i<res.data.length;i++){
          if(res.data[i].courseId == index){
            this.setData({
              courseinfo: res.data[i],
              flag: true
            })
          }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orgid = options.orgid
    let index = options.index
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          winHeight: res.windowHeight
        });
      }
    });
    this._getOrgCourse(orgid, index)
    this.getInfoCallback = res =>{
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].courseId == index){
          console.log(res.data[i])
          for(let j=0;j<res.data[i].teacherList.length;j++){
            this.setData({
              ['teacherid['+j+']']: 'teacher'+[j+1]+'Id'
            })
          }
        }
    }
      
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