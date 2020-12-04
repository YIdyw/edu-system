// pages/propaganda/propaganda.js
import {
  phone
} from '../../network/regist'
import {
  reservation
} from '../../network/reservation'

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

  reserve(){
    var that = this
    if (that.data.name == '') {
      setTimeout(() => {
        wx.showToast({
          title: '请输入姓名！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else if (that.data.name.indexOf(" ")>=0) {
        setTimeout(() => {
          wx.showToast({
            title: '姓名中不能包含空格！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else if(!(/^1[3-9]\d{9}$/.test(that.data.phone))) {
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      that._reservation()
    }
  },
  _reservation(){
    let data = {
      telephone : this.data.phone,
      username : this.data.name,
      age : this.data.age,

    }
    reservation(data).then(res =>{
      if(res.code == 200){
        setTimeout(() => {
          wx.showToast({
            title: '预约成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '预约失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
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