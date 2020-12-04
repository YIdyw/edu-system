// pages/propaganda/propaganda.js
import {
  phone
} from '../../network/regist'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseKind: "",
    name: "",
    age: "",
    phone: "",
    flagphone: false
  },

  courseKind (e) {
    this.setData({
      courseKind: e.detail.value
    });
  },
  name (e) {
    this.setData({
      name: e.detail.value
    });
  },
  age(e) {
      this.setData({
        age: e.detail.value,
      });
  },

  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  findphone(){
    var that = this
    that._phone()
  },

  _phone(){
    let data = this.data.phone
    phone(data).then(res =>{
      if(res.code == 200){
        this.setData({
          flagphone: false
        })
      }else{
        this.setData({
          flagphone: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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